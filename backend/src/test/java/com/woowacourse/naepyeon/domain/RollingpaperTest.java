package com.woowacourse.naepyeon.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class RollingpaperTest {

    @Test
    @DisplayName("롤링페이퍼 타이틀을 변경한다.")
    void changeTitle() {
        final Team team = new Team("nae-pyeon");
        final Member member = new Member("member", "m@hello", "abc@@1234");
        final Rollingpaper rollingpaper = new Rollingpaper("alexAndKei", team, member);
        final String expected = "kth990303";

        rollingpaper.changeTitle(expected);

        assertThat(rollingpaper.getTitle()).isEqualTo(expected);
    }
}