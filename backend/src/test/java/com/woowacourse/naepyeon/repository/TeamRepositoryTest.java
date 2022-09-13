package com.woowacourse.naepyeon.repository;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import com.woowacourse.naepyeon.config.JpaAuditingConfig;
import com.woowacourse.naepyeon.domain.Team;
import java.time.LocalDateTime;
import java.util.List;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

@DataJpaTest
@Import(JpaAuditingConfig.class)
class TeamRepositoryTest {

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private EntityManager em;

    @Test
    @DisplayName("모임을 id로 찾는다.")
    void findById() {
        // given
        final Team team = new Team("woowacourse", "테스트 모임입니다.", "testEmoji", "#123456", false);
        final Long teamId = teamRepository.save(team)
                .getId();

        // when
        final Team findTeam = teamRepository.findById(teamId)
                .orElseThrow();

        // then
        assertThat(findTeam)
                .extracting("id", "name")
                .containsExactly(teamId, "woowacourse");
    }

    @Test
    @DisplayName("특정 이름의 모임이 있는지 확인한다.")
    void existsByName() {
        // given
        final String teamName = "woowacourse";
        final Team team = new Team(teamName, "테스트 모임입니다.", "testEmoji", "#123456", false);
        teamRepository.save(team);

        // when // then
        assertThat(teamRepository.existsByName(teamName)).isTrue();
    }

    @Test
    @DisplayName("모임을 id로 제거한다.")
    void delete() {
        // given
        final Team team = new Team("woowacourse", "테스트 모임입니다.", "testEmoji", "#123456", false);
        final Long teamId = teamRepository.save(team)
                .getId();

        // when
        teamRepository.deleteById(teamId);

        // then
        assertThat(teamRepository.findById(teamId))
                .isEmpty();
    }

    @Test
    @DisplayName("특정 키워드가 포함된 모임 목록을 조회한다.")
    void findTeamsByContainingTeamName() {
        final Team team1 = new Team("woowacourse", "it's a.", "testEmoji", "#123456", false);
        final Team team2 = new Team("woowac", "it's b.", "testEmoji", "#123456", false);
        final Team team3 = new Team("woowc", "it's c.", "testEmoji", "#123456", true);
        teamRepository.save(team1);
        teamRepository.save(team2);
        teamRepository.save(team3);

        final Page<Team> teams = teamRepository.findTeamsByNameContaining("woowa", PageRequest.of(0, 5));
        assertAll(
                () -> assertThat(teams).contains(team1, team2),
                () -> assertThat(teams).doesNotContain(team3)
        );
    }

    @Test
    @DisplayName("특정 키워드가 포함된 모임 목록을 일부 페이지만 조회한다.")
    void findTeamsByContainingTeamNameWithSomePages() {
        final Team team1 = new Team("woowacourse", "it's a.", "testEmoji", "#123456", false);
        final Team team2 = new Team("woowa", "it's b.", "testEmoji", "#123456", false);
        final Team team3 = new Team("woowac", "it's c.", "testEmoji", "#123456", false);
        final Team team4 = new Team("woowaco", "it's d.", "testEmoji", "#123456", false);
        final Team team5 = new Team("woowacou", "it's e.", "testEmoji", "#123456", false);
        final Team team6 = new Team("woowacour", "it's f.", "testEmoji", "#123456", false);
        final Team team7 = new Team("woowacours", "it's g.", "testEmoji", "#123456", false);
        teamRepository.save(team1);
        teamRepository.save(team2);
        teamRepository.save(team3);
        teamRepository.save(team4);
        teamRepository.save(team5);
        teamRepository.save(team6);
        teamRepository.save(team7);

        final Page<Team> teams = teamRepository.findTeamsByNameContaining("woowa", PageRequest.of(1, 5));
        assertAll(
                () -> assertThat(teams).contains(team6, team7),
                () -> assertThat(teams).doesNotContain(team1, team2, team3, team4, team5)
        );
    }

    @Test
    @DisplayName("모임 전체를 조회한다.")
    void findAll() {
        final Team team1 = new Team("a", "it's a.", "testEmoji", "#123456", false);
        final Team team2 = new Team("b", "it's b.", "testEmoji", "#123456", true);
        final Team team3 = new Team("c", "it's c.", "testEmoji", "#123456", false);
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
        final Team team = new Team("woowacourse", "테스트 모임입니다.", "testEmoji", "#123456", false);
        final Long teamId = teamRepository.save(team)
                .getId();

        final Team actual = teamRepository.findById(teamId)
                .orElseThrow();
        assertThat(actual.getCreatedDate()).isAfter(LocalDateTime.MIN);
    }

    @Test
    @DisplayName("모임을 수정할 때 수정일자가 올바르게 나온다.")
    void updateMemberWhen() {
        final Team team = new Team("woowacourse", "테스트 모임입니다.", "testEmoji", "#123456", false);
        final Long teamId = teamRepository.save(team)
                .getId();

        team.changeName("updateupdate");
        em.flush();

        final Team actual = teamRepository.findById(teamId)
                .orElseThrow();
        assertThat(actual.getLastModifiedDate()).isAfter(actual.getCreatedDate());
    }
}
