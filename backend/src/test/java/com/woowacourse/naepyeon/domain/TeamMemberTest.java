package com.woowacourse.naepyeon.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.woowacourse.naepyeon.exception.ExceedNicknameLengthException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class TeamMemberTest {

    @Test
    @DisplayName("모임에 가입된 멤버의 모임 닉네임을 변경한다.")
    void changeNickname() {
        final Team team = new Team(
                "내편",
                "테스트 모임입니다.",
                "testEmoji",
                "#123456"
        );
        final Member member = new Member("제로", "email@email.com", "zero1234");
        final TeamMember teamMember = new TeamMember(team, member, "닉네임ㅋㅋ");

        final String expected = "바뀌는닉네임ㅋㅋ";
        teamMember.changeNickname(expected);

        assertThat(teamMember.getNickname()).isEqualTo(expected);
    }

    @Test
    @DisplayName("닉네임 규칙에 맞지 않는 닉네임으로 변경시 예외가 발생한다.")
    void changeNicknameWithInvalidNickname() {
        final Team team = new Team(
                "내편",
                "테스트 모임입니다.",
                "testEmoji",
                "#123456"
        );
        final Member member = new Member("제로", "email@email.com", "zero1234");
        final TeamMember teamMember = new TeamMember(team, member, "닉네임ㅋㅋ");

        assertThatThrownBy(() -> teamMember.changeNickname("asdsaddasdasddasdasdasdasdasdsadasdaasdasd"))
                .isInstanceOf(ExceedNicknameLengthException.class);
    }
}