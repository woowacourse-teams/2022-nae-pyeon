package com.woowacourse.naepyeon.service;

import com.woowacourse.naepyeon.service.dto.TeamResponse;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@Transactional
class TeamServiceTest {

    @Autowired
    private TeamService teamService;

    @Test
    @DisplayName("모임을 id값으로 찾는다.")
    public void findById() {
        // given
        Long teamId = teamService.save("woowacourse");

        // when
        TeamResponse findTeam = teamService.findById(teamId);

        // then
        assertThat(findTeam)
                .extracting("id", "name")
                .containsExactly(teamId, "woowacourse");
    }

    @Test
    @DisplayName("모임의 이름을 수정한다.")
    public void update() {
        // given
        Long teamId = teamService.save("woowacourse-4th");

        // when
        teamService.updateName(teamId, "woowacourse-5th");

        // then
        assertThat(teamService.findById(teamId))
                .extracting("id", "name")
                .containsExactly(teamId, "woowacourse-5th");
    }

    @Test
    @DisplayName("모임을 id으로 제거한다.")
    public void delete() {
        // given
        Long teamId = teamService.save("woowacourse-4th");

        // when
        teamService.delete(teamId);

        // then
        assertThatThrownBy(() -> teamService.findById(teamId))
                .isInstanceOf(IllegalArgumentException.class);
    }
}