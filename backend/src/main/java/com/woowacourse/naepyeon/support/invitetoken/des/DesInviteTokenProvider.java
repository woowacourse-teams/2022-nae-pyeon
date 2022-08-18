package com.woowacourse.naepyeon.support.invitetoken.des;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.woowacourse.naepyeon.exception.InviteTokenInvalidExpiredException;
import com.woowacourse.naepyeon.exception.InviteTokenInvalidFormException;
import com.woowacourse.naepyeon.support.invitetoken.InviteTokenProvider;
import com.woowacourse.naepyeon.support.invitetoken.dto.InviteTokenPayload;
import java.time.LocalDateTime;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class DesInviteTokenProvider implements InviteTokenProvider {

    private final DesSupporter desSupporter;
    private final ObjectMapper objectMapper;
    private final long validityInMilliseconds;

    public DesInviteTokenProvider(final DesSupporter desSupporter,
                                  final ObjectMapper objectMapper,
                                  @Value("${security.invite-expire-length}") final long validityInMilliseconds
    ) {
        this.desSupporter = desSupporter;
        this.objectMapper = objectMapper;
        this.validityInMilliseconds = validityInMilliseconds;
    }

    @Override
    public String createInviteToken(final Long teamId) {
        final InviteTokenPayload payload =
                new InviteTokenPayload(teamId, LocalDateTime.now().plusHours(validityInMilliseconds / 3600000));

        try {
            final String rawPayload = objectMapper.writeValueAsString(payload);
            return desSupporter.encrypt(rawPayload);
        } catch (final JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public Long getTeamId(final String token) {
        final String rawPayload = desSupporter.decrypt(token);

        try {
            final InviteTokenPayload payload = objectMapper.readValue(rawPayload, InviteTokenPayload.class);
            return extractTeamId(payload);
        } catch (final JsonProcessingException e) {
            throw new InviteTokenInvalidFormException();
        }
    }

    private Long extractTeamId(final InviteTokenPayload payload) {
        final LocalDateTime expired = payload.getExpired();
        if (LocalDateTime.now().isAfter(expired)) {
            throw new InviteTokenInvalidExpiredException();
        }
        return payload.getTeamId();
    }
}
