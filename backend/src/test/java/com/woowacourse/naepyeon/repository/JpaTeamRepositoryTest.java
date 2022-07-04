package com.woowacourse.naepyeon.repository;

import com.woowacourse.naepyeon.domain.Team;
import com.woowacourse.naepyeon.repository.jpa.TeamJpaDao;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(SpringExtension.class)
@DataJpaTest
class JpaTeamRepositoryTest {

    @Autowired
    private TeamJpaDao teamJpaDao;

    private TeamRepository teamRepository;

    @BeforeEach
    void setup() {
        teamRepository = new JpaTeamRepository(teamJpaDao);
    }

    @Test
    @DisplayName("모임을 id로 찾는다.")
    public void findById() {
        // given
        Team team = new Team("woowacourse");
        Long teamId = teamRepository.save(team);

        // when
        Team findTeam = teamRepository.findById(teamId).get();

        // then
        assertThat(findTeam)
                .extracting("id", "name")
                .containsExactly(teamId, "woowacourse");
    }

    @Test
    @DisplayName("모임을 id로 제거한다.")
    public void delete() {
        // given
        Team team = new Team("woowacourse");
        Long teamId = teamRepository.save(team);

        // when
        teamRepository.delete(teamId);

        // then
        assertThat(teamRepository.findById(teamId))
                .isEmpty();
    }
}