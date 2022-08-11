package com.woowacourse.naepyeon.support;

import com.woowacourse.naepyeon.exception.InviteTokenInvalidExpiredException;
import com.woowacourse.naepyeon.exception.InviteTokenInvalidFormException;
import com.woowacourse.naepyeon.exception.InviteTokenInvalidSecretKeyException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
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
public class InviteTokenProvider {

    private static final String SUBJECT = "teamInviteToken";
    private static final String TEAM_ID_KEY = "teamId";

    private final SecretKey key;
    private final long validityInMilliseconds;

    public InviteTokenProvider(@Value("${security.jwt.token.secret-key}") final String secretKey,
                               @Value("${security.jwt.token.invite-expire-length}") final long validityInMilliseconds) {
        this.key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
        this.validityInMilliseconds = validityInMilliseconds;
    }


    public String createInviteToken(final Long teamId) {
        final Date now = new Date();
        final Date validity = new Date(now.getTime() + validityInMilliseconds);

        final Claims claims = Jwts.claims();
        claims.put(TEAM_ID_KEY, teamId);

        return buildToken(now, validity, claims);
    }

    private String buildToken(final Date now, final Date validity, final Claims claims) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(SUBJECT)
                .setIssuedAt(now)
                .setExpiration(validity)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public Long getTeamId(final String token) {
        return tokenToJws(token).getBody()
                .get(TEAM_ID_KEY, Long.class);
    }

    private Jws<Claims> tokenToJws(final String token) {
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token);
        } catch (final IllegalArgumentException | MalformedJwtException e) {
            throw new InviteTokenInvalidFormException();
        } catch (final SignatureException e) {
            throw new InviteTokenInvalidSecretKeyException(token);
        } catch (final ExpiredJwtException e) {
            throw new InviteTokenInvalidExpiredException();
        }
    }
}
