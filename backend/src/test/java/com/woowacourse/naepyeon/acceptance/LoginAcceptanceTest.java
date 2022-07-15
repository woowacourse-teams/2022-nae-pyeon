package com.woowacourse.naepyeon.acceptance;

import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.회원_조회;
import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.회원가입_후_로그인;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import com.woowacourse.naepyeon.controller.dto.MemberRegisterRequest;
import com.woowacourse.naepyeon.service.dto.MemberResponseDto;
import com.woowacourse.naepyeon.service.dto.TokenResponseDto;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

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
}
