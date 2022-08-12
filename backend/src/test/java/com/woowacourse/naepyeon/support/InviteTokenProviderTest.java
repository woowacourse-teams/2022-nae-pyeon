package com.woowacourse.naepyeon.support;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.woowacourse.naepyeon.exception.InviteTokenInvalidExpiredException;
import com.woowacourse.naepyeon.exception.InviteTokenInvalidFormException;
import com.woowacourse.naepyeon.exception.InviteTokenInvalidSecretKeyException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class InviteTokenProviderTest {

    @Autowired
    private InviteTokenProvider inviteTokenProvider;

    @Value("${security.jwt.token.secret-key}")
    private String secretKey;

    private final InviteTokenProvider invalidSecretKeyInviteTokenProvider
            = new InviteTokenProvider(
            "invalidSecretKeyInvalidSecretKeyInvalidSecretKeyInvalidSecretKey",
            8640000L
    );

    private InviteTokenProvider expiredTokenInviteTokenProvider;

    @BeforeEach
    void setUp() {
        expiredTokenInviteTokenProvider = new InviteTokenProvider(secretKey, 0);
    }

    @Test
    @DisplayName("초대하려는 팀 아이디가 담긴 초대 토큰을 생성한다.")
    void createInviteToken() {
        final long expected = 1L;
        final String inviteToken = inviteTokenProvider.createInviteToken(expected);

        final Long actual = inviteTokenProvider.getTeamId(inviteToken);

        assertThat(actual).isEqualTo(expected);
    }

    @DisplayName("유효하지 않은 토큰 형식의 토큰으로 teamId를 조회할 경우 예외를 발생시킨다.")
    @Test
    void getPayloadByInvalidToken() {
        assertThatThrownBy(() -> inviteTokenProvider.getTeamId(null))
                .isInstanceOf(InviteTokenInvalidFormException.class);
    }

    @DisplayName("만료된 토큰으로 teamId를 조회할 경우 예외를 발생시킨다.")
    @Test
    void getPayloadByExpiredToken() {
        final Long teamId = 1L;
        final String expiredToken = expiredTokenInviteTokenProvider.createInviteToken(teamId);

        assertThatThrownBy(() -> inviteTokenProvider.getTeamId(expiredToken))
                .isInstanceOf(InviteTokenInvalidExpiredException.class);
    }

    @DisplayName("시크릿 키가 틀린 토큰 정보로 payload를 조회할 경우 예외를 발생시킨다.")
    @Test
    void getPayloadByWrongSecretKeyToken() {
        final Long teamId = 1L;
        final String invalidSecretToken = invalidSecretKeyInviteTokenProvider.createInviteToken(teamId);

        assertThatThrownBy(() -> inviteTokenProvider.getTeamId(invalidSecretToken))
                .isInstanceOf(InviteTokenInvalidSecretKeyException.class);
    }
}