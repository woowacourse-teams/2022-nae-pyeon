package com.woowacourse.naepyeon.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatCode;
import static org.mockito.Mockito.anyString;
import static org.mockito.Mockito.when;

import com.woowacourse.naepyeon.controller.dto.NaverTokenRequest;
import com.woowacourse.naepyeon.domain.Member;
import com.woowacourse.naepyeon.domain.Platform;
import com.woowacourse.naepyeon.repository.MemberRepository;
import com.woowacourse.naepyeon.service.dto.PlatformUserDto;
import com.woowacourse.naepyeon.service.dto.TokenRequestDto;
import com.woowacourse.naepyeon.service.dto.TokenResponseDto;
import com.woowacourse.naepyeon.support.JwtTokenProvider;
import com.woowacourse.naepyeon.support.oauth.kakao.KakaoPlatformUserProvider;
import com.woowacourse.naepyeon.support.oauth.naver.NaverPlatformUserProvider;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
class AuthServiceTest {

    @MockBean
    private KakaoPlatformUserProvider kakaoPlatformUserProvider;

    @MockBean
    private NaverPlatformUserProvider naverPlatformUserProvider;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private MemberService memberService;

    private AuthService authService;

    @BeforeEach
    void setUp() {
        authService = new AuthService(
                memberService,
                jwtTokenProvider,
                kakaoPlatformUserProvider,
                naverPlatformUserProvider
        );
    }

    @Test
    @DisplayName("사용자 정보를 받아 카카오 Oauth로 토큰을 만들어 반환한다.")
    void createKakaoToken() {
        final PlatformUserDto platformUserDto = new PlatformUserDto("alex", "email@email.com", "KAKAO", "1");
        when(kakaoPlatformUserProvider.getPlatformUser(anyString(), anyString())).thenReturn(platformUserDto);

        final TokenRequestDto tokenRequestDto = new TokenRequestDto("authorizationCode", "https://...");
        final TokenResponseDto tokenResponseDto = authService.createTokenWithKakaoOauth(tokenRequestDto);

        assertThatCode(() -> jwtTokenProvider.validateAbleToken(tokenResponseDto.getAccessToken()))
                .doesNotThrowAnyException();
    }

    @Test
    @DisplayName("사용자 정보를 받아 네이버 Oauth로 토큰을 만들어 반환한다.")
    void createNaverToken() {
        final PlatformUserDto platformUserDto = new PlatformUserDto("seungpang", "email@email.com", "NAVER", "2");
        when(naverPlatformUserProvider.getPlatformUser(anyString(), anyString(), anyString())).thenReturn(platformUserDto);

        final NaverTokenRequest naverTokenRequest = new NaverTokenRequest("authorizationCode", "https://...",
                "naepyeon");
        final TokenResponseDto tokenResponseDto = authService.createTokenWithNaverOauth(
                naverTokenRequest.getAuthorizationCode(), naverTokenRequest.getRedirectUri(),
                naverTokenRequest.getState());

        assertThatCode(() -> jwtTokenProvider.validateAbleToken(tokenResponseDto.getAccessToken()))
                .doesNotThrowAnyException();
    }

    @Test
    @DisplayName("카카오 Oauth로 접속한 사용자 정보가 DB에 없는 경우 DB에 사용자 정보를 추가하고 토큰을 반환한다.")
    void createTokenWithKaKaoOauthAndNotExistMember() {
        final PlatformUserDto platformUserDto = new PlatformUserDto("alex", "email@email.com", "KAKAO", "1");
        when(kakaoPlatformUserProvider.getPlatformUser(anyString(), anyString())).thenReturn(platformUserDto);
        final TokenRequestDto tokenRequestDto = new TokenRequestDto("authorizationCode", "https://...");

        final TokenResponseDto tokenResponseDto = authService.createTokenWithKakaoOauth(tokenRequestDto);
        final Long memberId = tokenResponseDto.getId();
        final Member findMember = memberRepository.findById(memberId)
                .get();

        assertThat(findMember).extracting("id", "username", "email", "platform", "platformId")
                .containsExactly(
                        memberId,
                        platformUserDto.getUsername(),
                        platformUserDto.getEmail(),
                        Platform.valueOf(platformUserDto.getPlatform()),
                        platformUserDto.getPlatformId()
                );
    }

    @Test
    @DisplayName("네이버 Oauth로 접속한 사용자 정보가 DB에 없는 경우 DB에 사용자 정보를 추가하고 토큰을 반환한다.")
    void createTokenWithNaverOauthAndNotExistMember() {
        final PlatformUserDto platformUserDto = new PlatformUserDto("seungpang", "email@email.com", "NAVER", "2");
        when(naverPlatformUserProvider.getPlatformUser(anyString(), anyString(), anyString())).thenReturn(platformUserDto);
        final NaverTokenRequest naverTokenRequest = new NaverTokenRequest("authorizationCode", "https://...",
                "naepyeon");

        final TokenResponseDto tokenResponseDto = authService.createTokenWithNaverOauth(
                naverTokenRequest.getAuthorizationCode(),
                naverTokenRequest.getRedirectUri(),
                naverTokenRequest.getState()
        );
        final Long memberId = tokenResponseDto.getId();
        final Member findMember = memberRepository.findById(memberId)
                .get();

        assertThat(findMember).extracting("id", "username", "email", "platform", "platformId")
                .containsExactly(
                        memberId,
                        platformUserDto.getUsername(),
                        platformUserDto.getEmail(),
                        Platform.valueOf(platformUserDto.getPlatform()),
                        platformUserDto.getPlatformId()
                );
    }
}
