package com.woowacourse.naepyeon.repository;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import com.woowacourse.naepyeon.domain.Member;
import com.woowacourse.naepyeon.domain.Team;
import com.woowacourse.naepyeon.domain.TeamMember;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Transactional
class TeamMemberRepositoryTest {

    private final Member member1 = new Member("내편이1", "naePyeon1@test.com", "testtest123");
    private final Member member2 = new Member("내편이2", "naePyeon2@test.com", "testtest123");
    private final Team team1 = new Team(
            "wooteco1",
            "테스트 모임입니다.",
            "testEmoji",
            "#123456"
    );
    private final Team team2 = new Team(
            "wooteco2",
            "테스트 모임입니다.",
            "testEmoji",
            "#123456"
    );

    @BeforeEach
    void setUp() {
        teamRepository.save(team1);
        teamRepository.save(team2);
        memberRepository.save(member1);
        memberRepository.save(member2);
    }

    @Test
    @DisplayName("회원을 모임에 가입시키고 가입한 회원을 조회한다.")
    void saveAndFind() {
        final TeamMember teamMember = new TeamMember(team1, member1);
        final Long savedId = teamMemberRepository.save(teamMember);

        final TeamMember findTeamMember = teamMemberRepository.findById(savedId)
                .orElseThrow();

        assertAll(
                () -> assertThat(findTeamMember.getMember().getId()).isEqualTo(member1.getId()),
                () -> assertThat(findTeamMember.getTeam().getId()).isEqualTo(team1.getId())
        );
    }

    @Test
    @DisplayName("모임에 가입한 회원들을 team id로 조회한다.")
    void findByTeamId() {
        final TeamMember teamMember1 = new TeamMember(team1, member1);
        final TeamMember teamMember2 = new TeamMember(team2, member1);
        final TeamMember teamMember3 = new TeamMember(team2, member2);
        teamMemberRepository.save(teamMember1);
        teamMemberRepository.save(teamMember2);
        teamMemberRepository.save(teamMember3);

        final List<TeamMember> findTeam1Members = teamMemberRepository.findByTeamId(team1.getId());
        final List<TeamMember> findTeam2Members = teamMemberRepository.findByTeamId(team2.getId());

        assertAll(
                () -> assertThat(findTeam1Members).contains(teamMember1),
                () -> assertThat(findTeam2Members).contains(teamMember2, teamMember3)
        );
    }
}