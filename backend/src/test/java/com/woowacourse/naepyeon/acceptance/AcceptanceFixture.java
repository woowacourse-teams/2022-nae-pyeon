package com.woowacourse.naepyeon.acceptance;

import com.woowacourse.naepyeon.controller.dto.CreateResponse;
import com.woowacourse.naepyeon.controller.dto.MemberRegisterRequest;
import com.woowacourse.naepyeon.controller.dto.MemberUpdateRequest;
import com.woowacourse.naepyeon.controller.dto.TeamRequest;
import com.woowacourse.naepyeon.controller.dto.TokenRequest;
import com.woowacourse.naepyeon.service.dto.TokenResponseDto;
import io.restassured.RestAssured;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import org.springframework.http.MediaType;

public class AcceptanceFixture {

    public static ExtractableResponse<Response> member_post(final Object body, final String uri) {
        return RestAssured.given().log().all()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .body(body)
                .when().post(uri)
                .then().log().all()
                .extract();
    }

    public static ExtractableResponse<Response> post(final TokenResponseDto tokenResponseDto,
                                                     final Object body, final String uri) {
        return RestAssured.given().log().all()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .auth().oauth2(tokenResponseDto.getAccessToken())
                .body(body)
                .when().post(uri)
                .then().log().all()
                .extract();
    }

    public static ExtractableResponse<Response> get(final TokenResponseDto tokenResponseDto,
                                                    final String uri) {
        return RestAssured.given().log().all()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .auth().oauth2(tokenResponseDto.getAccessToken())
                .when().get(uri)
                .then().log().all()
                .extract();
    }

    public static ExtractableResponse<Response> put(final TokenResponseDto tokenResponseDto, final Object body,
                                                    final String uri) {
        return RestAssured.given().log().all()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .auth().oauth2(tokenResponseDto.getAccessToken())
                .body(body)
                .put(uri)
                .then().log().all()
                .extract();
    }

    public static ExtractableResponse<Response> delete(final TokenResponseDto tokenResponseDto, final String uri) {
        return RestAssured.given().log().all()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .auth().oauth2(tokenResponseDto.getAccessToken())
                .when().delete(uri)
                .then().log().all()
                .extract();
    }

    public static TokenResponseDto 회원가입_후_로그인(final MemberRegisterRequest member) {
        회원_추가(member);
        return 로그인_응답(new TokenRequest(member.getEmail(), member.getPassword()))
                .as(TokenResponseDto.class);
    }

    public static Long 모임_생성() {
        final MemberRegisterRequest member =
                new MemberRegisterRequest("seungpang", "email@email.com", "12345678aA!");
        final TokenResponseDto tokenResponseDto = 회원가입_후_로그인(member);
        final TeamRequest teamRequest = new TeamRequest(
                "woowacourse-4th",
                "테스트 모임입니다.",
                "testEmoji",
                "#123456"
        );
        return 모임_추가(tokenResponseDto, teamRequest).as(CreateResponse.class)
                .getId();
    }

    public static ExtractableResponse<Response> 회원_추가(final MemberRegisterRequest member) {
        return member_post(member, "/api/v1/members");
    }

    public static ExtractableResponse<Response> 회원_조회(final TokenResponseDto tokenResponseDto) {
        return get(tokenResponseDto, "/api/v1/members/me");
    }

    public static ExtractableResponse<Response> 회원_유저네임_수정(final TokenResponseDto tokenResponseDto,
                                                           final MemberUpdateRequest memberUpdateRequest) {
        return put(tokenResponseDto, memberUpdateRequest, "/api/v1/members/me");
    }

    public static ExtractableResponse<Response> 회원_삭제(final TokenResponseDto tokenResponseDto, final Long id) {
        return delete(tokenResponseDto, "/api/v1/members/" + id);
    }

    public static ExtractableResponse<Response> 모임_추가(final TokenResponseDto tokenResponseDto,
                                                      final TeamRequest teamRequest) {
        return post(tokenResponseDto, teamRequest, "/api/v1/teams");
    }

    public static ExtractableResponse<Response> 모임_이름_수정(final TokenResponseDto tokenResponseDto,
                                                         final Long id, final TeamRequest teamRequest) {
        return put(tokenResponseDto, teamRequest, "/api/v1/teams/" + id);
    }

    public static ExtractableResponse<Response> 모임_삭제(final TokenResponseDto tokenResponseDto, final Long id) {
        return delete(tokenResponseDto, "/api/v1/teams/" + id);
    }

    public static ExtractableResponse<Response> 로그인_응답(final TokenRequest tokenRequest) {
        return member_post(tokenRequest, "/api/v1/login");
    }
}
