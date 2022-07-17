package com.woowacourse.naepyeon.acceptance;

import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.post;
import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.모임_삭제;
import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.모임_생성;
import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.모임_이름_수정;
import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.모임_추가;
import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.모임_가입;
import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.회원가입_후_로그인;
import static org.assertj.core.api.Assertions.assertThat;

import com.woowacourse.naepyeon.controller.dto.JoinTeamMemberRequest;
import com.woowacourse.naepyeon.controller.dto.MemberRegisterRequest;
import com.woowacourse.naepyeon.controller.dto.TeamRequest;
import com.woowacourse.naepyeon.service.dto.TokenResponseDto;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
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
                "#123456"
        );
        final ExtractableResponse<Response> response = 모임_추가(tokenResponseDto, teamRequest);

        //모임이 추가됨
        모임이_추가됨(response);
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
                "#123456"
        );
        모임_추가(tokenResponseDto, teamRequest);

        final ExtractableResponse<Response> response = 모임_추가(tokenResponseDto, teamRequest);

        assertThat(response.statusCode()).isEqualTo(HttpStatus.BAD_REQUEST.value());
    }

    @Test
    @DisplayName("모임 이름 수정")
    void updateTeam() {
        // 모임 생성
        final MemberRegisterRequest member =
                new MemberRegisterRequest("seungpang", "email@email.com", "12345678aA!");
        final TokenResponseDto tokenResponseDto = 회원가입_후_로그인(member);
        final Long teamId = 모임_생성();

        // 모임 이름 수정
        final TeamRequest changeTeamRequest = new TeamRequest(
                "woowacourse-5th",
                "테스트 모임입니다.",
                "testEmoji",
                "#123456"
        );
        final ExtractableResponse<Response> response = 모임_이름_수정(tokenResponseDto, teamId, changeTeamRequest);
        모임이름이_수정됨(response);
    }

    @Test
    @DisplayName("모임 삭제")
    void deleteTeam() {
        //모임 생성
        final MemberRegisterRequest member =
                new MemberRegisterRequest("seungpang", "email@email.com", "12345678aA!");
        final TokenResponseDto tokenResponseDto = 회원가입_후_로그인(member);
        final Long teamId = 모임_생성();

        //모임 삭제
        final ExtractableResponse<Response> response = 모임_삭제(tokenResponseDto, teamId);

        //모임이 삭제됨
        모임_삭제됨(response);
    }

    @Test
    @DisplayName("모임에 이미 가입된 회원을 가입시키려 하는 경우 예외를 발생시킨다.")
    void joinMemberDuplicate() {
        //모임 생성
        final MemberRegisterRequest member =
                new MemberRegisterRequest("seungpang", "email@email.com", "12345678aA!");
        final TokenResponseDto tokenResponseDto = 회원가입_후_로그인(member);
        final Long teamId = 모임_생성();
        모임_가입(tokenResponseDto, teamId, new JoinTeamMemberRequest("모임닉네임"));

        final ExtractableResponse<Response> response =
                모임_가입(tokenResponseDto, teamId, new JoinTeamMemberRequest("모임닉네임"));

        assertThat(response.statusCode()).isEqualTo(HttpStatus.BAD_REQUEST.value());
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
