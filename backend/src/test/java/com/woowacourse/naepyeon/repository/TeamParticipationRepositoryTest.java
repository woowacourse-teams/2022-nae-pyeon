package com.woowacourse.naepyeon.repository;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import com.woowacourse.naepyeon.domain.Member;
import com.woowacourse.naepyeon.domain.Team;
import com.woowacourse.naepyeon.domain.TeamParticipation;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Transactional
class TeamParticipationRepositoryTest {

    @Autowired
    private TeamMemberRepository teamMemberRepository;

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private MemberRepository memberRepository;

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
        final String nickname = "닉네임";
        final TeamParticipation teamParticipation = new TeamParticipation(team1, member1, nickname);
        final Long savedId = teamMemberRepository.save(teamParticipation);

        final TeamParticipation findTeamParticipation = teamMemberRepository.findById(savedId)
                .orElseThrow();

        assertAll(
                () -> assertThat(findTeamParticipation.getMember().getId()).isEqualTo(member1.getId()),
                () -> assertThat(findTeamParticipation.getTeam().getId()).isEqualTo(team1.getId()),
                () -> assertThat(findTeamParticipation.getNickname()).isEqualTo(nickname)
        );
    }

    @Test
    @DisplayName("모임에 가입한 회원들을 team id로 조회한다.")
    void findByTeamId() {
        final TeamParticipation teamParticipation1 = new TeamParticipation(team1, member1, "닉네임1");
        final TeamParticipation teamParticipation2 = new TeamParticipation(team2, member1, "닉네임2");
        final TeamParticipation teamParticipation3 = new TeamParticipation(team2, member2, "닉네임3");
        teamMemberRepository.save(teamParticipation1);
        teamMemberRepository.save(teamParticipation2);
        teamMemberRepository.save(teamParticipation3);

        final List<TeamParticipation> findTeam1Members = teamMemberRepository.findByTeamId(team1.getId());
        final List<TeamParticipation> findTeam2Members = teamMemberRepository.findByTeamId(team2.getId());

        assertAll(
                () -> assertThat(findTeam1Members).contains(teamParticipation1),
                () -> assertThat(findTeam2Members).contains(teamParticipation2, teamParticipation3)
        );
    }
}