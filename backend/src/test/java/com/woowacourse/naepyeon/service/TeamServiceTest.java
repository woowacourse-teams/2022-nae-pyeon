package com.woowacourse.naepyeon.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import com.woowacourse.naepyeon.controller.dto.TeamRequest;
import com.woowacourse.naepyeon.domain.Member;
import com.woowacourse.naepyeon.domain.Team;
import com.woowacourse.naepyeon.domain.TeamParticipation;
import com.woowacourse.naepyeon.repository.MemberRepository;
import com.woowacourse.naepyeon.repository.TeamMemberRepository;
import com.woowacourse.naepyeon.repository.TeamRepository;
import com.woowacourse.naepyeon.service.dto.TeamDetailResponseDto;
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

    private final Team team3 = new Team(
            "wooteco3",
            "테스트 모임입니다.",
            "testEmoji",
            "#123456"
    );

    @Autowired
    private TeamService teamService;
    @Autowired
    private TeamRepository teamRepository;
    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private TeamMemberRepository teamMemberRepository;

    @BeforeEach
    void setUp() {
        memberRepository.save(member);
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
                "#123456"
        );
        final Long teamId = teamService.save(teamRequest, member.getId());

        // when
        final TeamDetailResponseDto findTeam = teamService.findById(teamId);

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
                "#123456"
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
                "#123456"
        );
        final Long teamId = teamService.save(teamRequest, member.getId());

        // when
        final String expected = "woowacourse-5th";
        teamService.updateName(teamId, expected);

        // then
        assertThat(teamService.findById(teamId))
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
        final TeamParticipation findTeamParticipation = teamMemberRepository.findById(joinedId)
                .orElseThrow();

        assertAll(
                () -> assertThat(findTeamParticipation.getMember().getId()).isEqualTo(member.getId()),
                () -> assertThat(findTeamParticipation.getTeam().getId()).isEqualTo(team1.getId()),
                () -> assertThat(findTeamParticipation.getNickname()).isEqualTo(nickname)
        );
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
        teamMemberRepository.save(teamParticipation1);
        teamMemberRepository.save(teamParticipation2);

        final TeamsResponseDto teams = teamService.findByJoinedMemberId(member.getId());
        final List<String> teamNames = teams.getTeams()
                .stream()
                .map(TeamResponseDto::getName)
                .collect(Collectors.toList());

        assertThat(teamNames).contains(team1.getName(), team3.getName());
    }
}