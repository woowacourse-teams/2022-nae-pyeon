package com.woowacourse.naepyeon.acceptance;


import com.woowacourse.naepyeon.controller.dto.MemberRegisterRequest;
import com.woowacourse.naepyeon.controller.dto.MemberUpdateRequest;
import io.restassured.RestAssured;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

import static org.assertj.core.api.Assertions.assertThat;

class MemberAcceptanceTest extends AcceptanceTest {

    @Test
    @DisplayName("회원 추가")
    void addMember() {
        //회원 생성
        final MemberRegisterRequest member = new MemberRegisterRequest("seungpang", "email@email.com", "12345678aA!");
        ExtractableResponse<Response> response = 회원_추가(member);

        //회원이 추가됨
        회원이_추가됨(response);
    }

    @Test
    @DisplayName("회원 유저이름 수정")
    void updateMember() {
        //회원 생성
        final MemberRegisterRequest member = new MemberRegisterRequest("seungpang", "email@email.com", "12345678aA!");
        회원_추가(member);

        //회원정보 수정
        final MemberUpdateRequest memberUpdateRequest = new MemberUpdateRequest("zero");
        final ExtractableResponse<Response> response = 회원_유저네임_수정(1L, memberUpdateRequest);

        //회원정보가 수정됨
        회원정보가_수정됨(response);
    }

    @Test
    @DisplayName("회원 삭제")
    void deleteMember() {
        //회원 생성
        final MemberRegisterRequest member = new MemberRegisterRequest("seungpang", "email@email.com", "12345678aA!");
        ExtractableResponse<Response> test = 회원_추가(member);

        //회원 삭제
        ExtractableResponse<Response> response = 회원_삭제(1L);

        //회원이 삭제됨
        회원_삭제됨(response);
    }

    private ExtractableResponse<Response> 회원_추가(final MemberRegisterRequest member) {
        return RestAssured.given().log().all()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .body(member)
                .when().post("/api/v1/members")
                .then().log().all()
                .extract();
    }

    private void 회원이_추가됨(final ExtractableResponse<Response> response) {
        assertThat(response.statusCode()).isEqualTo(HttpStatus.CREATED.value());
        assertThat(response.header("Location")).isNotBlank();
    }

    private ExtractableResponse<Response> 회원_유저네임_수정(final Long id, final MemberUpdateRequest memberUpdateRequest) {
        return RestAssured.given().log().all()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .body(memberUpdateRequest)
                .when().put("/api/v1/members/" + id)
                .then().log().all()
                .extract();
    }

    private void 회원정보가_수정됨(final ExtractableResponse<Response> response) {
        assertThat(response.statusCode()).isEqualTo(HttpStatus.NO_CONTENT.value());
    }

    private ExtractableResponse<Response> 회원_삭제(final Long id) {
        return RestAssured.given().log().all()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .when().delete("/api/v1/members/" + id)
                .then().log().all()
                .extract();
    }

    private void 회원_삭제됨(final ExtractableResponse<Response> response) {
        assertThat(response.statusCode()).isEqualTo(HttpStatus.NO_CONTENT.value());
    }
}
