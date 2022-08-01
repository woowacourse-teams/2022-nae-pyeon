package com.woowacourse.naepyeon.acceptance;

import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.로그인_응답;
import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.회원_조회;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import com.woowacourse.naepyeon.controller.dto.TokenRequest;
import com.woowacourse.naepyeon.service.dto.MemberResponseDto;
import com.woowacourse.naepyeon.service.dto.TokenResponseDto;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

public class LoginAcceptanceTest extends AcceptanceTest {

    @Test
    @DisplayName("로그인에 성공하면 토큰을 발급한다.")
    void loginSuccess() {
        //회원 추가 및 토큰
        final TokenRequest tokenRequest =
                new TokenRequest("KAKAO", 500000L, "email@email.com", "알렉스", "이미지경로");

        final TokenResponseDto token = 로그인_응답(tokenRequest)
                .as(TokenResponseDto.class);

        // 회원조회
        final MemberResponseDto actual = 회원_조회(token)
                .as(MemberResponseDto.class);

        assertAll(
                () -> assertThat(actual.getUsername()).isEqualTo(tokenRequest.getUsername()),
                () -> assertThat(actual.getEmail()).isEqualTo(tokenRequest.getEmail())
        );
    }
}
