package com.woowacourse.naepyeon.repository;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import com.woowacourse.naepyeon.config.JpaAuditingConfig;
import com.woowacourse.naepyeon.config.QueryDslConfig;
import com.woowacourse.naepyeon.domain.Member;
import com.woowacourse.naepyeon.domain.Platform;
import com.woowacourse.naepyeon.domain.Team;
import com.woowacourse.naepyeon.domain.TeamParticipation;
import com.woowacourse.naepyeon.repository.member.MemberRepository;
import com.woowacourse.naepyeon.repository.team.TeamRepository;
import com.woowacourse.naepyeon.repository.teamparticipation.TeamParticipationRepository;
import java.time.LocalDateTime;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.context.annotation.Import;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

@DataJpaTest
@Import({JpaAuditingConfig.class, QueryDslConfig.class})
class TeamParticipationRepositoryTest {

    @Autowired
    private TeamParticipationRepository teamParticipationRepository;

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private TestEntityManager em;

    private final Member member1 = new Member("내편이1", "naePyeon1@test.com", Platform.KAKAO, "1");
    private final Member member2 = new Member("내편이2", "naePyeon2@test.com", Platform.KAKAO, "2");
    private final Team team1 = new Team("wooteco1", "테스트 모임입니다.", "testEmoji", "#123456", false);
    private final Team team2 = new Team("wooteco2", "테스트 모임입니다.", "testEmoji", "#123456", false);
    private final Team team3 = new Team("wooteco3", "테스트 모임입니다.", "testEmoji", "#123456", false);

    @BeforeEach
    void setUp() {
        teamRepository.save(team1);
        teamRepository.save(team2);
        teamRepository.save(team3);
        memberRepository.save(member1);
        memberRepository.save(member2);
    }

    @Test
    @DisplayName("회원을 모임에 가입시키고 가입한 회원을 조회한다.")
    void saveAndFind() {
        final String nickname = "닉네임";
        final TeamParticipation teamParticipation = new TeamParticipation(team1, member1, nickname);
        final Long savedId = teamParticipationRepository.save(teamParticipation)
                .getId();

        final TeamParticipation findTeamParticipation = teamParticipationRepository.findById(savedId)
                .orElseThrow();

        assertAll(
                () -> assertThat(findTeamParticipation.getMember().getId()).isEqualTo(member1.getId()),
                () -> assertThat(findTeamParticipation.getTeam().getId()).isEqualTo(team1.getId()),
                () -> assertThat(findTeamParticipation.getNickname()).isEqualTo(nickname)
        );
    }

    @Test
    @DisplayName("회원을 모임에 가입시키고 가입 관계를 조회한다.")
    void saveAndFindByTeamIdAndMemberId() {
        final String nickname = "닉네임";
        final TeamParticipation teamParticipation = new TeamParticipation(team1, member1, nickname);
        final Long savedId = teamParticipationRepository.save(teamParticipation)
                .getId();

        final TeamParticipation findTeamParticipation =
                teamParticipationRepository.findByTeamIdAndMemberId(team1.getId(), member1.getId());

        assertAll(
                () -> assertThat(findTeamParticipation.getId()).isEqualTo(savedId),
                () -> assertThat(findTeamParticipation.getNickname()).isEqualTo(nickname)
        );
    }

    @Test
    @DisplayName("모임에 가입한 회원들을 team id로 조회한다.")
    void findByTeamId() {
        final TeamParticipation teamParticipation1 = new TeamParticipation(team1, member1, "닉네임1");
        final TeamParticipation teamParticipation2 = new TeamParticipation(team2, member1, "닉네임2");
        final TeamParticipation teamParticipation3 = new TeamParticipation(team2, member2, "닉네임3");
        teamParticipationRepository.save(teamParticipation1);
        teamParticipationRepository.save(teamParticipation2);
        teamParticipationRepository.save(teamParticipation3);

        final List<TeamParticipation> findTeam1Members = teamParticipationRepository.findByTeamId(team1.getId());
        final List<TeamParticipation> findTeam2Members = teamParticipationRepository.findByTeamId(team2.getId());

        assertAll(
                () -> assertThat(findTeam1Members).contains(teamParticipation1),
                () -> assertThat(findTeam2Members).contains(teamParticipation2, teamParticipation3)
        );
    }

    @Test
    @DisplayName("회원이 가입한 모임 목록을 조회한다.")
    void findTeamsByJoinedMemberId() {
        final TeamParticipation teamParticipation1 = new TeamParticipation(team1, member1, "닉네임1");
        final TeamParticipation teamParticipation2 = new TeamParticipation(team3, member1, "닉네임2");

        teamParticipationRepository.save(teamParticipation1);
        teamParticipationRepository.save(teamParticipation2);

        final Page<Team> joinedTeams =
                teamParticipationRepository.findTeamsByMemberId(member1.getId(), PageRequest.of(0, 1));

        assertAll(
                () -> assertThat(joinedTeams).contains(team3),
                () -> assertThat(joinedTeams).doesNotContain(team2, team1)
        );
    }

    @Test
    @DisplayName("회원의 아이디로 특정 팀의 닉네임을 조회한다.")
    void findNicknameByAddresseeId() {
        final String expected = "닉네임1";
        final TeamParticipation teamParticipation1 = new TeamParticipation(team1, member1, expected);

        teamParticipationRepository.save(teamParticipation1);

        final String actual =
                teamParticipationRepository.findNicknameByTeamIdAndMemberId(team1.getId(), member1.getId());

        assertThat(actual).isEqualTo(expected);
    }

    @Test
    @DisplayName("특정 팀의 모든 닉네임들을 조회한다.")
    void findAllNicknamesByTeamId() {
        final TeamParticipation teamParticipation1 = new TeamParticipation(team1, member1, "닉네임1");
        final TeamParticipation teamParticipation2 = new TeamParticipation(team1, member2, "닉네임2");

        teamParticipationRepository.save(teamParticipation1);
        teamParticipationRepository.save(teamParticipation2);

        final List<String> actual = teamParticipationRepository.findAllNicknamesByTeamId(team1.getId());

        assertThat(actual).contains("닉네임1", "닉네임2");
    }

    @Test
    @DisplayName("회원 가입일자가 올바르게 나온다.")
    void createMemberWhen() {
        final TeamParticipation teamParticipation = new TeamParticipation(team1, member1, "닉네임1");
        final Long teamParticipationId = teamParticipationRepository.save(teamParticipation)
                .getId();

        final TeamParticipation actual = teamParticipationRepository.findById(teamParticipationId)
                .orElseThrow();
        assertThat(actual.getCreatedDate()).isAfter(LocalDateTime.MIN);
    }

    @Test
    @DisplayName("회원이 특정 팀의 닉네임을 변경한다.")
    void updateNickname() {
        final String expected = "닉네임2";
        final TeamParticipation teamParticipation = new TeamParticipation(team1, member1, "닉네임1");
        final Long teamParticipationId = teamParticipationRepository.save(teamParticipation)
                .getId();

        teamParticipationRepository.updateNickname(expected, member1.getId(), team1.getId());

        final String actual = teamParticipationRepository.findById(teamParticipationId)
                .orElseThrow()
                .getNickname();
        assertThat(actual).isEqualTo(expected);
    }
}
