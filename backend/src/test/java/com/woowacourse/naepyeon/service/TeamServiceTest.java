package com.woowacourse.naepyeon.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;

import com.woowacourse.naepyeon.domain.Member;
import com.woowacourse.naepyeon.domain.Platform;
import com.woowacourse.naepyeon.domain.Team;
import com.woowacourse.naepyeon.domain.TeamParticipation;
import com.woowacourse.naepyeon.exception.DuplicateNicknameException;
import com.woowacourse.naepyeon.exception.DuplicateTeamPaticipateException;
import com.woowacourse.naepyeon.exception.NotFoundMemberException;
import com.woowacourse.naepyeon.exception.NotFoundTeamException;
import com.woowacourse.naepyeon.exception.UncertificationTeamMemberException;
import com.woowacourse.naepyeon.repository.invitecode.InviteCodeRepository;
import com.woowacourse.naepyeon.repository.member.MemberRepository;
import com.woowacourse.naepyeon.repository.team.TeamRepository;
import com.woowacourse.naepyeon.repository.teamparticipation.TeamParticipationRepository;
import com.woowacourse.naepyeon.service.dto.AllTeamsResponseDto;
import com.woowacourse.naepyeon.service.dto.JoinedMemberResponseDto;
import com.woowacourse.naepyeon.service.dto.TeamMemberResponseDto;
import com.woowacourse.naepyeon.service.dto.TeamRequestDto;
import com.woowacourse.naepyeon.service.dto.TeamResponseDto;
import com.woowacourse.naepyeon.service.dto.TeamsResponseDto;
import java.util.List;
import java.util.stream.Collectors;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
class TeamServiceTest {

    private final Member member = new Member("내편이", "naePyeon@test.com", Platform.KAKAO, "1");
    private final Member member2 = new Member("알렉스형", "alex@test.com", Platform.KAKAO, "2");
    private final Team team1 = new Team("wooteco1", "테스트 모임입니다.", "testEmoji", "#123456", false);
    private final Team team2 = new Team("wooteco2", "테스트 모임입니다.", "testEmoji", "#123456", false);
    private final Team team3 = new Team("wooteco13", "테스트 모임입니다.", "testEmoji", "#123456", true);

    @Autowired
    private TeamService teamService;
    @Autowired
    private TeamRepository teamRepository;
    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private TeamParticipationRepository teamParticipationRepository;

    @Autowired
    private InviteCodeRepository inviteCodeRepository;

    @BeforeEach
    void setUp() {
        memberRepository.save(member);
        memberRepository.save(member2);
        teamRepository.save(team1);
        teamRepository.save(team2);
        teamRepository.save(team3);
    }

    @Test
    @DisplayName("모임을 id값으로 찾는다.")
    void findById() {
        // given
        final TeamRequestDto teamRequestDto = new TeamRequestDto(
                "woowacourse",
                "테스트 모임입니다.",
                "testEmoji",
                "#123456",
                "나는야모임장",
                false
        );
        final Long teamId = teamService.save(teamRequestDto, member.getId());

        // when
        final TeamResponseDto findTeam = teamService.findById(teamId, member.getId());

        // then
        assertThat(findTeam)
                .extracting("id", "name", "description", "emoji", "color")
                .containsExactly(
                        teamId,
                        teamRequestDto.getName(),
                        teamRequestDto.getDescription(),
                        teamRequestDto.getEmoji(),
                        teamRequestDto.getColor()
                );
    }

    @Test
    @DisplayName("모임을 생성시 생성한 유저가 자동으로 해당 모임에 가입된다.")
    void createTeamAndParticipateOwner() {
        // given
        final TeamRequestDto teamRequestDto = new TeamRequestDto(
                "woowacourse",
                "테스트 모임입니다.",
                "testEmoji",
                "#123456",
                "나는야모임장",
                false
        );
        final Long teamId = teamService.save(teamRequestDto, member.getId());

        final List<Long> joinedTeamIds = teamService.findByJoinedMemberId(member.getId(), 0, 5)
                .getTeams()
                .stream()
                .map(TeamResponseDto::getId)
                .collect(Collectors.toList());

        assertThat(joinedTeamIds).contains(teamId);
    }

    @Test
    @DisplayName("모임의 이름을 수정한다.")
    void update() {
        // given
        final TeamRequestDto teamRequestDto = new TeamRequestDto(
                "woowacourse-4th",
                "테스트 모임입니다.",
                "testEmoji",
                "#123456",
                "나는야모임장",
                false
        );
        final Long teamId = teamService.save(teamRequestDto, member.getId());

        // when
        final String expected = "woowacourse-5th";
        teamService.updateName(teamId, expected);

        // then
        assertThat(teamService.findById(teamId, member.getId()))
                .extracting("id", "name", "description", "emoji", "color")
                .containsExactly(
                        teamId,
                        expected,
                        teamRequestDto.getDescription(),
                        teamRequestDto.getEmoji(),
                        teamRequestDto.getColor()
                );
    }

//    @Test
//    @DisplayName("모임을 id으로 제거한다.")
//    void delete() {
//        // given
//        final TeamRequest teamRequest = new TeamRequest(
//                "woowacourse-4th",
//                "테스트 모임입니다.",
//                "testEmoji",
//                "#123456"
//        );
//        final Long teamId = teamService.save(teamRequest, member.getId());
//
//        // when
//        teamService.delete(teamId);
//
//        // then
//        assertThatThrownBy(() -> teamService.findById(teamId))
//                .isInstanceOf(NotFoundTeamException.class);
//    }

    @Test
    @DisplayName("회원을 모임에 가입시킨다.")
    void joinMember() {
        final String nickname = "닉네임";
        final Long joinedId = teamService.joinMember(team1.getId(), member.getId(), nickname);
        final TeamParticipation findTeamParticipation = teamParticipationRepository.findById(joinedId)
                .orElseThrow();

        assertAll(
                () -> assertThat(findTeamParticipation.getMember().getId()).isEqualTo(member.getId()),
                () -> assertThat(findTeamParticipation.getTeam().getId()).isEqualTo(team1.getId()),
                () -> assertThat(findTeamParticipation.getNickname()).isEqualTo(nickname)
        );
    }

    @Test
    @DisplayName("이미 가입한 모임에 회원을 가입시킬 경우 예외를 발생시킨다.")
    void joinMemberToParticipatedTeam() {
        final String nickname1 = "닉네임1";
        final String nickname2 = "닉네임2";
        teamService.joinMember(team1.getId(), member.getId(), nickname1);

        assertThatThrownBy(() -> teamService.joinMember(team1.getId(), member.getId(), nickname2))
                .isInstanceOf(DuplicateTeamPaticipateException.class);
    }

    @Test
    @DisplayName("존재하지 않는 회원을 가입시킬 경우 예외를 발생시킨다.")
    void joinNotFoundMember() {
        final String nickname = "닉네임";
        assertThatThrownBy(() -> teamService.joinMember(team2.getId(), member.getId() + 1000L, nickname))
                .isInstanceOf(NotFoundMemberException.class);
    }

    @Test
    @DisplayName("회원을 존재하지 않는 모임에 가입시킬 경우 예외를 발생시킨다.")
    void joinMemberWithNotFoundTeam() {
        final String nickname = "닉네임";
        assertThatThrownBy(() -> teamService.joinMember(team3.getId() + 1000L, member.getId(), nickname))
                .isInstanceOf(NotFoundTeamException.class);
    }

    @Test
    @DisplayName("이미 존재하는 닉네임으로 모임에 가입신청할 경우 예외를 발생시킨다.")
    void joinMemberWithDuplicateNickname() {
        final String nickname = "닉네임";
        teamService.joinMember(team1.getId(), member.getId(), nickname);

        assertThatThrownBy(() -> teamService.joinMember(team1.getId(), member2.getId(), nickname))
                .isInstanceOf(DuplicateNicknameException.class);
    }

    @Test
    @DisplayName("이름에 특정 키워드가 포함된 모임들을 조회한다.")
    void findTeamsByContainingTeamName() {
        final List<TeamResponseDto> actual =
                teamService.findTeamsByContainingTeamName("wooteco1", member.getId(), 0, 5)
                        .getTeams();
        final List<TeamResponseDto> expected = List.of(
                TeamResponseDto.of(team1, false, false),
                TeamResponseDto.of(team3, false, true)
        );
        assertThat(actual)
                .usingRecursiveComparison()
                .isEqualTo(expected);
    }

    @Test
    @DisplayName("모든 모임을 조회한다.")
    void findAll() {
        final AllTeamsResponseDto teams = teamService.findAll(member.getId());
        final List<String> teamNames = teams.getTeams()
                .stream()
                .map(TeamResponseDto::getName)
                .collect(Collectors.toList());

        assertThat(teamNames).contains(team1.getName(), team2.getName(), team3.getName());
    }

    @Test
    @DisplayName("회원이 가입한 모임 목록을 조회한다.")
    void findByJoinedMemberId() {
        final TeamParticipation teamParticipation1 = new TeamParticipation(team1, member, "닉네임1");
        final TeamParticipation teamParticipation2 = new TeamParticipation(team3, member, "닉네임2");
        teamParticipationRepository.save(teamParticipation1);
        teamParticipationRepository.save(teamParticipation2);

        final TeamsResponseDto teams = teamService.findByJoinedMemberId(member.getId(), 0, 5);
        final List<String> teamNames = teams.getTeams()
                .stream()
                .map(TeamResponseDto::getName)
                .collect(Collectors.toList());

        assertThat(teamNames).contains(team1.getName(), team3.getName());
    }

    @Test
    @DisplayName("모임에 가입된 회원들을 조회한다.")
    void findJoinedMembers() {
        final TeamParticipation teamParticipation1 = new TeamParticipation(team1, member, "닉네임1");
        final TeamParticipation teamParticipation2 = new TeamParticipation(team1, member2, "닉네임2");
        teamParticipationRepository.save(teamParticipation1);
        teamParticipationRepository.save(teamParticipation2);

        final List<JoinedMemberResponseDto> actual = teamService.findJoinedMembers(team1.getId())
                .getMembers();

        final List<JoinedMemberResponseDto> expected = List.of(
                new JoinedMemberResponseDto(member.getId(), "닉네임1"),
                new JoinedMemberResponseDto(member2.getId(), "닉네임2")
        );

        assertThat(actual)
                .usingRecursiveComparison()
                .isEqualTo(expected);
    }

    @Test
    @DisplayName("모임에 회원 가입 여부를 확인할 때, 가입 여부를 반환한다.")
    void isJoinedMember() {
        final TeamParticipation teamParticipation = new TeamParticipation(team1, member, "닉네임1");
        teamParticipationRepository.save(teamParticipation);

        assertAll(
                () -> assertThat(teamService.isJoinedMember(member.getId(), team1.getId())).isTrue(),
                () -> assertThat(teamService.isJoinedMember(member.getId(), team2.getId())).isFalse(),
                () -> assertThat(teamService.isJoinedMember(member2.getId(), team1.getId())).isFalse()
        );
    }

    @Test
    @DisplayName("모임에 회원 가입 여부를 확인할 때, 해당 모임이 존재하지 않으면 예외를 발생시킨다.")
    void isJoinedMemberWithNotFoundTeam() {
        assertThatThrownBy(() -> teamService.isJoinedMember(member.getId(), team1.getId() + 1000L))
                .isInstanceOf(NotFoundTeamException.class);
    }

    @Test
    @DisplayName("모임에서의 마이페이지를 조회한다.")
    void findMyInfoInTeam() {
        final String expected = "닉네임1";
        final TeamParticipation teamParticipation = new TeamParticipation(team1, member, expected);
        teamParticipationRepository.save(teamParticipation);

        final TeamMemberResponseDto actual = teamService.findMyInfoInTeam(team1.getId(), member.getId());

        assertThat(actual.getNickname()).isEqualTo(expected);
    }

    @Test
    @DisplayName("모임 내 마이페이지 조회 창에서 가입한 모임이 아닐 경우 예외를 발생시킨다.")
    void findMyInfoInOtherTeam() {
        final TeamParticipation teamParticipation = new TeamParticipation(team1, member, "해커");
        teamParticipationRepository.save(teamParticipation);

        assertThatThrownBy(() -> teamService.findMyInfoInTeam(team2.getId(), member.getId()))
                .isInstanceOf(UncertificationTeamMemberException.class);
    }

    @Test
    @DisplayName("존재하지 않는 모임에서 마이페이지를 조회할 경우 예외를 발생시킨다.")
    void findMyInfoInNotExistTeam() {
        assertThatThrownBy(() -> teamService.findMyInfoInTeam(team1.getId() + 10000L, member.getId()))
                .isInstanceOf(NotFoundTeamException.class);
    }

    @Test
    @DisplayName("모임에 가입된 닉네임을 수정한다. 다른 모임에 해당 닉네임이 존재해도 수정에 문제되지 않는다.")
    void updateNickname() {
        final String expected = "닉네임1";
        final TeamParticipation teamParticipation1 = new TeamParticipation(team1, member, "닉네임1");
        final TeamParticipation teamParticipation2 = new TeamParticipation(team2, member2, "닉네임2");
        teamParticipationRepository.save(teamParticipation1);
        teamParticipationRepository.save(teamParticipation2);

        teamService.updateMyInfo(team2.getId(), member2.getId(), expected);

        final String actual = teamParticipationRepository.findNicknameByMemberIdAndTeamId(member2.getId(),
                team2.getId());
        assertThat(actual).isEqualTo(expected);
    }

    @Test
    @DisplayName("이미 존재하는 닉네임으로 닉네임을 수정할 경우 예외를 발생시킨다.")
    void updateDuplicateNickname() {
        final String expected = "닉네임1";
        final TeamParticipation teamParticipation1 = new TeamParticipation(team1, member, "닉네임1");
        final TeamParticipation teamParticipation2 = new TeamParticipation(team1, member2, "닉네임2");
        teamParticipationRepository.save(teamParticipation1);
        teamParticipationRepository.save(teamParticipation2);

        assertThatThrownBy(() -> teamService.updateMyInfo(team1.getId(), member2.getId(), expected))
                .isInstanceOf(DuplicateNicknameException.class);
    }

    @Test
    @DisplayName("내가 가입되지 않은 모임에서 닉네임 변경을 하려 할 경우 예외를 발생시킨다.")
    void updateNicknameNotMyTeam() {
        final TeamParticipation teamParticipation = new TeamParticipation(team1, member, "해커");
        teamParticipationRepository.save(teamParticipation);

        assertThatThrownBy(() -> teamService.updateMyInfo(team2.getId(), member.getId(), "선량한시민"))
                .isInstanceOf(UncertificationTeamMemberException.class);
    }

    @Test
    @DisplayName("존재하지 않는 모임에서 닉네임 변경을 하려 할 경우 예외를 발생시킨다.")
    void updateNicknameNotExistTeam() {
        assertThatThrownBy(() -> teamService.updateMyInfo(team1.getId() + 10000L, member.getId(), "해커"))
                .isInstanceOf(NotFoundTeamException.class);
    }

    @Test
    @DisplayName("존재하지 않는 팀의 초대코드를 생성하려 할 경우 예외를 발생시킨다.")
    void createInviteCodeWithNotExistTeam() {
        assertThatThrownBy(() -> teamService.createInviteCode(9999L))
                .isInstanceOf(NotFoundTeamException.class);
    }

    @Test
    @DisplayName("초대 코드로 팀 정보를 조회한다.")
    void getTeamByInviteToken() {
        final String inviteCode = teamService.createInviteCode(team1.getId());

        final TeamResponseDto teamResponseDto = teamService.findTeamByInviteCode(inviteCode, member.getId());

        assertThat(teamResponseDto).extracting("id", "name", "description", "emoji", "color")
                .containsExactly(
                        team1.getId(),
                        team1.getName(),
                        team1.getDescription(),
                        team1.getEmoji(),
                        team1.getColor()
                );
    }

    @Test
    @DisplayName("초대 코드로 멤버를 팀에 가입시킨다.")
    void inviteJoin() {
        final String inviteCode = teamService.createInviteCode(team1.getId());

        final Long teamParticipationId = teamService.inviteJoin(inviteCode, member.getId(), "가입할래요");

        final TeamParticipation teamParticipation = teamParticipationRepository.findById(teamParticipationId)
                .orElseThrow();

        assertAll(
                () -> assertThat(teamParticipation.getMember().getId()).isEqualTo(member.getId()),
                () -> assertThat(teamParticipation.getTeam().getId()).isEqualTo(team1.getId())
        );
    }
}
