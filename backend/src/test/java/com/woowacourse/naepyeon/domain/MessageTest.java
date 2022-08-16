package com.woowacourse.naepyeon.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.woowacourse.naepyeon.domain.rollingpaper.Recipient;
import com.woowacourse.naepyeon.domain.rollingpaper.Rollingpaper;
import com.woowacourse.naepyeon.exception.ExceedMessageContentLengthException;
import com.woowacourse.naepyeon.exception.InvalidSecretMessageToTeam;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class MessageTest {

    @Test
    @DisplayName("모임에게 작성하는 메시지일 경우 비밀 옵션이 false이면 예외를 발생시킨다.")
    void saveSecretMessageToTeam() {
        final Team team = new Team(
                "nae-pyeon",
                "테스트 모임입니다.",
                "testEmoji",
                "#123456"
        );
        final Member member = new Member("member", "m@hello.com", Platform.KAKAO, "1");
        final Member author = new Member("author", "a@hello.com", Platform.KAKAO, "2");
        final Rollingpaper rollingpaper = new Rollingpaper("alexAndKei", Recipient.TEAM, team, member);
        assertThatThrownBy(() -> new Message("헬로우", "green", author, rollingpaper, false, true))
                .isInstanceOf(InvalidSecretMessageToTeam.class);
    }

    @Test
    @DisplayName("메시지 내용을 변경한다.")
    void changeContent() {
        final Team team = new Team(
                "nae-pyeon",
                "테스트 모임입니다.",
                "testEmoji",
                "#123456",
                false
        );
        final Member member = new Member("member", "m@hello.com", Platform.KAKAO, "1");
        final Member author = new Member("author", "a@hello.com", Platform.KAKAO, "2");
        final Rollingpaper rollingpaper = new Rollingpaper("alexAndKei", Recipient.MEMBER, team, member);
        final Message message = new Message("헬로우", "green", author, rollingpaper, false, false);
        final String expected = "낫 헬로우";

        message.changeContent(expected);

        assertThat(message.getContent()).isEqualTo(expected);
    }

    @Test
    @DisplayName("500자 이상의 내용이 입력되면 예외가 발생한다.")
    void exceedLength() {
        final Team team = new Team(
                "nae-pyeon",
                "테스트 모임입니다.",
                "testEmoji",
                "#123456",
                false
        );
        final Member member = new Member("member", "m@hello.com", Platform.KAKAO, "1");
        final Member author = new Member("author", "a@hello.com", Platform.KAKAO, "2");
        final Rollingpaper rollingpaper = new Rollingpaper("alexAndKei", Recipient.MEMBER, team, member);
        assertThatThrownBy(() -> new Message("a".repeat(501), "green", author, rollingpaper, false, false))
                .isInstanceOf(ExceedMessageContentLengthException.class);
    }

    @Test
    @DisplayName("메시지 색상을 변경한다.")
    void changeColor() {
        final Team team = new Team(
                "nae-pyeon",
                "테스트 모임입니다.",
                "testEmoji",
                "#123456",
                false
        );
        final Member member = new Member("member", "m@hello.com", Platform.KAKAO, "1");
        final Member author = new Member("author", "a@hello.com", Platform.KAKAO, "2");
        final Rollingpaper rollingpaper = new Rollingpaper("alexAndKei", Recipient.MEMBER, team, member);
        final Message message = new Message("헬로우", "green", author, rollingpaper, false, false);
        final String expected = "red";

        message.changeColor(expected);

        assertThat(message.getColor()).isEqualTo(expected);
    }
}
