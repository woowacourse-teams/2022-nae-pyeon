package com.woowacourse.naepyeon.repository;

import static org.assertj.core.api.Assertions.assertThat;

import com.woowacourse.naepyeon.domain.Team;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Transactional
class TeamRepositoryTest {

    @Autowired
    private TeamRepository teamRepository;

    @Test
    @DisplayName("모임을 id로 찾는다.")
    public void findById() {
        // given
        final Team team = new Team("woowacourse");
        final Long teamId = teamRepository.save(team);

        // when
        final Team findTeam = teamRepository.findById(teamId).get();

        // then
        assertThat(findTeam)
                .extracting("id", "name")
                .containsExactly(teamId, "woowacourse");
    }

    @Test
    @DisplayName("모임을 id로 제거한다.")
    public void delete() {
        // given
        final Team team = new Team("woowacourse");
        final Long teamId = teamRepository.save(team);

        // when
        teamRepository.delete(teamId);

        // then
        assertThat(teamRepository.findById(teamId))
                .isEmpty();
    }
}