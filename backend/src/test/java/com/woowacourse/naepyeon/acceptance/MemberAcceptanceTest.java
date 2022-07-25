package com.woowacourse.naepyeon.acceptance;

import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.로그인_응답;
import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.회원_삭제;
import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.회원_유저네임_수정;
import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.회원_조회;
import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.회원_추가;
import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.회원가입_후_로그인;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import com.woowacourse.naepyeon.controller.dto.MemberRegisterRequest;
import com.woowacourse.naepyeon.controller.dto.MemberUpdateRequest;
import com.woowacourse.naepyeon.controller.dto.TokenRequest;
import com.woowacourse.naepyeon.service.dto.MemberResponseDto;
import com.woowacourse.naepyeon.service.dto.TokenResponseDto;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.http.HttpStatus;

class MemberAcceptanceTest extends AcceptanceTest {

    @Test
    @DisplayName("회원을 추가하고 검증한다.")
    void addMember() {
        //회원 정보
        final MemberRegisterRequest member =
                new MemberRegisterRequest("seungpang", "email@email.com", "12345678aA!");

        //회원 추가 및 토큰
        final ExtractableResponse<Response> response = 회원_추가(member);
        final TokenResponseDto token = 로그인_응답(new TokenRequest("email@email.com", "12345678aA!"))
                .as(TokenResponseDto.class);

        //회원추가 검증 및 회원검증
        회원이_추가됨(response, token, member);
    }

    @Test
    @DisplayName("회원가입 시, 이미 가입된 회원이 추가되는 경우 예외가 발생한다.")
    void addDuplicationMember() {
        final MemberRegisterRequest member =
                new MemberRegisterRequest("seungpang", "email@email.com", "12345678aA!");
        회원_추가(member);

        final ExtractableResponse<Response> response = 회원_추가(member);

        assertThat(response.statusCode()).isEqualTo(HttpStatus.BAD_REQUEST.value());
    }

    @ParameterizedTest
    @DisplayName("회원가입 시, 회원이름이 2 ~ 20자 및 한글, 영어, 숫자가 아닌 경우 예외가 발생한다.")
    @ValueSource(strings = {"0", "012345678901234567891", "+특수문자+"})
    void failSignUpUsername(final String failUsername) {
        final MemberRegisterRequest member =
                new MemberRegisterRequest(failUsername, "email@email.com", "12345678aA!");

        final ExtractableResponse<Response> response = 회원_추가(member);

        assertThat(response.statusCode()).isEqualTo(HttpStatus.BAD_REQUEST.value());
    }

    @ParameterizedTest
    @DisplayName("회원가입 시, 이메일이 기본 이메일 형식이 아닌 경우 예외가 발생한다.")
    @ValueSource(strings = {"fail", "fail@email"})
    void failSignUpEmail(final String failEmail) {
        final MemberRegisterRequest member =
                new MemberRegisterRequest("zero", failEmail, "12345678aA!");

        final ExtractableResponse<Response> response = 회원_추가(member);

        assertThat(response.statusCode()).isEqualTo(HttpStatus.BAD_REQUEST.value());
    }

    @ParameterizedTest
    @DisplayName("회원가입 시, 비밀번호가 8 ~ 20자 및 영어, 숫자가 포함되지 않는 경우 예외가 발생한다.")
    @ValueSource(strings = {"password", "pass123", "passwordPassword12345"})
    void failSignUpPassword(final String failPassword) {
        final MemberRegisterRequest member =
                new MemberRegisterRequest("zero", "email@email.com", failPassword);

        final ExtractableResponse<Response> response = 회원_추가(member);

        assertThat(response.statusCode()).isEqualTo(HttpStatus.BAD_REQUEST.value());
    }

    @Test
    @DisplayName("올바르지 않은 토큰으로 마이페이지를 조회할 경우 예외를 발생시킨다.")
    void loginInvalidToken() {
        final ExtractableResponse<Response> response = 회원_조회(new TokenResponseDto("invalidToken"));

        assertThat(response.statusCode()).isEqualTo(HttpStatus.UNAUTHORIZED.value());
    }

    @Test
    @DisplayName("존재하지 않는 id로 회원 조회를 하려 하는 경우 예외를 발생시킨다.")
    void loginInvalidId() {
        //회원 정보
        final MemberRegisterRequest member =
                new MemberRegisterRequest("zero", "email@email.com", "12345678aA!");

        //없는 회원 조회
        final TokenResponseDto token = 회원가입_후_로그인(member);
        회원_삭제(token);
        final ExtractableResponse<Response> response = 회원_조회(token);

        //회원조회 실패
        assertThat(response.statusCode()).isEqualTo(HttpStatus.NOT_FOUND.value());
    }

    @Test
    @DisplayName("회원정보를 수정할 수 있다.")
    void updateMember() {
        //회원 생성
        final MemberRegisterRequest member =
                new MemberRegisterRequest("seungpang", "email@email.com", "12345678aA!");
        final TokenResponseDto token = 회원가입_후_로그인(member);

        //회원정보 수정
        final MemberUpdateRequest memberUpdateRequest = new MemberUpdateRequest("zero");
        final ExtractableResponse<Response> response = 회원_유저네임_수정(token, memberUpdateRequest);

        //회원정보가 수정됨
        회원정보가_수정됨(response);
    }

    @Test
    @DisplayName("올바르지 않은 토큰으로 수정할 경우 예외가 발생한다.")
    void updateInvalidToken() {
        //회원생성
        final MemberRegisterRequest member =
                new MemberRegisterRequest("zero", "email@email.com", "12345678aA!");
        회원가입_후_로그인(member);

        //회원정보 수정
        final MemberUpdateRequest memberUpdateRequest = new MemberUpdateRequest("kei");
        final ExtractableResponse<Response> response = 회원_유저네임_수정(new TokenResponseDto("invalidToken"),
                memberUpdateRequest);

        //회원정보 수정 실패
        assertThat(response.statusCode()).isEqualTo(HttpStatus.UNAUTHORIZED.value());
    }

    @ParameterizedTest
    @DisplayName("회원수정 시, 회원이름이 2 ~ 20자 및 한글, 영어, 숫자가 아닌 경우 예외가 발생한다.")
    @ValueSource(strings = {"0", "012345678901234567891", "+특수문자+"})
    void failUpdateUsername(String failUsername) {
        //회원생성
        final MemberRegisterRequest member =
                new MemberRegisterRequest("zero", "email@email.com", "12345678aA!");
        final TokenResponseDto token = 회원가입_후_로그인(member);

        //회원정보 수정
        final MemberUpdateRequest memberUpdateRequest = new MemberUpdateRequest(failUsername);
        final ExtractableResponse<Response> response = 회원_유저네임_수정(token, memberUpdateRequest);

        //회원정보 수정 실패
        assertThat(response.statusCode()).isEqualTo(HttpStatus.BAD_REQUEST.value());
    }

    @Test
    @DisplayName("회원을 삭제할 수 있다.")
    void deleteMember() {
        //회원 생성
        final MemberRegisterRequest member =
                new MemberRegisterRequest("seungpang", "email@email.com", "12345678aA!");
        final TokenResponseDto token = 회원가입_후_로그인(member);

        //회원 삭제
        final ExtractableResponse<Response> response = 회원_삭제(token);

        //회원이 삭제됨
        회원_삭제됨(response);
    }

    @Test
    @DisplayName("올바르지 않은 토큰으로 삭제할 경우 예외가 발생한다.")
    void deleteInvalidToken() {
        //회원 생성
        final MemberRegisterRequest member =
                new MemberRegisterRequest("seungpang", "email@email.com", "12345678aA!");
        회원가입_후_로그인(member);

        //회원 삭제
        final ExtractableResponse<Response> response = 회원_삭제(new TokenResponseDto("invalidToken"));

        //회원정보 삭제 실패
        assertThat(response.statusCode()).isEqualTo(HttpStatus.UNAUTHORIZED.value());
    }

    @Test
    @DisplayName("존재하지 않는 회원을 삭제하려 하는 경우 예외가 발생한다.")
    void failDeleteMember() {
        //회원 생성 및 삭제
        final MemberRegisterRequest member =
                new MemberRegisterRequest("seungpang", "email@email.com", "12345678aA!");
        final TokenResponseDto token = 회원가입_후_로그인(member);
        회원_삭제(token);

        //없는 회원 삭제
        final ExtractableResponse<Response> response = 회원_삭제(token);

        //회원 삭제 실패
        assertThat(response.statusCode()).isEqualTo(HttpStatus.NOT_FOUND.value());
    }

    private void 회원이_추가됨(final ExtractableResponse<Response> response, final TokenResponseDto token,
                         final MemberRegisterRequest member) {
        assertThat(response.statusCode()).isEqualTo(HttpStatus.CREATED.value());
        assertThat(response.header("Location")).isNotBlank();
        회원조회_확인(token, member);
    }

    private void 회원조회_확인(final TokenResponseDto token, final MemberRegisterRequest member) {
        final MemberResponseDto findMember = 회원_조회(token).as(MemberResponseDto.class);
        assertAll(
                () -> assertThat(findMember.getUsername()).isEqualTo(member.getUsername()),
                () -> assertThat(findMember.getEmail()).isEqualTo(member.getEmail())
        );
    }

    private void 회원정보가_수정됨(final ExtractableResponse<Response> response) {
        assertThat(response.statusCode()).isEqualTo(HttpStatus.NO_CONTENT.value());
    }

    private void 회원_삭제됨(final ExtractableResponse<Response> response) {
        assertThat(response.statusCode()).isEqualTo(HttpStatus.NO_CONTENT.value());
    }
}
