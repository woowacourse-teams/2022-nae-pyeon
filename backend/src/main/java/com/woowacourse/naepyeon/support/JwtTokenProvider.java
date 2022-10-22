package com.woowacourse.naepyeon.support;

import com.woowacourse.naepyeon.config.logging.trace.annotation.NoLogging;
import com.woowacourse.naepyeon.exception.InvalidLoginException;
import com.woowacourse.naepyeon.exception.TokenInvalidExpiredException;
import com.woowacourse.naepyeon.exception.TokenInvalidFormException;
import com.woowacourse.naepyeon.exception.TokenInvalidSecretKeyException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import javax.crypto.SecretKey;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class JwtTokenProvider {

    private final SecretKey key;
    private final long validityInMilliseconds;

    public JwtTokenProvider(@Value("${security.jwt.token.secret-key}") final String secretKey,
                            @Value("${security.jwt.token.expire-length}") final long validityInMilliseconds) {
        this.key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
        this.validityInMilliseconds = validityInMilliseconds;
    }

    public String createToken(final String payload) {
        final Date now = new Date();
        final Date validity = new Date(now.getTime() + validityInMilliseconds);

        return Jwts.builder()
                .setSubject(payload)
                .setIssuedAt(now)
                .setExpiration(validity)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    @NoLogging
    public String getPayload(final String token) {
        return tokenToJws(token).getBody().getSubject();
    }

    @NoLogging
    public void validateAbleToken(final String token) {
        try {
            final Jws<Claims> claims = tokenToJws(token);

            validateExpiredToken(claims);
        } catch (final JwtException | InvalidLoginException e) {
            throw new TokenInvalidSecretKeyException(token);
        }
    }

    private Jws<Claims> tokenToJws(final String token) {
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token);
        } catch (final IllegalArgumentException | MalformedJwtException e) {
            throw new TokenInvalidFormException();
        } catch (final SignatureException e) {
            throw new TokenInvalidSecretKeyException(token);
        } catch (final ExpiredJwtException e) {
            throw new TokenInvalidExpiredException();
        }
    }

    private void validateExpiredToken(final Jws<Claims> claims) {
        if (claims.getBody().getExpiration().before(new Date())) {
            throw new TokenInvalidExpiredException();
        }
    }
}
