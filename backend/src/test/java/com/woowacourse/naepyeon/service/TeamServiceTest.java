package com.woowacourse.naepyeon.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;

import com.woowacourse.naepyeon.controller.dto.TeamRequest;
import com.woowacourse.naepyeon.domain.Member;
import com.woowacourse.naepyeon.domain.Team;
import com.woowacourse.naepyeon.domain.TeamParticipation;
import com.woowacourse.naepyeon.exception.NotFoundMemberException;
import com.woowacourse.naepyeon.exception.NotFoundTeamException;
import com.woowacourse.naepyeon.repository.MemberRepository;
import com.woowacourse.naepyeon.repository.TeamParticipationRepository;
import com.woowacourse.naepyeon.repository.TeamRepository;
import com.woowacourse.naepyeon.service.dto.JoinedMemberResponseDto;
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

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Transactional
class TeamServiceTest {

    private final Member member = new Member("내편이", "naePyeon@test.com", "testtest123");
    private final Member member2 = new Member("알렉스형", "alex@test.com", "testtest123");
    private final Team team1 = new Team("wooteco1", "테스트 모임입니다.", "testEmoji", "#123456");
    private final Team team2 = new Team("wooteco2", "테스트 모임입니다.", "testEmoji", "#123456");
    private final Team team3 = new Team("wooteco3", "테스트 모임입니다.", "testEmoji", "#123456");

    @Autowired
    private TeamService teamService;
    @Autowired
    private TeamRepository teamRepository;
    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private TeamParticipationRepository teamParticipationRepository;

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
        final TeamRequest teamRequest = new TeamRequest(
                "woowacourse",
                "테스트 모임입니다.",
                "testEmoji",
                "#123456",
                "나는야모임장"
        );
        final Long teamId = teamService.save(teamRequest, member.getId());

        // when
        final TeamResponseDto findTeam = teamService.findById(teamId, member.getId());

        // then
        assertThat(findTeam)
                .extracting("id", "name", "description", "emoji", "color")
                .containsExactly(
                        teamId,
                        teamRequest.getName(),
                        teamRequest.getDescription(),
                        teamRequest.getEmoji(),
                        teamRequest.getColor()
                );
    }

    @Test
    @DisplayName("모임을 생성시 생성한 유저가 자동으로 해당 모임에 가입된다.")
    void createTeamAndParticipateOwner() {
        // given
        final TeamRequest teamRequest = new TeamRequest(
                "woowacourse",
                "테스트 모임입니다.",
                "testEmoji",
                "#123456",
                "나는야모임장"
        );
        final Long teamId = teamService.save(teamRequest, member.getId());

        final List<Long> joinedTeamIds = teamService.findByJoinedMemberId(member.getId())
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
        final TeamRequest teamRequest = new TeamRequest(
                "woowacourse-4th",
                "테스트 모임입니다.",
                "testEmoji",
                "#123456",
                "나는야모임장"
        );
        final Long teamId = teamService.save(teamRequest, member.getId());

        // when
        final String expected = "woowacourse-5th";
        teamService.updateName(teamId, expected);

        // then
        assertThat(teamService.findById(teamId, member.getId()))
                .extracting("id", "name", "description", "emoji", "color")
                .containsExactly(
                        teamId,
                        expected,
                        teamRequest.getDescription(),
                        teamRequest.getEmoji(),
                        teamRequest.getColor()
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
    @DisplayName("존재하지 않는 회원을 가입시킬 경우 예외를 발생시킨다.")
    void joinNotFoundMember() {
        final String nickname = "닉네임";
        assertThatThrownBy(() -> teamService.joinMember(team3.getId(), member.getId() + 1000L, nickname))
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
    @DisplayName("모든 모임을 조회한다.")
    void findAll() {
        final TeamsResponseDto teams = teamService.findAll(member.getId());
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

        final TeamsResponseDto teams = teamService.findByJoinedMemberId(member.getId());
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
}