package com.woowacourse.naepyeon.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import com.woowacourse.naepyeon.domain.Member;
import com.woowacourse.naepyeon.domain.Platform;
import com.woowacourse.naepyeon.domain.refreshtoken.RefreshToken;
import com.woowacourse.naepyeon.exception.RefreshTokenExpiredException;
import com.woowacourse.naepyeon.repository.member.MemberRepository;
import com.woowacourse.naepyeon.repository.refreshtoken.RefreshTokenRepository;
import com.woowacourse.naepyeon.service.dto.AccessTokenDto;
import com.woowacourse.naepyeon.service.dto.PlatformUserDto;
import com.woowacourse.naepyeon.service.dto.TokenRequestDto;
import com.woowacourse.naepyeon.service.dto.TokenResponseDto;
import com.woowacourse.naepyeon.support.JwtTokenProvider;
import com.woowacourse.naepyeon.support.oauth.google.GooglePlatformUserProvider;
import com.woowacourse.naepyeon.support.oauth.kakao.KakaoPlatformUserProvider;
import java.lang.reflect.Field;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
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

    private Member member;

    @BeforeEach
    void setUp() {
        authService = new AuthService(
                memberService,
                jwtTokenProvider,
                kakaoPlatformUserProvider,
                googlePlatformUserProvider,
                refreshTokenRepository,
                memberRepository
        );
        member = new Member("name", "emailtesttest@email.com", Platform.KAKAO, "9999999");
        memberRepository.save(member);
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
                .orElseThrow();
        assertAll(
                () -> assertDoesNotThrow(() -> jwtTokenProvider.validateAbleToken(accessToken)),
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
                .orElseThrow();
        final RefreshToken refreshToken3 = refreshTokenRepository.findByValue(tokenResponseDto3.getRefreshToken())
                .orElseThrow();
        final RefreshToken refreshToken4 = refreshTokenRepository.findByValue(tokenResponseDto4.getRefreshToken())
                .orElseThrow();

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
    @DisplayName("유효한 리프레시 토큰으로 해당 유저의 새 엑세스 토큰을 반환한다.")
    void renewalToken() {
        final PlatformUserDto platformUserDto = new PlatformUserDto("zero", "email@email.com", "GOOGLE", "1");
        when(googlePlatformUserProvider.getPlatformUser(anyString(), anyString())).thenReturn(platformUserDto);
        final TokenRequestDto tokenRequestDto = new TokenRequestDto("authorizationCode", "https://...");
        final TokenResponseDto tokenResponseDto = authService.createTokenWithGoogleOauth(tokenRequestDto);

        final AccessTokenDto accessTokenDto = authService.renewalToken(tokenResponseDto.getRefreshToken());
        final String oldAccessToken = tokenResponseDto.getAccessToken();
        final String newAccessToken = accessTokenDto.getAccessToken();

        assertThat(jwtTokenProvider.getPayload(newAccessToken)).isEqualTo(jwtTokenProvider.getPayload(oldAccessToken));
    }

    @Test
    @DisplayName("기간이 만료된 리프레시 토큰으로 새 엑세스 토큰 요청시 예외가 발생한다.")
    void renewalTokenByExpiredRefreshToken() {
        final RefreshTokenRepository mockRefreshTokenRepository = mock(RefreshTokenRepository.class);
        final AuthService authService = new AuthService(
                memberService,
                jwtTokenProvider,
                kakaoPlatformUserProvider,
                googlePlatformUserProvider,
                mockRefreshTokenRepository,
                memberRepository
        );
        final RefreshToken mockRefreshToken = mock(RefreshToken.class);
        when(mockRefreshTokenRepository.save(any())).thenReturn(mockRefreshToken);
        when(mockRefreshTokenRepository.findByValue(anyString())).thenReturn(Optional.of(mockRefreshToken));
        when(mockRefreshToken.isExpired()).thenReturn(true);
        when(mockRefreshToken.getValue()).thenReturn("expiredRefreshToken");
        final PlatformUserDto platformUserDto = new PlatformUserDto("zero", "email@email.com", "GOOGLE", "1");
        when(googlePlatformUserProvider.getPlatformUser(anyString(), anyString())).thenReturn(platformUserDto);
        final TokenRequestDto tokenRequestDto = new TokenRequestDto("authorizationCode", "https://...");
        final TokenResponseDto tokenResponseDto = authService.createTokenWithGoogleOauth(tokenRequestDto);

        final String refreshToken = tokenResponseDto.getRefreshToken();
        assertThatThrownBy(() -> authService.renewalToken(refreshToken))
                .isInstanceOf(RefreshTokenExpiredException.class);
    }

    @Test
    @DisplayName("만료일이 2일 이하로 남은 리프레시 토큰으로 새 엑세스 토큰을 요청할 경우 리프레시 토큰의 만료기간이 7일로 갱신된다.")
    void renewalAccessTokenAndRefreshToken() throws NoSuchFieldException, IllegalAccessException {
        final RefreshTokenRepository mockRefreshTokenRepository = mock(RefreshTokenRepository.class);
        final AuthService authService = new AuthService(
                memberService,
                jwtTokenProvider,
                kakaoPlatformUserProvider,
                googlePlatformUserProvider,
                mockRefreshTokenRepository,
                memberRepository
        );
        final RefreshToken refreshToken = RefreshToken.createBy(member.getId(), () -> "refreshToken");
        final Field expiredTimeField = refreshToken.getClass().getDeclaredField("expiredTime");
        expiredTimeField.setAccessible(true);
        expiredTimeField.set(refreshToken, LocalDateTime.now().plusHours(47).plusMinutes(59));
        when(mockRefreshTokenRepository.save(any())).thenReturn(refreshToken);
        when(mockRefreshTokenRepository.findByValue(anyString())).thenReturn(Optional.of(refreshToken));
        final PlatformUserDto platformUserDto = new PlatformUserDto("zero", "email@email.com", "GOOGLE", "1");
        when(googlePlatformUserProvider.getPlatformUser(anyString(), anyString())).thenReturn(platformUserDto);
        final TokenRequestDto tokenRequestDto = new TokenRequestDto("authorizationCode", "https://...");
        final TokenResponseDto tokenResponseDto = authService.createTokenWithGoogleOauth(tokenRequestDto);

        authService.renewalToken(tokenResponseDto.getRefreshToken());

        assertThat(refreshToken.getExpiredTime())
                .isAfter(LocalDateTime.now().plusDays(6).plusHours(23).plusMinutes(59));
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
    @DisplayName("리프레시 토큰을 무효화한다.")
    void logout() {
        final RefreshToken refreshToken = RefreshToken.createBy(member.getId(), () -> "refreshToken");
        refreshTokenRepository.save(refreshToken);

        refreshTokenRepository.deleteByValue(refreshToken.getValue());

        final Optional<RefreshToken> findRefreshToken = refreshTokenRepository.findByValue(refreshToken.getValue());

        assertThat(findRefreshToken).isEmpty();
    }

    @Test
    @DisplayName("만료된 리프레시 토큰을 삭제한다.")
    void deleteExpiredRefreshTokens() throws NoSuchFieldException, IllegalAccessException {
        final Field expiredTimeField = RefreshToken.class.getDeclaredField("expiredTime");
        expiredTimeField.setAccessible(true);
        final RefreshToken refreshToken1 = RefreshToken.createBy(member.getId(), () -> "refreshToken1");
        expiredTimeField.set(refreshToken1, LocalDateTime.now().minusMinutes(1));
        final RefreshToken refreshToken2 = RefreshToken.createBy(member.getId(), () -> "refreshToken2");
        expiredTimeField.set(refreshToken2, LocalDateTime.now().minusMinutes(1));
        final RefreshToken refreshToken3 = RefreshToken.createBy(member.getId(), () -> "refreshToken3");
        refreshTokenRepository.save(refreshToken1);
        refreshTokenRepository.save(refreshToken2);
        refreshTokenRepository.save(refreshToken3);

        authService.deleteExpiredRefreshTokens();

        final List<RefreshToken> refreshTokens = refreshTokenRepository.findByMemberId(member.getId());

        assertAll(
                () -> assertThat(refreshTokens).hasSize(1),
                () -> assertThat(refreshTokens.get(0).getValue()).isEqualTo(refreshToken3.getValue())
        );
    }
}
