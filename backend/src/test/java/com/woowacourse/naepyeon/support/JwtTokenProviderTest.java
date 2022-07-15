package com.woowacourse.naepyeon.support;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatExceptionOfType;

import com.woowacourse.naepyeon.exception.TokenInvalidExpiredException;
import com.woowacourse.naepyeon.exception.TokenInvalidFormException;
import com.woowacourse.naepyeon.exception.TokenInvalidSecretKeyException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
class JwtTokenProviderTest {

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Value("${security.jwt.token.secret-key}")
    private String secretKey;

    private final JwtTokenProvider invalidSecretKeyJwtTokenProvider
            = new JwtTokenProvider(
                    "invalidSecretKeyInvalidSecretKeyInvalidSecretKeyInvalidSecretKey",
            8640000L
    );

    @Test
    @DisplayName("토큰이 올바르게 생성된다.")
    void createToken() {
        final String payload = String.valueOf(1L);

        final String token = jwtTokenProvider.createToken(payload);

        assertThat(token).isNotNull();
    }

    @DisplayName("올바른 토큰 정보로 payload를 조회한다.")
    @Test
    void getPayloadByValidToken() {
        final String payload = String.valueOf(1L);

        final String token = jwtTokenProvider.createToken(payload);
        System.out.println(token);

        assertThat(jwtTokenProvider.getPayload(token)).isEqualTo(payload);
    }

    @DisplayName("유효하지 않은 토큰 형식의 토큰으로 payload를 조회할 경우 예외를 발생시킨다.")
    @Test
    void getPayloadByInvalidToken() {
        assertThatExceptionOfType(TokenInvalidFormException.class)
                .isThrownBy(() -> jwtTokenProvider.getPayload("abc"));
    }

    @DisplayName("만료된 토큰으로 payload를 조회할 경우 예외를 발생시킨다.")
    @Test
    void getPayloadByExpiredToken() {
        final String expiredToken = Jwts.builder()
                .signWith(Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8)), SignatureAlgorithm.HS256)
                .setSubject(String.valueOf(1L))
                .setExpiration(new Date((new Date()).getTime() - 1))
                .compact();

        assertThatExceptionOfType(TokenInvalidExpiredException.class)
                .isThrownBy(() -> jwtTokenProvider.getPayload(expiredToken));
    }

    @DisplayName("시크릿 키가 틀린 토큰 정보로 payload를 조회할 경우 예외를 발생시킨다.")
    @Test
    void getPayloadByWrongSecretKeyToken() {
        final String invalidSecretToken = invalidSecretKeyJwtTokenProvider.createToken(String.valueOf(1L));
        assertThatExceptionOfType(TokenInvalidSecretKeyException.class)
                .isThrownBy(() -> jwtTokenProvider.getPayload(invalidSecretToken));
    }
}
