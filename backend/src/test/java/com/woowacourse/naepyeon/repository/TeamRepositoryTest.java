package com.woowacourse.naepyeon.repository;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;

import com.woowacourse.naepyeon.domain.Team;
import com.woowacourse.naepyeon.exception.NotFoundTeamException;
import java.time.LocalDateTime;
import java.util.List;
import javax.persistence.EntityManager;
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

    @Autowired
    private EntityManager em;

    @Test
    @DisplayName("모임을 id로 찾는다.")
    void findById() {
        // given
        final Team team = new Team("woowacourse", "테스트 모임입니다.", "testEmoji", "#123456");
        final Long teamId = teamRepository.save(team);

        // when
        final Team findTeam = teamRepository.findById(teamId)
                .orElseThrow();

        // then
        assertThat(findTeam)
                .extracting("id", "name")
                .containsExactly(teamId, "woowacourse");
    }

    @Test
    @DisplayName("모임을 id로 제거한다.")
    void delete() {
        // given
        final Team team = new Team("woowacourse", "테스트 모임입니다.", "testEmoji", "#123456");
        final Long teamId = teamRepository.save(team);

        // when
        teamRepository.delete(teamId);

        // then
        assertThat(teamRepository.findById(teamId))
                .isEmpty();
    }

    @Test
    @DisplayName("존재하지 않는 모임을 삭제할 경우 예외를 발생시킨다.")
    void deleteWithNotFoundTeam() {
        // given
        final Team team = new Team("woowacourse", "테스트 모임입니다.", "testEmoji", "#123456");
        final Long teamId = teamRepository.save(team);

        // when // then
        assertThatThrownBy(() -> teamRepository.delete(teamId + 1L))
                .isInstanceOf(NotFoundTeamException.class);
    }

    @Test
    @DisplayName("모임 전체를 조회한다.")
    void findAll() {
        final Team team1 = new Team("a", "it's a.", "testEmoji", "#123456");
        final Team team2 = new Team("b", "it's b.", "testEmoji", "#123456");
        final Team team3 = new Team("c", "it's c.", "testEmoji", "#123456");
        teamRepository.save(team1);
        teamRepository.save(team2);

        final List<Team> teams = teamRepository.findAll();
        assertAll(
                () -> assertThat(teams).contains(team1, team2),
                () -> assertThat(teams).doesNotContain(team3)
        );
    }

    @Test
    @DisplayName("모임을 생성할 때 생성일자가 올바르게 나온다.")
    void createMemberWhen() {
        final Team team = new Team("woowacourse", "테스트 모임입니다.", "testEmoji", "#123456");
        final Long teamId = teamRepository.save(team);

        final Team actual = teamRepository.findById(teamId)
                .orElseThrow();
        assertThat(actual.getCreatedDate()).isAfter(LocalDateTime.MIN);
    }

    @Test
    @DisplayName("모임을 수정할 때 수정일자가 올바르게 나온다.")
    void updateMemberWhen() {
        final Team team = new Team("woowacourse", "테스트 모임입니다.", "testEmoji", "#123456");
        final Long teamId = teamRepository.save(team);

        em.flush();
        team.changeName("updateupdate");
        em.flush();

        final Team actual = teamRepository.findById(teamId)
                .orElseThrow();
        assertThat(actual.getLastModifiedDate()).isAfter(actual.getCreatedDate());
    }
}