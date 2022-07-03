package com.woowacourse.naepyeon.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class MessageTest {

    @Test
    @DisplayName("메시지 내용을 변경한다.")
    void changeContent() {
        final Team team = new Team("nae-pyeon");
        final Member member = new Member("member", "m@hello", "abc@@1234");
        final Member author = new Member("author", "a@hello", "abc@@1234");
        final Rollingpaper rollingpaper = new Rollingpaper("alexAndKei", team, member);
        final Message message = new Message("헬로우", author, rollingpaper);
        final String expected = "낫 헬로우";

        message.changeContent(expected);

        assertThat(message.getContent()).isEqualTo(expected);
    }
}