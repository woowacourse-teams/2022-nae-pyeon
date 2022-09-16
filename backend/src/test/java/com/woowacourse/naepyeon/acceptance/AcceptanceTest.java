package com.woowacourse.naepyeon.acceptance;

import static org.mockito.Mockito.anyString;
import static org.mockito.Mockito.when;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.woowacourse.naepyeon.repository.member.MemberRepository;
import com.woowacourse.naepyeon.service.AuthService;
import com.woowacourse.naepyeon.service.MemberService;
import com.woowacourse.naepyeon.service.dto.PlatformUserDto;
import com.woowacourse.naepyeon.service.dto.TokenRequestDto;
import com.woowacourse.naepyeon.service.dto.TokenResponseDto;
import com.woowacourse.naepyeon.acceptance.support.DatabaseCleaner;
import com.woowacourse.naepyeon.support.JwtTokenProvider;
import com.woowacourse.naepyeon.support.invitetoken.InviteTokenProvider;
import com.woowacourse.naepyeon.support.invitetoken.aes.Aes256InviteTokenProvider;
import com.woowacourse.naepyeon.support.invitetoken.aes.Aes256Supporter;
import com.woowacourse.naepyeon.support.oauth.kakao.KakaoPlatformUserProvider;
import io.restassured.RestAssured;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.web.server.LocalServerPort;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureTestDatabase
public class AcceptanceTest {

    @MockBean
    protected KakaoPlatformUserProvider kakaoPlatformUserProvider;
    @Autowired
    protected MemberRepository memberRepository;
    @Autowired
    protected JwtTokenProvider jwtTokenProvider;
    @Autowired
    protected MemberService memberService;
    protected AuthService authService;
    @Autowired
    protected Aes256Supporter aes256Supporter;
    @Autowired
    protected ObjectMapper objectMapper;
    @Autowired
    protected DatabaseCleaner databaseCleaner;

    @LocalServerPort
    int port;

    protected TokenResponseDto alex;
    protected TokenResponseDto kei;
    protected TokenResponseDto seungpang;
    protected TokenResponseDto zero;

    @Value("${security.jwt.token.secret-key}")
    protected String secretKey;

    protected InviteTokenProvider expiredTokenInviteTokenProvider;

    @BeforeEach
    public void setUp() {
        RestAssured.port = port;
        databaseCleaner.execute();
        authService = new AuthService(memberService, jwtTokenProvider, kakaoPlatformUserProvider);

        final String alexName = "alex";
        when(kakaoPlatformUserProvider.getPlatformUser(anyString(), anyString()))
                .thenReturn(new PlatformUserDto(alexName, "email1@email.com", "KAKAO", "1"));
        alex = authService.createTokenWithKakaoOauth(new TokenRequestDto(alexName, "https://..."));

        final String keiName = "kei";
        when(kakaoPlatformUserProvider.getPlatformUser(anyString(), anyString()))
                .thenReturn(new PlatformUserDto(keiName, "email2@email.com", "KAKAO", "2"));
        kei = authService.createTokenWithKakaoOauth(new TokenRequestDto(keiName, "https://..."));

        final String seungpangName = "seungpang";
        when(kakaoPlatformUserProvider.getPlatformUser(anyString(), anyString()))
                .thenReturn(new PlatformUserDto(seungpangName, "email3@email.com", "KAKAO", "3"));
        seungpang = authService.createTokenWithKakaoOauth(new TokenRequestDto(seungpangName, "https://..."));

        final String zeroName = "zero";
        when(kakaoPlatformUserProvider.getPlatformUser(anyString(), anyString()))
                .thenReturn(new PlatformUserDto(zeroName, "email4@email.com", "KAKAO", "4"));
        zero = authService.createTokenWithKakaoOauth(new TokenRequestDto(zeroName, "https://..."));

        expiredTokenInviteTokenProvider = new Aes256InviteTokenProvider(aes256Supporter, objectMapper, 0);
    }
}
