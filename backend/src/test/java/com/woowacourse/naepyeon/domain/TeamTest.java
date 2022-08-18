package com.woowacourse.naepyeon.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.woowacourse.naepyeon.exception.ExceedTeamNameLengthException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class TeamTest {

    @Test
    @DisplayName("모임 이름을 20자를 초과하여 모임을 생성하면 예외를 발생시킨다.")
    void constructor_validName() {
        final String teamName = "abcdefghi123456789123";

        assertThatThrownBy(() -> new Team(
                        teamName,
                        "테스트 모임입니다.",
                        "testEmoji",
                        "#123456",
                        false
                )
        )
                .isInstanceOf(ExceedTeamNameLengthException.class);
    }

    @Test
    @DisplayName("모임 이름을 변경한다.")
    void changeName() {
        final String currentTeamName = "abcdefghijklmnopqrst";
        final Team team = new Team(
                currentTeamName,
                "테스트 모임입니다.",
                "testEmoji",
                "#123456",
                false
        );
        final String updateTeamName = "abcdefghi12345678912";

        team.changeName(updateTeamName);

        assertThat(team.getName()).isEqualTo(updateTeamName);
    }

    @Test
    @DisplayName("모임 이름을 20자를 초과하여 변경할 경우 예외를 발생시킨다.")
    void changeName_exceedTeamName() {
        final String currentTeamName = "abcdefghijklmnopqrst";
        final Team team = new Team(
                currentTeamName,
                "테스트 모임입니다.",
                "testEmoji",
                "#123456",
                false
        );
        final String updateTeamName = "abcdefghi123456789123";

        assertThatThrownBy(() -> team.changeName(updateTeamName))
                .isInstanceOf(ExceedTeamNameLengthException.class);
    }
}
