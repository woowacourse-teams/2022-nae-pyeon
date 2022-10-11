package com.woowacourse.naepyeon.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatCode;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.mockito.Mockito.anyString;
import static org.mockito.Mockito.when;

import com.woowacourse.naepyeon.domain.Member;
import com.woowacourse.naepyeon.domain.Platform;
import com.woowacourse.naepyeon.domain.refreshtoken.RefreshToken;
import com.woowacourse.naepyeon.repository.member.MemberRepository;
import com.woowacourse.naepyeon.repository.refreshtoken.RefreshTokenRepository;
import com.woowacourse.naepyeon.service.dto.PlatformUserDto;
import com.woowacourse.naepyeon.service.dto.TokenRequestDto;
import com.woowacourse.naepyeon.service.dto.TokenResponseDto;
import com.woowacourse.naepyeon.support.JwtTokenProvider;
import com.woowacourse.naepyeon.support.oauth.google.GooglePlatformUserProvider;
import com.woowacourse.naepyeon.support.oauth.kakao.KakaoPlatformUserProvider;
import java.util.List;
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
    private GooglePlatformUserProvider googlePlatformUserProvider;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private MemberService memberService;

    @Autowired
    private RefreshTokenRepository refreshTokenRepository;

    private AuthService authService;

    @BeforeEach
    void setUp() {
        authService = new AuthService(
                memberService,
                jwtTokenProvider,
                kakaoPlatformUserProvider,
                googlePlatformUserProvider,
                refreshTokenRepository
        );
    }

    @Test
    @DisplayName("카카오 로그인 정보를 받아 토큰을 만들어 반환한다.")
    void createTokenByKakao() {
        final PlatformUserDto platformUserDto = new PlatformUserDto("alex", "email@email.com", "KAKAO", "1");
        when(kakaoPlatformUserProvider.getPlatformUser(anyString(), anyString())).thenReturn(platformUserDto);

        final TokenRequestDto tokenRequestDto = new TokenRequestDto("authorizationCode", "https://...");
        final TokenResponseDto tokenResponseDto = authService.createTokenWithKakaoOauth(tokenRequestDto);

        final String accessToken = tokenResponseDto.getAccessToken();
        final RefreshToken refreshToken = refreshTokenRepository.findByValue(tokenResponseDto.getRefreshToken())
                .get();
        assertAll(
                () -> assertThatCode(() -> jwtTokenProvider.validateAbleToken(accessToken))
                        .doesNotThrowAnyException(),
                () -> assertThat(refreshToken.getMemberId())
                        .isEqualTo(Long.valueOf(jwtTokenProvider.getPayload(accessToken)))
        );
    }

    @Test
    @DisplayName("리프레시 토큰이 한 유저당 3개 이상으로 추가되려 하면 오래된 토큰을 삭제해서 최대 3개를 유지한다.")
    void createRefreshTokenOver() {
        final PlatformUserDto platformUserDto = new PlatformUserDto("alex", "email@email.com", "KAKAO", "1");
        when(kakaoPlatformUserProvider.getPlatformUser(anyString(), anyString())).thenReturn(platformUserDto);

        final TokenRequestDto tokenRequestDto = new TokenRequestDto("authorizationCode", "https://...");
        final TokenResponseDto tokenResponseDto1 = authService.createTokenWithKakaoOauth(tokenRequestDto);
        final TokenResponseDto tokenResponseDto2 = authService.createTokenWithKakaoOauth(tokenRequestDto);
        final TokenResponseDto tokenResponseDto3 = authService.createTokenWithKakaoOauth(tokenRequestDto);
        final TokenResponseDto tokenResponseDto4 = authService.createTokenWithKakaoOauth(tokenRequestDto);

        refreshTokenRepository.findByValue(tokenResponseDto1.getRefreshToken());
        final RefreshToken refreshToken2 = refreshTokenRepository.findByValue(tokenResponseDto2.getRefreshToken())
                .get();
        final RefreshToken refreshToken3 = refreshTokenRepository.findByValue(tokenResponseDto3.getRefreshToken())
                .get();
        final RefreshToken refreshToken4 = refreshTokenRepository.findByValue(tokenResponseDto4.getRefreshToken())
                .get();

        final Long memberId = Long.valueOf(jwtTokenProvider.getPayload(tokenResponseDto4.getAccessToken()));
        final List<RefreshToken> refreshTokens = refreshTokenRepository.findByMemberId(memberId);

        assertAll(
                () -> assertThat(refreshTokens).hasSize(3),
                () -> assertThat(refreshTokens).containsExactly(refreshToken2, refreshToken3, refreshToken4),
                () -> assertThat(refreshTokenRepository.findByValue(tokenResponseDto1.getRefreshToken())).isEmpty()
        );
    }


    @Test
    @DisplayName("카카오 로그인 정보가 DB에 없는 경우 DB에 사용자 정보를 추가하고 토큰을 반환한다.")
    void createTokenWithNotExistMemberByKakao() {
        final PlatformUserDto platformUserDto = new PlatformUserDto("alex", "email@email.com", "KAKAO", "1");
        when(kakaoPlatformUserProvider.getPlatformUser(anyString(), anyString())).thenReturn(platformUserDto);
        final TokenRequestDto tokenRequestDto = new TokenRequestDto("authorizationCode", "https://...");

        final TokenResponseDto tokenResponseDto = authService.createTokenWithKakaoOauth(tokenRequestDto);
        final Long memberId = tokenResponseDto.getId();
        final Member findMember = memberRepository.findById(memberId)
                .orElseThrow();

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
    @DisplayName("구글 로그인 정보를 받아 토큰을 만들어 반환한다.")
    void createTokenByGoogle() {
        final PlatformUserDto platformUserDto = new PlatformUserDto("zero", "email@email.com", "GOOGLE", "1");
        when(googlePlatformUserProvider.getPlatformUser(anyString(), anyString())).thenReturn(platformUserDto);

        final TokenRequestDto tokenRequestDto = new TokenRequestDto("authorizationCode", "https://...");
        final TokenResponseDto tokenResponseDto = authService.createTokenWithGoogleOauth(tokenRequestDto);

        assertThatCode(() -> jwtTokenProvider.validateAbleToken(tokenResponseDto.getAccessToken()))
                .doesNotThrowAnyException();
    }

    @Test
    @DisplayName("구글 로그인 정보가 DB에 없는 경우 DB에 사용자 정보를 추가하고 토큰을 반환한다.")
    void createTokenWithNotExistMemberByGoogle() {
        final PlatformUserDto platformUserDto = new PlatformUserDto("zero", "email@email.com", "GOOGLE", "1");
        when(googlePlatformUserProvider.getPlatformUser(anyString(), anyString())).thenReturn(platformUserDto);
        final TokenRequestDto tokenRequestDto = new TokenRequestDto("authorizationCode", "https://...");

        final TokenResponseDto tokenResponseDto = authService.createTokenWithGoogleOauth(tokenRequestDto);
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
