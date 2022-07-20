package com.woowacourse.naepyeon.acceptance;

import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.가입한_모임_조회;
import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.모든_모임_조회;
import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.모임_가입;
import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.모임_단건_조회;
import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.모임_삭제;
import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.모임_생성;
import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.모임_이름_수정;
import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.모임_추가;
import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.모임에_가입한_회원_조회;
import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.회원가입_후_로그인;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import com.woowacourse.naepyeon.controller.dto.CreateResponse;
import com.woowacourse.naepyeon.controller.dto.JoinTeamMemberRequest;
import com.woowacourse.naepyeon.controller.dto.MemberRegisterRequest;
import com.woowacourse.naepyeon.controller.dto.TeamRequest;
import com.woowacourse.naepyeon.service.dto.JoinedMemberResponseDto;
import com.woowacourse.naepyeon.service.dto.JoinedMembersResponseDto;
import com.woowacourse.naepyeon.service.dto.TeamResponseDto;
import com.woowacourse.naepyeon.service.dto.TeamsResponseDto;
import com.woowacourse.naepyeon.service.dto.TokenResponseDto;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import java.util.List;
import java.util.stream.Collectors;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;

class TeamAcceptanceTest extends AcceptanceTest {

    @Test
    @DisplayName("모임 추가")
    void addTeam() {
        //모임 생성
        final MemberRegisterRequest member =
                new MemberRegisterRequest("seungpang", "email@email.com", "12345678aA!");
        final TokenResponseDto tokenResponseDto = 회원가입_후_로그인(member);
        final TeamRequest teamRequest = new TeamRequest(
                "woowacourse",
                "테스트 모임입니다.",
                "testEmoji",
                "#123456",
                "나는야모임장"
        );
        final ExtractableResponse<Response> response = 모임_추가(tokenResponseDto, teamRequest);

        //모임이 추가됨
        모임이_추가됨(response);
    }

    @Test
    @DisplayName("모임을 생성시 생성한 유저가 자동으로 모임에 가입된다.")
    void createTeamAndParticipateTeam() {
        //모임 생성
        final MemberRegisterRequest member =
                new MemberRegisterRequest("seungpang", "email@email.com", "12345678aA!");
        final TokenResponseDto tokenResponseDto = 회원가입_후_로그인(member);
        final Long teamId = 모임_생성(tokenResponseDto);

        final List<Long> joinedTeamIds = 가입한_모임_조회(tokenResponseDto).body()
                .as(TeamsResponseDto.class)
                .getTeams()
                .stream()
                .map(TeamResponseDto::getId)
                .collect(Collectors.toList());

        assertThat(joinedTeamIds).contains(teamId);
    }

    @Test
    @DisplayName("모임을 생성하고 조회한다.")
    void addTeamAndGet() {
        //모임 생성
        final MemberRegisterRequest member =
                new MemberRegisterRequest("seungpang", "email@email.com", "12345678aA!");
        final TokenResponseDto tokenResponseDto = 회원가입_후_로그인(member);
        final String teamName = "woowacourse";
        final String teamDescription = "테스트 모임입니다.";
        final String teamEmoji = "testEmoji";
        final String teamColor = "#123456";
        final TeamRequest teamRequest = new TeamRequest(
                teamName,
                teamDescription,
                teamEmoji,
                teamColor,
                "나는야모임장"
        );
        final Long teamId = 모임_추가(tokenResponseDto, teamRequest).as(CreateResponse.class)
                .getId();

        final ExtractableResponse<Response> response = 모임_단건_조회(tokenResponseDto, teamId);
        final TeamResponseDto teamResponse = response.as(TeamResponseDto.class);

        assertThat(teamResponse).extracting("id", "name", "description", "emoji", "color")
                .containsExactly(teamId, teamName, teamDescription, teamEmoji, teamColor);
    }

    @Test
    @DisplayName("존재하지 않는 id로 모임 조회를 하려 하는 경우 예외를 발생시킨다.")
    void findByIdWithNotExistId() {
        final MemberRegisterRequest member =
                new MemberRegisterRequest("seungpang", "email@email.com", "12345678aA!");
        final TokenResponseDto tokenResponseDto = 회원가입_후_로그인(member);
        final ExtractableResponse<Response> response = 모임_단건_조회(tokenResponseDto, 10000L);

        assertThat(response.statusCode()).isEqualTo(HttpStatus.NOT_FOUND.value());
    }

    @Test
    @DisplayName("모임을 중복해서 생성하는 경우 예외를 발생시킨다.")
    void addTeamDuplicate() {
        //모임 생성
        final MemberRegisterRequest member =
                new MemberRegisterRequest("seungpang", "email@email.com", "12345678aA!");
        final TokenResponseDto tokenResponseDto = 회원가입_후_로그인(member);
        final TeamRequest teamRequest = new TeamRequest(
                "woowacourse",
                "테스트 모임입니다.",
                "testEmoji",
                "#123456",
                "나는야모임장"
        );
        모임_추가(tokenResponseDto, teamRequest);

        final ExtractableResponse<Response> response = 모임_추가(tokenResponseDto, teamRequest);

        assertThat(response.statusCode()).isEqualTo(HttpStatus.BAD_REQUEST.value());
    }

    @Test
    @DisplayName("모든 팀을 조회한다.")
    void getAllTeams() {
        //모임 생성
        final MemberRegisterRequest member =
                new MemberRegisterRequest("seungpang", "email@email.com", "12345678aA!");
        final TokenResponseDto tokenResponseDto = 회원가입_후_로그인(member);
        final TeamRequest teamRequest1 = new TeamRequest(
                "woowacourse1",
                "테스트 모임입니다.",
                "testEmoji",
                "#123456",
                "나는야모임장"
        );
        final Long team1Id = 모임_추가(tokenResponseDto, teamRequest1).as(CreateResponse.class)
                .getId();
        //모임 생성
        final TeamRequest teamRequest2 = new TeamRequest(
                "woowacourse2",
                "테스트 모임입니다.",
                "testEmoji",
                "#123456",
                "나는야모임장"
        );
        final Long team2Id = 모임_추가(tokenResponseDto, teamRequest2).as(CreateResponse.class)
                .getId();

        final List<Long> teamIds = 모든_모임_조회(tokenResponseDto).body()
                .as(TeamsResponseDto.class)
                .getTeams()
                .stream()
                .map(TeamResponseDto::getId)
                .collect(Collectors.toList());

        assertThat(teamIds).contains(team1Id, team2Id);
    }

    @Test
    @DisplayName("모든 모임 조회시 내가 가입한 모임의 joined컬럼이 true로, 가입하지 않은 모임은 false로 나온다.")
    void checkJoinedColumn() {
        //모임 생성
        final MemberRegisterRequest member1 =
                new MemberRegisterRequest("seungpang", "email@email.com", "12345678aA!");
        final TokenResponseDto tokenResponseDto1 = 회원가입_후_로그인(member1);
        final MemberRegisterRequest member2 =
                new MemberRegisterRequest("seungpang2", "email2@email.com", "12345678aA!");
        final TokenResponseDto tokenResponseDto2 = 회원가입_후_로그인(member2);
        final String teamName1 = "woowacourse1";
        final TeamRequest teamRequest1 = new TeamRequest(
                teamName1,
                "테스트 모임입니다.",
                "testEmoji",
                "#123456",
                "나는야모임장"
        );
        final Long team1Id = 모임_추가(tokenResponseDto1, teamRequest1).as(CreateResponse.class)
                .getId();
        //모임 생성
        final String teamName2 = "woowacourse2";
        final TeamRequest teamRequest2 = new TeamRequest(
                teamName2,
                "테스트 모임입니다.",
                "testEmoji",
                "#123456",
                "나는야모임장"
        );
        final Long team2Id = 모임_추가(tokenResponseDto1, teamRequest2).as(CreateResponse.class)
                .getId();

        모임_가입(tokenResponseDto2, team1Id, new JoinTeamMemberRequest("가입자"));

        final List<TeamResponseDto> teams = 모든_모임_조회(tokenResponseDto2)
                .as(TeamsResponseDto.class)
                .getTeams();

        final TeamResponseDto joinedTeam = teams.stream()
                .filter(TeamResponseDto::isJoined)
                .findAny().get();

        final TeamResponseDto notJoinedTeam = teams.stream()
                .filter(teamResponseDto -> !teamResponseDto.isJoined())
                .findAny().get();

        assertAll(
                () -> assertThat(joinedTeam.getName()).isEqualTo(teamName1),
                () -> assertThat(notJoinedTeam.getName()).isEqualTo(teamName2)
        );
    }

    @Test
    @DisplayName("팀에 가입한 회원 목록을 조회한다.")
    void findJoinedMembers() {
        //모임 생성
        final MemberRegisterRequest member1 =
                new MemberRegisterRequest("seungpang", "email@email.com", "12345678aA!");
        final TokenResponseDto tokenResponseDto1 = 회원가입_후_로그인(member1);
        final MemberRegisterRequest member2 =
                new MemberRegisterRequest("seungpang2", "email2@email.com", "12345678aA!");
        final TokenResponseDto tokenResponseDto2 = 회원가입_후_로그인(member2);
        final String teamName1 = "woowacourse1";
        final String masterNickname = "나는야모임장";
        final TeamRequest teamRequest1 = new TeamRequest(
                teamName1,
                "테스트 모임입니다.",
                "testEmoji",
                "#123456",
                masterNickname
        );
        final Long team1Id = 모임_추가(tokenResponseDto1, teamRequest1).as(CreateResponse.class)
                .getId();

        final String joinNickname = "가입자";
        모임_가입(tokenResponseDto2, team1Id, new JoinTeamMemberRequest(joinNickname));

        final JoinedMembersResponseDto joinedMembers = 모임에_가입한_회원_조회(tokenResponseDto1, team1Id)
                .as(JoinedMembersResponseDto.class);

        final List<String> joinedMemberNickNames = joinedMembers.getMembers()
                .stream()
                .map(JoinedMemberResponseDto::getNickname)
                .collect(Collectors.toList());

        assertThat(joinedMemberNickNames).contains(masterNickname, joinNickname);
    }

    @Test
    @DisplayName("모임 이름 수정")
    void updateTeam() {
        // 모임 생성
        final MemberRegisterRequest member =
                new MemberRegisterRequest("seungpang", "email@email.com", "12345678aA!");
        final TokenResponseDto tokenResponseDto = 회원가입_후_로그인(member);
        final Long teamId = 모임_생성(tokenResponseDto);

        // 모임 이름 수정
        final TeamRequest changeTeamRequest = new TeamRequest(
                "woowacourse-5th",
                "테스트 모임입니다.",
                "testEmoji",
                "#123456",
                "나는야모임장"
        );
        final ExtractableResponse<Response> response = 모임_이름_수정(tokenResponseDto, teamId, changeTeamRequest);
        모임이름이_수정됨(response);
    }

    //todo: 삭제는 아직 미구현 + team 삭제시 team_member에 걸려있는 fk때문에 cascade 전략을 정해야 구현 가능
//    @Test
//    @DisplayName("모임 삭제")
//    void deleteTeam() {
//        //모임 생성
//        final MemberRegisterRequest member =
//                new MemberRegisterRequest("seungpang", "email@email.com", "12345678aA!");
//        final TokenResponseDto tokenResponseDto = 회원가입_후_로그인(member);
//        final Long teamId = 모임_생성(tokenResponseDto);
//
//        //모임 삭제
//        final ExtractableResponse<Response> response = 모임_삭제(tokenResponseDto, teamId);
//
//        //모임이 삭제됨
//        모임_삭제됨(response);
//    }

    @Test
    @DisplayName("모임에 회원을 가입시킨다.")
    void joinMember() {
        //모임 생성
        final MemberRegisterRequest owner =
                new MemberRegisterRequest("seungpang", "email@email.com", "12345678aA!");
        final TokenResponseDto ownerTokenResponseDto = 회원가입_후_로그인(owner);
        final Long teamId = 모임_생성(ownerTokenResponseDto);
        final MemberRegisterRequest member =
                new MemberRegisterRequest("alex", "alex@alex.com", "12345678aA!");
        final TokenResponseDto memberTokenResponseDto = 회원가입_후_로그인(member);

        final ExtractableResponse<Response> response =
                모임_가입(memberTokenResponseDto, teamId, new JoinTeamMemberRequest("모임닉네임"));

        assertThat(response.statusCode()).isEqualTo(HttpStatus.NO_CONTENT.value());
    }

    @Test
    @DisplayName("모임에 이미 가입된 회원을 가입시키려 하는 경우 예외를 발생시킨다.")
    void joinMemberDuplicate() {
        //모임 생성
        final MemberRegisterRequest member =
                new MemberRegisterRequest("seungpang", "email@email.com", "12345678aA!");
        final TokenResponseDto tokenResponseDto = 회원가입_후_로그인(member);
        final Long teamId = 모임_생성(tokenResponseDto);

        final ExtractableResponse<Response> response =
                모임_가입(tokenResponseDto, teamId, new JoinTeamMemberRequest("모임닉네임"));

        assertThat(response.statusCode()).isEqualTo(HttpStatus.BAD_REQUEST.value());
    }

    @Test
    @DisplayName("회원이 가입한 모임을 조회한다.")
    void getJoinedTeams() {
        //모임 생성
        final MemberRegisterRequest member =
                new MemberRegisterRequest("seungpang", "email@email.com", "12345678aA!");
        final TokenResponseDto tokenResponseDto = 회원가입_후_로그인(member);
        final TeamRequest teamRequest1 = new TeamRequest(
                "woowacourse1",
                "테스트 모임입니다.",
                "testEmoji",
                "#123456",
                "나는야모임장"
        );
        final Long team1Id = 모임_추가(tokenResponseDto, teamRequest1).as(CreateResponse.class)
                .getId();
        final TeamRequest teamRequest2 = new TeamRequest(
                "woowacourse2",
                "테스트 모임입니다.",
                "testEmoji",
                "#123456",
                "나는야모임장"
        );
        final Long team2Id = 모임_추가(tokenResponseDto, teamRequest2).as(CreateResponse.class)
                .getId();
        final TeamRequest teamRequest3 = new TeamRequest(
                "woowacourse3",
                "테스트 모임입니다.",
                "testEmoji",
                "#123456",
                "나는야모임장"
        );
        final Long team3Id = 모임_추가(tokenResponseDto, teamRequest3).as(CreateResponse.class)
                .getId();
        모임_가입(tokenResponseDto, team1Id, new JoinTeamMemberRequest("닉네임1"));
        모임_가입(tokenResponseDto, team3Id, new JoinTeamMemberRequest("닉네임3"));

        final List<Long> joinedTeamIds = 가입한_모임_조회(tokenResponseDto).body()
                .as(TeamsResponseDto.class)
                .getTeams()
                .stream()
                .map(TeamResponseDto::getId)
                .collect(Collectors.toList());

        assertThat(joinedTeamIds).contains(team1Id, team3Id);
    }

    @Test
    @DisplayName("모임 이름을 수정할 때, 20자를 초과하는 이름으로 수정하는 경우 예외를 발생시킨다.")
    void changeTeamNameWithExceedLength() {
        //모임 생성
        final MemberRegisterRequest member =
                new MemberRegisterRequest("seungpang", "email@email.com", "12345678aA!");
        final TokenResponseDto tokenResponseDto = 회원가입_후_로그인(member);
        final Long teamId = 모임_생성(tokenResponseDto);

        // 모임 이름 수정
        final TeamRequest changeTeamRequest = new TeamRequest(
                "a".repeat(21),
                "테스트 모임입니다.",
                "testEmoji",
                "#123456",
                "나는야모임장"
        );
        final ExtractableResponse<Response> response = 모임_이름_수정(tokenResponseDto, teamId, changeTeamRequest);

        assertThat(response.statusCode()).isEqualTo(HttpStatus.BAD_REQUEST.value());
    }

    @Test
    @DisplayName("존재하지 않는 모임을 삭제하려는 경우 예외를 발생시킨다.")
    void deleteNotExistTeam() {
        //모임 생성
        final MemberRegisterRequest member =
                new MemberRegisterRequest("seungpang", "email@email.com", "12345678aA!");
        final TokenResponseDto tokenResponseDto = 회원가입_후_로그인(member);
        final Long teamId = 모임_생성(tokenResponseDto);

        //모임 삭제
        final ExtractableResponse<Response> response = 모임_삭제(tokenResponseDto, 10000L);

        assertThat(response.statusCode()).isEqualTo(HttpStatus.NOT_FOUND.value());
    }

    private void 모임_삭제됨(ExtractableResponse<Response> response) {
        assertThat(response.statusCode()).isEqualTo(HttpStatus.NO_CONTENT.value());
    }

    private void 모임이름이_수정됨(ExtractableResponse<Response> response) {
        assertThat(response.statusCode()).isEqualTo(HttpStatus.NO_CONTENT.value());
    }

    private void 모임이_추가됨(ExtractableResponse<Response> response) {
        assertThat(response.statusCode()).isEqualTo(HttpStatus.CREATED.value());
        assertThat(response.header("Location")).isNotBlank();
    }
}
