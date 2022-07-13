package com.woowacourse.naepyeon.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.woowacourse.naepyeon.exception.ExceedRollingpaperNameLengthException;
import com.woowacourse.naepyeon.exception.ExceedTeamNameLengthException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class RollingpaperTest {

    @Test
    @DisplayName("롤링페이퍼 타이틀을 변경한다.")
    void changeTitle() {
        final Team team = new Team("nae-pyeon");
        final Member member = new Member("member", "m@hello.com", "abc@@1234");
        final Rollingpaper rollingpaper = new Rollingpaper("alexAndKei", team, member);
        final String expected = "kth990303";

        rollingpaper.changeTitle(expected);

        assertThat(rollingpaper.getTitle()).isEqualTo(expected);
    }

    @Test
    @DisplayName("롤링페이퍼 타이틀을 변경할 때 제목이 20자를 초과하면 예외 발생")
    void throwException_invalidChangeTitleLength() {
        final Team team = new Team("nae-pyeon");
        final Member member = new Member("member", "m@hello.com", "abc@@1234");
        final Rollingpaper rollingpaper = new Rollingpaper("seungpang", team, member);

        final String invalidTitle = "seungapng, happy new year, good luck";

        assertThatThrownBy(() -> rollingpaper.changeTitle(invalidTitle))
                .isInstanceOf(ExceedRollingpaperNameLengthException.class);
    }

    @Test
    @DisplayName("롤링페이퍼 제목은 20자를 초과하면 예외 발생")
    void throwException_invalidTitleLength() {
        final Team team = new Team("nae-pyeon");
        final Member member = new Member("member", "m@hello.com", "abc@@1234");

        assertThatThrownBy(() -> new Rollingpaper("seungpang seungpang seungpang", team, member))
                .isInstanceOf(ExceedRollingpaperNameLengthException.class);

    }
}