package com.woowacourse.naepyeon.acceptance;

import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.가입한_모임_조회;
import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.모임_가입;
import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.모임_가입_정보_조회;
import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.모임_내_닉네임_변경;
import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.모임_단건_조회;
import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.모임_삭제;
import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.모임_생성;
import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.모임_이름_수정;
import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.모임_추가;
import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.모임에_가입한_회원_목록_조회;
import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.초대_코드_생성;
import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.초대_코드로_팀_상세_조회;
import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.키워드로_모든_모임_조회;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import com.woowacourse.naepyeon.controller.dto.CreateResponse;
import com.woowacourse.naepyeon.controller.dto.ErrorResponse;
import com.woowacourse.naepyeon.controller.dto.InviteTokenResponse;
import com.woowacourse.naepyeon.controller.dto.JoinTeamMemberRequest;
import com.woowacourse.naepyeon.controller.dto.TeamRequest;
import com.woowacourse.naepyeon.controller.dto.UpdateTeamParticipantRequest;
import com.woowacourse.naepyeon.domain.Team;
import com.woowacourse.naepyeon.domain.invitecode.InviteCode;
import com.woowacourse.naepyeon.service.dto.JoinedMemberResponseDto;
import com.woowacourse.naepyeon.service.dto.JoinedMembersResponseDto;
import com.woowacourse.naepyeon.service.dto.TeamMemberResponseDto;
import com.woowacourse.naepyeon.service.dto.TeamResponseDto;
import com.woowacourse.naepyeon.service.dto.TeamsResponseDto;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;

class TeamAcceptanceTest extends AcceptanceTest {

    @Test
    @DisplayName("모임 추가")
    void addTeam() {
        final TeamRequest teamRequest = new TeamRequest(
                "woowacourse",
                "테스트 모임입니다.",
                "testEmoji",
                "#123456",
                "나는야모임장",
                false
        );
        final ExtractableResponse<Response> response = 모임_추가(alex, teamRequest);

        //모임이 추가됨
        모임이_추가됨(response);
    }

    @Test
    @DisplayName("모임을 생성시 생성한 유저가 자동으로 모임에 가입된다.")
    void createTeamAndParticipateTeam() {
        final Long teamId = 모임_생성(alex);

        final List<Long> joinedTeamIds = 가입한_모임_조회(alex, 0, 5).body()
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
        final String teamName = "woowacourse";
        final String teamDescription = "테스트 모임입니다.";
        final String teamEmoji = "testEmoji";
        final String teamColor = "#123456";
        final boolean teameScret = false;
        final TeamRequest teamRequest =
                new TeamRequest(teamName, teamDescription, teamEmoji, teamColor, "나는야모임장", teameScret);
        final Long teamId = 모임_추가(alex, teamRequest)
                .as(CreateResponse.class)
                .getId();

        final ExtractableResponse<Response> response = 모임_단건_조회(alex, teamId);
        final TeamResponseDto teamResponse = response.as(TeamResponseDto.class);

        final TeamResponseDto expected = new TeamResponseDto(teamId, teamName, teamDescription, teamEmoji, teamColor,
                true, teameScret);

        assertThat(teamResponse)
                .usingRecursiveComparison()
                .isEqualTo(expected);
    }

    @Test
    @DisplayName("존재하지 않는 id로 모임 조회를 하려 하는 경우 예외를 발생시킨다.")
    void findByIdWithNotExistId() {
        final ExtractableResponse<Response> response = 모임_단건_조회(alex, 10000L);

        assertThat(response.statusCode()).isEqualTo(HttpStatus.NOT_FOUND.value());
    }

    @Test
    @DisplayName("모임을 중복해서 생성하는 경우 예외를 발생시킨다.")
    void addTeamDuplicate() {
        final TeamRequest teamRequest = new TeamRequest(
                "woowacourse",
                "테스트 모임입니다.",
                "testEmoji",
                "#123456",
                "나는야모임장",
                false
        );
        모임_추가(alex, teamRequest);

        final ExtractableResponse<Response> response = 모임_추가(alex, teamRequest);

        assertThat(response.statusCode()).isEqualTo(HttpStatus.BAD_REQUEST.value());
    }

    @Test
    @DisplayName("모든 팀을 조회한다.")
    void getAllTeams() {
        final TeamRequest teamRequest1 = new TeamRequest(
                "woowacourse1",
                "테스트 모임입니다.",
                "testEmoji",
                "#123456",
                "나는야모임장",
                false
        );
        final Long team1Id = 모임_추가(alex, teamRequest1).as(CreateResponse.class)
                .getId();
        //모임 생성
        final TeamRequest teamRequest2 =
                new TeamRequest("내편아니야", ".", "a", "#123456", "테스트", false);
        final Long team2Id = 모임_추가(alex, teamRequest2).as(CreateResponse.class)
                .getId();

        //결과 조회
        final ExtractableResponse<Response> response =
                키워드로_모든_모임_조회(alex, "", 0, 5);

        final List<TeamResponseDto> actual = response.as(TeamsResponseDto.class)
                .getTeams();
        final List<TeamResponseDto> expected = List.of(
                createTeamResponse(team1Id, teamRequest1, true),
                createTeamResponse(team2Id, teamRequest2, true)
        );

        assertThat(actual)
                .usingRecursiveComparison()
                .isEqualTo(expected);
    }

    @Test
    @DisplayName("모든 모임 조회시 내가 가입한 모임의 joined컬럼이 true로, 가입하지 않은 모임은 false로 나온다.")
    void checkJoinedColumn() {
        final String teamName1 = "woowacourse1";
        final TeamRequest teamRequest1 = new TeamRequest(
                teamName1,
                "테스트 모임입니다.",
                "testEmoji",
                "#123456",
                "나는야모임장",
                false
        );
        final Long team1Id = 모임_추가(alex, teamRequest1).as(CreateResponse.class)
                .getId();
        //모임 생성
        final String teamName2 = "woowacourse2";
        final TeamRequest teamRequest2 = new TeamRequest(
                teamName2,
                "테스트 모임입니다.",
                "testEmoji",
                "#123456",
                "나는야모임장",
                false
        );
        모임_추가(alex, teamRequest2).as(CreateResponse.class);

        모임_가입(zero, team1Id, new JoinTeamMemberRequest("가입자"));

        final List<TeamResponseDto> teams = 키워드로_모든_모임_조회(zero, "woowa", 0, 5)
                .as(TeamsResponseDto.class)
                .getTeams();

        final TeamResponseDto joinedTeam = teams.stream()
                .filter(TeamResponseDto::isJoined)
                .findAny()
                .get();

        final TeamResponseDto notJoinedTeam = teams.stream()
                .filter(teamResponseDto -> !teamResponseDto.isJoined())
                .findAny()
                .get();

        assertAll(
                () -> assertThat(joinedTeam.getName()).isEqualTo(teamName1),
                () -> assertThat(notJoinedTeam.getName()).isEqualTo(teamName2)
        );
    }

    @Test
    @DisplayName("팀에 가입한 회원 목록을 조회한다.")
    void findJoinedMembers() {
        final String teamName1 = "woowacourse1";
        final String masterNickname = "나는야모임장";
        final TeamRequest teamRequest1 = new TeamRequest(
                teamName1,
                "테스트 모임입니다.",
                "testEmoji",
                "#123456",
                masterNickname,
                false
        );
        final Long team1Id = 모임_추가(alex, teamRequest1).as(CreateResponse.class)
                .getId();

        final String joinNickname = "가입자";
        모임_가입(kei, team1Id, new JoinTeamMemberRequest(joinNickname));

        final JoinedMembersResponseDto joinedMembers = 모임에_가입한_회원_목록_조회(alex, team1Id)
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
        final Long teamId = 모임_생성(alex);

        // 모임 이름 수정
        final TeamRequest changeTeamRequest = new TeamRequest(
                "woowacourse-5th",
                "테스트 모임입니다.",
                "testEmoji",
                "#123456",
                "나는야모임장",
                true
        );
        final ExtractableResponse<Response> response = 모임_이름_수정(alex, teamId, changeTeamRequest);
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
        final Long teamId = 모임_생성(alex);

        final ExtractableResponse<Response> response =
                모임_가입(kei, teamId, new JoinTeamMemberRequest("모임닉네임"));

        assertThat(response.statusCode()).isEqualTo(HttpStatus.NO_CONTENT.value());
    }

    @Test
    @DisplayName("모임에 이미 가입된 회원을 가입시키려 하는 경우 예외를 발생시킨다.")
    void joinMemberDuplicate() {
        final Long teamId = 모임_생성(alex);

        final ExtractableResponse<Response> response =
                모임_가입(alex, teamId, new JoinTeamMemberRequest("모임닉네임"));

        assertThat(response.statusCode()).isEqualTo(HttpStatus.BAD_REQUEST.value());
    }

    @Test
    @DisplayName("이미 존재하는 닉네임으로 모임에 가입신청할 경우 예외를 발생시킨다.")
    void joinMemberWithDuplicateNickname() {
        final Long teamId = 모임_생성(alex);

        final ExtractableResponse<Response> response =
                모임_가입(kei, teamId, new JoinTeamMemberRequest("나는야모임장"));

        assertThat(response.statusCode()).isEqualTo(HttpStatus.BAD_REQUEST.value());
    }

    @Test
    @DisplayName("회원이 가입한 모임을 조회한다.")
    void getJoinedTeams() {
        final TeamRequest teamRequest1 = new TeamRequest(
                "woowacourse1",
                "테스트 모임입니다.",
                "testEmoji",
                "#123456",
                "나는야모임장",
                false
        );
        final Long team1Id = 모임_추가(alex, teamRequest1).as(CreateResponse.class)
                .getId();
        final TeamRequest teamRequest2 = new TeamRequest(
                "woowacourse2",
                "테스트 모임입니다.",
                "testEmoji",
                "#123456",
                "나는야모임장",
                false
        );
        모임_추가(alex, teamRequest2).as(CreateResponse.class);
        final TeamRequest teamRequest3 = new TeamRequest(
                "woowacourse3",
                "테스트 모임입니다.",
                "testEmoji",
                "#123456",
                "나는야모임장",
                false
        );
        final Long team3Id = 모임_추가(alex, teamRequest3).as(CreateResponse.class)
                .getId();
        모임_가입(zero, team1Id, new JoinTeamMemberRequest("닉네임1"));
        모임_가입(zero, team3Id, new JoinTeamMemberRequest("닉네임3"));

        final List<Long> joinedTeamIds = 가입한_모임_조회(zero, 0, 5).body()
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
        final Long teamId = 모임_생성(alex);

        // 모임 이름 수정
        final TeamRequest changeTeamRequest = new TeamRequest(
                "a".repeat(21),
                "테스트 모임입니다.",
                "testEmoji",
                "#123456",
                "나는야모임장",
                false
        );
        final ExtractableResponse<Response> response = 모임_이름_수정(alex, teamId, changeTeamRequest);

        assertThat(response.statusCode()).isEqualTo(HttpStatus.BAD_REQUEST.value());
    }

    @Test
    @DisplayName("존재하지 않는 모임을 삭제하려는 경우 예외를 발생시킨다.")
    void deleteNotExistTeam() {
        final ExtractableResponse<Response> response = 모임_삭제(alex, 10000L);

        assertThat(response.statusCode()).isEqualTo(HttpStatus.NOT_FOUND.value());
    }

    @Test
    @DisplayName("모임에서의 내 정보를 조회한다.")
    void findMyInfoInTeam() {
        final String expected = "나는야모임장";

        final Long teamId = 모임_생성(alex);

        final String actual = 모임_가입_정보_조회(alex, teamId)
                .as(TeamMemberResponseDto.class)
                .getNickname();
        assertThat(actual).isEqualTo(expected);
    }

    @Test
    @DisplayName("모임의 닉네임을 수정한다.")
    void updateNickname() {
        final String expected = "나모임장안해";
        final Long teamId = 모임_생성(alex);

        final UpdateTeamParticipantRequest updateTeamParticipantRequest = new UpdateTeamParticipantRequest(expected);
        모임_내_닉네임_변경(alex, teamId, updateTeamParticipantRequest);

        final String actual = 모임_가입_정보_조회(alex, teamId)
                .as(TeamMemberResponseDto.class)
                .getNickname();
        assertThat(actual).isEqualTo(expected);
    }

    @Test
    @DisplayName("이미 팀에 존재하는 닉네임으로 수정할 경우 예외를 발생시킨다.")
    void updateDuplicatedNickname() {
        final Long teamId = 모임_생성(alex);
        final JoinTeamMemberRequest request = new JoinTeamMemberRequest("애플");
        모임_가입(seungpang, teamId, request);

        final UpdateTeamParticipantRequest updateTeamParticipantRequest =
                new UpdateTeamParticipantRequest("나는야모임장");
        final ExtractableResponse<Response> response = 모임_내_닉네임_변경(seungpang, teamId, updateTeamParticipantRequest);
        assertThat(response.statusCode()).isEqualTo(HttpStatus.BAD_REQUEST.value());
    }

    @Test
    @DisplayName("모임의 초대 코드를 생성하고 모임 정보를 얻는다.")
    void findTeamByInviteToken() {
        final Long teamId = 모임_생성(alex);
        final String inviteCode = 초대_코드_생성(alex, teamId).as(InviteTokenResponse.class)
                .getInviteToken();

        final ExtractableResponse<Response> response = 초대_코드로_팀_상세_조회(alex, inviteCode);
        final Long findTeamId = response.as(TeamResponseDto.class)
                .getId();

        assertAll(
                () -> assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value()),
                () -> assertThat(findTeamId).isEqualTo(teamId)
        );
    }

    @Test
    @DisplayName("유효시간이 지난 초대코드로 모임 정보를 요청시 예외가 발생한다.")
    void findTeamByInviteTokenWithExpiredToken() {
        final Long teamId = 모임_생성(alex);
        final Team team = teamRepository.findById(teamId).get();
        final InviteCode expiredInviteToken = new InviteCode(null, "abc", LocalDateTime.now().minusHours(1), team);
        inviteCodeRepository.save(expiredInviteToken);

        final ExtractableResponse<Response> response = 초대_코드로_팀_상세_조회(alex, expiredInviteToken.getCode());
        final ErrorResponse errorResponse = response.as(ErrorResponse.class);

        assertAll(
                () -> assertThat(response.statusCode()).isEqualTo(HttpStatus.BAD_REQUEST.value()),
                () -> assertThat(errorResponse).extracting("errorCode", "message")
                        .containsExactly("4017", "토큰의 유효기간이 만료됐습니다.")
        );
    }

    private TeamResponseDto createTeamResponse(final Long teamId, final TeamRequest teamRequest, final boolean joined) {
        return new TeamResponseDto(
                teamId,
                teamRequest.getName(),
                teamRequest.getDescription(),
                teamRequest.getEmoji(),
                teamRequest.getColor(),
                joined,
                teamRequest.isSecret()
        );
    }

    private void 모임이름이_수정됨(ExtractableResponse<Response> response) {
        assertThat(response.statusCode()).isEqualTo(HttpStatus.NO_CONTENT.value());
    }

    private void 모임이_추가됨(ExtractableResponse<Response> response) {
        assertThat(response.statusCode()).isEqualTo(HttpStatus.CREATED.value());
        assertThat(response.header("Location")).isNotBlank();
    }
}
