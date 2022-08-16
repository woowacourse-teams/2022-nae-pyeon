package com.woowacourse.naepyeon.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;

import com.woowacourse.naepyeon.domain.rollingpaper.Recipient;
import com.woowacourse.naepyeon.domain.rollingpaper.Rollingpaper;
import com.woowacourse.naepyeon.exception.ExceedRollingpaperNameLengthException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class RollingpaperTest {

    @Test
    @DisplayName("롤링페이퍼 타이틀을 변경한다.")
    void changeTitle() {
        final Team team = new Team(
                "nae-pyeon",
                "테스트 모임입니다.",
                "testEmoji",
                "#123456",
                false
        );
        final Member member = new Member("member", "m@hello.com", Platform.KAKAO, "1");
        final Rollingpaper rollingpaper = new Rollingpaper("alexAndKei", Recipient.MEMBER, team, member);
        final String expected = "kth990303";

        rollingpaper.changeTitle(expected);

        assertThat(rollingpaper.getTitle()).isEqualTo(expected);
    }

    @Test
    @DisplayName("롤링페이퍼 타이틀을 변경할 때 제목이 20자를 초과하면 예외 발생")
    void throwException_invalidChangeTitleLength() {
        final Team team = new Team(
                "nae-pyeon",
                "테스트 모임입니다.",
                "testEmoji",
                "#123456",
                false
        );
        final Member member = new Member("member", "m@hello.com", Platform.KAKAO, "1");
        final Rollingpaper rollingpaper = new Rollingpaper("seungpang", Recipient.MEMBER, team, member);

        final String invalidTitle = "seungapng, happy new year, good luck";

        assertThatThrownBy(() -> rollingpaper.changeTitle(invalidTitle))
                .isInstanceOf(ExceedRollingpaperNameLengthException.class);
    }

    @Test
    @DisplayName("롤링페이퍼 제목은 20자를 초과하면 예외 발생")
    void throwException_invalidTitleLength() {
        final Team team = new Team(
                "nae-pyeon",
                "테스트 모임입니다.",
                "testEmoji",
                "#123456",
                false
        );
        final Member member = new Member("member", "m@hello.com", Platform.KAKAO, "1");

        assertThatThrownBy(() -> new Rollingpaper("seungpang seungpang seungpang", Recipient.MEMBER, team, member))
                .isInstanceOf(ExceedRollingpaperNameLengthException.class);
    }

    @Test
    @DisplayName("롤링페이퍼 대상이 회원일 때만 비밀 메시지를 보유할 수 있다.")
    void canContainSecretMessage() {
        final Team team = new Team(
                "nae-pyeon",
                "테스트 모임입니다.",
                "testEmoji",
                "#123456"
        );
        final Member member = new Member("member", "m@hello.com", Platform.KAKAO, "1");
        final Rollingpaper rollingpaperToMember = new Rollingpaper("알고리즘이좋아요", Recipient.MEMBER, team, member);
        final Rollingpaper rollingpaperToTeam = new Rollingpaper("알고리즘이좋아요", Recipient.TEAM, team, null);

        assertAll(
                () -> assertThat(rollingpaperToMember.canContainSecretMessage()).isTrue(),
                () -> assertThat(rollingpaperToTeam.canContainSecretMessage()).isFalse()
        );
    }
}
