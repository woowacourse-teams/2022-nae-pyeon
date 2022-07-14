package com.woowacourse.naepyeon.acceptance;


import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.회원_삭제;
import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.회원_유저네임_수정;
import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.회원_추가;
import static org.assertj.core.api.Assertions.assertThat;

import com.woowacourse.naepyeon.controller.dto.CreateResponse;
import com.woowacourse.naepyeon.controller.dto.MemberRegisterRequest;
import com.woowacourse.naepyeon.controller.dto.MemberUpdateRequest;
import io.restassured.RestAssured;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;

class MemberAcceptanceTest extends AcceptanceTest {

    @Test
    @DisplayName("회원 추가")
    void addMember() {
        //회원 생성
        final MemberRegisterRequest member =
                new MemberRegisterRequest("seungpang", "email@email.com", "12345678aA!");
        final ExtractableResponse<Response> response = 회원_추가(member);

        //회원이 추가됨
        회원이_추가됨(response);
    }

    @Test
    @DisplayName("이미 가입된 회원이 추가되는 경우 예외를 발생시킨다.")
    void addDuplicationMember() {
        final MemberRegisterRequest member =
                new MemberRegisterRequest("seungpang", "email@email.com", "12345678aA!");
        회원_추가(member);

        final ExtractableResponse<Response> response = 회원_추가(member);

        assertThat(response.statusCode()).isEqualTo(HttpStatus.BAD_REQUEST.value());
    }


    @Test
    @DisplayName("회원 유저이름 수정")
    void updateMember() {
        //회원 생성
        final MemberRegisterRequest member =
                new MemberRegisterRequest("seungpang", "email@email.com", "12345678aA!");
        final Long memberId = 회원_추가(member).as(CreateResponse.class)
                .getId();

        //회원정보 수정
        final MemberUpdateRequest memberUpdateRequest = new MemberUpdateRequest("zero");
        final ExtractableResponse<Response> response = 회원_유저네임_수정(memberId, memberUpdateRequest);

        //회원정보가 수정됨
        회원정보가_수정됨(response);
    }

    @Test
    @DisplayName("회원 삭제")
    void deleteMember() {
        //회원 생성
        final MemberRegisterRequest member =
                new MemberRegisterRequest("seungpang", "email@email.com", "12345678aA!");
        final Long memberId = 회원_추가(member).as(CreateResponse.class)
                .getId();

        //회원 삭제
        final ExtractableResponse<Response> response = 회원_삭제(memberId);

        //회원이 삭제됨
        회원_삭제됨(response);
    }

    private void 회원이_추가됨(final ExtractableResponse<Response> response) {
        assertThat(response.statusCode()).isEqualTo(HttpStatus.CREATED.value());
        assertThat(response.header("Location")).isNotBlank();
    }

    private void 회원정보가_수정됨(final ExtractableResponse<Response> response) {
        assertThat(response.statusCode()).isEqualTo(HttpStatus.NO_CONTENT.value());
    }

    private void 회원_삭제됨(final ExtractableResponse<Response> response) {
        assertThat(response.statusCode()).isEqualTo(HttpStatus.NO_CONTENT.value());
    }
}
