package com.woowacourse.naepyeon.domain.invitecode;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import com.woowacourse.naepyeon.domain.Team;
import java.lang.reflect.Field;
import java.time.LocalDateTime;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class InviteCodeTest {

    @Test
    @DisplayName("초대 코드 생성 전략을 주입받아 초대 코드를 생성한다.")
    void createdBy() {
        final Team team = new Team(
                "abcdefghi123456",
                "테스트 모임입니다.",
                "testEmoji",
                "#123456",
                false
        );
        final String rawInviteCode = "abcd";
        final InviteCode inviteCode = InviteCode.createdBy(team, () -> rawInviteCode);

        assertAll(
                () -> assertThat(inviteCode.getCode()).isEqualTo(rawInviteCode),
                () -> assertThat(inviteCode.getExpired()).isBefore(LocalDateTime.now().plusHours(24).plusSeconds(1))
        );
    }

    @Test
    @DisplayName("초대코드 만료시간이 지났는 지 확인한다. - true")
    void isAvailableTrue() {
        final Team team = new Team(
                "abcdefghi123456",
                "테스트 모임입니다.",
                "testEmoji",
                "#123456",
                false
        );
        final String rawInviteCode = "abcd";
        final InviteCode inviteCode = InviteCode.createdBy(team, () -> rawInviteCode);

        assertThat(inviteCode.isAvailable()).isTrue();
    }

    @Test
    @DisplayName("초대코드 만료시간이 지났는 지 확인한다. - false")
    void isAvailableFalse() throws NoSuchFieldException, IllegalAccessException {
        final Team team = new Team(
                "abcdefghi123456",
                "테스트 모임입니다.",
                "testEmoji",
                "#123456",
                false
        );
        final String rawInviteCode = "abcd";
        final InviteCode inviteCode = InviteCode.createdBy(team, () -> rawInviteCode);
        final Field expiredField = InviteCode.class
                .getDeclaredField("expired");
        expiredField.setAccessible(true);
        expiredField.set(inviteCode, LocalDateTime.now().minusSeconds(10));

        assertThat(inviteCode.isAvailable()).isFalse();
    }
}
