package com.woowacourse.naepyeon.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.woowacourse.naepyeon.exception.InvalidLoginException;
import com.woowacourse.naepyeon.service.dto.MemberResponseDto;
import com.woowacourse.naepyeon.service.dto.TokenRequestDto;
import com.woowacourse.naepyeon.service.dto.TokenResponseDto;
import com.woowacourse.naepyeon.support.JwtTokenProvider;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Transactional
class AuthServiceTest {

    @Autowired
    private AuthService authService;

    @Autowired
    private MemberService memberService;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Test
    @DisplayName("이메일 비밀번호가 일치하는 경우 로그인에 성공한다.")
    void successLogin() {
        // given
        final Long memberId = memberService.save("zero", "email@email.com", "password123!");

        // when
        final String accessToken = authService.createToken(new TokenRequestDto("email@email.com", "password123!"))
                .getAccessToken();

        // then
        final String payload = jwtTokenProvider.getPayload(accessToken);
        assertThat(String.valueOf(memberId)).isEqualTo(payload);
    }

    @Test
    @DisplayName("이메일이 일치하지 않는 경우 로그인에 실패한다.")
    void failEmailLogin() {
        assertThatThrownBy(() ->authService.createToken(new TokenRequestDto("email@email.com", "password123!")))
                .isInstanceOf(InvalidLoginException.class);
    }

    @Test
    @DisplayName("비밀번호가 일치하지 않는 경우 로그인에 실패한다.")
    void failPasswordLogin() {
        // given
        memberService.save("zero", "email@email.com", "password123!");

        // when then
        assertThatThrownBy(() ->authService.createToken(new TokenRequestDto("email@email.com", "password1234")))
                .isInstanceOf(InvalidLoginException.class);
    }
}