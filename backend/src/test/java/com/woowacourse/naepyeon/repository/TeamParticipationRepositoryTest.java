package com.woowacourse.naepyeon.repository;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;

import com.woowacourse.naepyeon.domain.Member;
import com.woowacourse.naepyeon.domain.Team;
import com.woowacourse.naepyeon.domain.TeamParticipation;
import com.woowacourse.naepyeon.exception.DuplicateTeamPaticipateException;
import java.time.LocalDateTime;
import java.util.List;
import javax.persistence.EntityManager;
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
    private TeamParticipationRepository teamParticipationRepository;

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private EntityManager em;

    private final Member member1 = new Member("내편이1", "naePyeon1@test.com", "testtest123");
    private final Member member2 = new Member("내편이2", "naePyeon2@test.com", "testtest123");
    private final Team team1 = new Team("wooteco1", "테스트 모임입니다.", "testEmoji", "#123456");
    private final Team team2 = new Team("wooteco2", "테스트 모임입니다.", "testEmoji", "#123456");
    private final Team team3 = new Team("wooteco3", "테스트 모임입니다.", "testEmoji", "#123456");

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
        final Long savedId = teamParticipationRepository.save(teamParticipation);

        final TeamParticipation findTeamParticipation = teamParticipationRepository.findById(savedId)
                .orElseThrow();

        assertAll(
                () -> assertThat(findTeamParticipation.getMember().getId()).isEqualTo(member1.getId()),
                () -> assertThat(findTeamParticipation.getTeam().getId()).isEqualTo(team1.getId()),
                () -> assertThat(findTeamParticipation.getNickname()).isEqualTo(nickname)
        );
    }

    @Test
    @DisplayName("이미 해당 모임에 가입한 회원이 다시 가입할 경우 예외를 발생시킨다.")
    void duplicateSaveException() {
        final String nickname = "닉네임";
        final TeamParticipation teamParticipation1 = new TeamParticipation(team1, member1, nickname);
        final TeamParticipation teamParticipation2 = new TeamParticipation(team1, member1, nickname);
        teamParticipationRepository.save(teamParticipation1);

        assertThatThrownBy(() -> teamParticipationRepository.save(teamParticipation2))
                .isInstanceOf(DuplicateTeamPaticipateException.class);
    }

    @Test
    @DisplayName("모임에 가입한 회원을 memberId와 teamId로 찾는다.")
    void findMemberByMemberIdAndTeamId() {
        final TeamParticipation teamParticipation1 = new TeamParticipation(team1, member1, "닉네임1");
        teamParticipationRepository.save(teamParticipation1);

        final Member actual = teamParticipationRepository.findMemberByMemberIdAndTeamId(member1.getId(), team1.getId())
                .orElseThrow();
        assertThat(actual).isEqualTo(member1);
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

        final List<Team> joinedTeams = teamParticipationRepository.findTeamsByMemberId(member1.getId());

        assertThat(joinedTeams).contains(team1, team3);
    }

    @Test
    @DisplayName("회원의 아이디로 특정 팀의 닉네임을 조회한다.")
    void findNicknameByAddresseeId() {
        final String expected = "닉네임1";
        final TeamParticipation teamParticipation1 = new TeamParticipation(team1, member1, expected);

        teamParticipationRepository.save(teamParticipation1);

        final String actual =
                teamParticipationRepository.findNicknameByMemberIdAndTeamId(member1.getId(), team1.getId());

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
    @DisplayName("특정 모임에 회원이 가입했는지 여부를 반환한다.")
    void isJoinedMember() {
        final TeamParticipation teamParticipation1 = new TeamParticipation(team1, member1, "닉네임1");
        final TeamParticipation teamParticipation2 = new TeamParticipation(team2, member1, "닉네임2");
        final TeamParticipation teamParticipation3 = new TeamParticipation(team2, member2, "닉네임3");
        teamParticipationRepository.save(teamParticipation1);
        teamParticipationRepository.save(teamParticipation2);
        teamParticipationRepository.save(teamParticipation3);

        assertAll(
                () -> assertThat(teamParticipationRepository.isJoinedMember(member1.getId(), team1.getId())).isTrue(),
                () -> assertThat(teamParticipationRepository.isJoinedMember(member2.getId(), team1.getId())).isFalse()
        );
    }

    @Test
    @DisplayName("회원 가입일자가 올바르게 나온다.")
    void createMemberWhen() {
        final TeamParticipation teamParticipation = new TeamParticipation(team1, member1, "닉네임1");
        final Long teamParticipationId = teamParticipationRepository.save(teamParticipation);

        final TeamParticipation actual = teamParticipationRepository.findById(teamParticipationId)
                .orElseThrow();
        assertThat(actual.getCreatedDate()).isAfter(LocalDateTime.MIN);
    }

    @Test
    @DisplayName("회원이 특정 팀의 닉네임을 변경한다.")
    void updateNickname() {
        final String expected = "닉네임2";
        final TeamParticipation teamParticipation = new TeamParticipation(team1, member1, "닉네임1");
        final Long teamParticipationId = teamParticipationRepository.save(teamParticipation);

        teamParticipationRepository.updateNickname(expected, member1.getId(), team1.getId());
        em.flush();

        final String actual = teamParticipationRepository.findById(teamParticipationId)
                .orElseThrow()
                .getNickname();
        assertThat(actual).isEqualTo(expected);
    }
}