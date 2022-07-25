package com.woowacourse.naepyeon.acceptance;

import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.로그인_응답;
import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.회원_조회;
import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.회원_추가;
import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.회원가입_후_로그인;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import com.woowacourse.naepyeon.controller.dto.MemberRegisterRequest;
import com.woowacourse.naepyeon.controller.dto.TokenRequest;
import com.woowacourse.naepyeon.service.dto.MemberResponseDto;
import com.woowacourse.naepyeon.service.dto.TokenResponseDto;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;

public class LoginAcceptanceTest extends AcceptanceTest {

    @Test
    @DisplayName("로그인에 성공하면 토큰을 발급한다.")
    void loginSuccess() {
        // 로그인
        final MemberRegisterRequest member =
                new MemberRegisterRequest("seungpang", "email@email.com", "12345678aA!");
        final TokenResponseDto tokenResponseDto = 회원가입_후_로그인(member);

        // 회원조회
        final MemberResponseDto actual = 회원_조회(tokenResponseDto)
                .as(MemberResponseDto.class);

        assertAll(
                () -> assertThat(actual.getUsername()).isEqualTo(member.getUsername()),
                () -> assertThat(actual.getEmail()).isEqualTo(member.getEmail())
        );
    }

    @Test
    @DisplayName("이메일이 올바르지 않으면 예외를 발생시킨다.")
    void loginFailureWithWrongEmail() {
        // 회원 가입
        final MemberRegisterRequest member =
                new MemberRegisterRequest("seungpang", "email@email.com", "12345678aA!");
        회원_추가(member);

        // 로그인
        final TokenRequest tokenRequest = new TokenRequest("kth990303@naver.com", member.getPassword());
        final ExtractableResponse<Response> response = 로그인_응답(tokenRequest);

        assertThat(response.statusCode()).isEqualTo(HttpStatus.UNAUTHORIZED.value());
    }

    @Test
    @DisplayName("비밀번호가 올바르지 않으면 예외를 발생시킨다.")
    void loginFailureWithWrongPassword() {
        // 회원 가입
        final MemberRegisterRequest member =
                new MemberRegisterRequest("seungpang", "email@email.com", "12345678aA!");
        회원_추가(member);

        // 로그인
        final TokenRequest tokenRequest = new TokenRequest(member.getEmail(), "aA!12345678");
        final ExtractableResponse<Response> response = 로그인_응답(tokenRequest);

        assertThat(response.statusCode()).isEqualTo(HttpStatus.UNAUTHORIZED.value());
    }
}
