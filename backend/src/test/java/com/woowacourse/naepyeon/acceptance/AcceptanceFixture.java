package com.woowacourse.naepyeon.acceptance;

import com.woowacourse.naepyeon.controller.dto.MemberRegisterRequest;
import com.woowacourse.naepyeon.controller.dto.MemberUpdateRequest;
import com.woowacourse.naepyeon.controller.dto.TeamRequest;
import io.restassured.RestAssured;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import org.springframework.http.MediaType;

public class AcceptanceFixture {

    public static ExtractableResponse<Response> post(final Object body, final String uri) {
        return RestAssured.given().log().all()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .body(body)
                .when().post(uri)
                .then().log().all()
                .extract();
    }

    public static ExtractableResponse<Response> put(final Object body, final String uri) {
        return RestAssured.given().log().all()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .body(body)
                .when().put(uri)
                .then().log().all()
                .extract();
    }

    public static ExtractableResponse<Response> delete(final String uri) {
        return RestAssured.given().log().all()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .when().delete(uri)
                .then().log().all()
                .extract();
    }

    public static ExtractableResponse<Response> 회원_추가(final MemberRegisterRequest member) {
        return post(member, "/api/v1/members");
    }

    public static ExtractableResponse<Response> 회원_유저네임_수정(final Long id,
                                                           final MemberUpdateRequest memberUpdateRequest) {
        return put(memberUpdateRequest, "/api/v1/members/" + id);
    }

    public static ExtractableResponse<Response> 회원_삭제(final Long id) {
        return delete("/api/v1/members/" + id);
    }

    public static ExtractableResponse<Response> 모임_추가(final TeamRequest teamRequest) {
        return post(teamRequest, "/api/v1/teams");
    }

    public static ExtractableResponse<Response> 모임_이름_수정(final Long id, final TeamRequest teamRequest) {
        return put(teamRequest, "/api/v1/teams/" + id);
    }

    public static ExtractableResponse<Response> 모임_삭제(final Long id) {
        return delete("/api/v1/teams/" + id);
    }
}
