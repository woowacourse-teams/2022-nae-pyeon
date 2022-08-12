package com.woowacourse.naepyeon.domain;

import com.woowacourse.naepyeon.domain.rollingpaper.Rollingpaper;
import com.woowacourse.naepyeon.exception.ExceedMessageContentLengthException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static com.woowacourse.naepyeon.domain.rollingpaper.Classification.MEMBER;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class MessageTest {

    @Test
    @DisplayName("메시지 내용을 변경한다.")
    void changeContent() {
        final Team team = new Team(
                "nae-pyeon",
                "테스트 모임입니다.",
                "testEmoji",
                "#123456"
        );
        final Member member = new Member("member", "m@hello.com", Platform.KAKAO, "1");
        final Member author = new Member("author", "a@hello.com", Platform.KAKAO, "2");
        final Rollingpaper rollingpaper = new Rollingpaper("alexAndKei", MEMBER, team, member);
        final Message message = new Message("헬로우", "green", author, rollingpaper);
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
                "#123456"
        );
        final Member member = new Member("member", "m@hello.com", Platform.KAKAO, "1");
        final Member author = new Member("author", "a@hello.com", Platform.KAKAO, "2");
        final Rollingpaper rollingpaper = new Rollingpaper("alexAndKei", MEMBER, team, member);
        assertThatThrownBy(() -> new Message("a".repeat(501), "green", author, rollingpaper))
                .isInstanceOf(ExceedMessageContentLengthException.class);
    }

    @Test
    @DisplayName("메시지 색상을 변경한다.")
    void changeColor() {
        final Team team = new Team(
                "nae-pyeon",
                "테스트 모임입니다.",
                "testEmoji",
                "#123456"
        );
        final Member member = new Member("member", "m@hello.com", Platform.KAKAO, "1");
        final Member author = new Member("author", "a@hello.com", Platform.KAKAO, "2");
        final Rollingpaper rollingpaper = new Rollingpaper("alexAndKei", MEMBER, team, member);
        final Message message = new Message("헬로우", "green", author, rollingpaper);
        final String expected = "red";

        message.changeColor(expected);

        assertThat(message.getColor()).isEqualTo(expected);
    }
}