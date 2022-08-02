package com.woowacourse.naepyeon.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatCode;

import com.woowacourse.naepyeon.domain.Platform;
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
    @DisplayName("사용자 정보를 받아 토큰을 만들어 반환한다.")
    void createToken() {
        final TokenRequestDto tokenRequestDto =
                new TokenRequestDto(Platform.KAKAO.name(), "1", "email@email.com", "alex", "url");

        final TokenResponseDto tokenResponseDto = authService.createToken(tokenRequestDto);

        assertThatCode(() -> jwtTokenProvider.validateAbleToken(tokenResponseDto.getAccessToken()))
                .doesNotThrowAnyException();
    }

    @Test
    @DisplayName("사용자 정보가 DB에 없는 경우 DB에 사용자 정보를 추가하고 토큰을 반환한다.")
    void createTokenWithNotExistMember() {
        final TokenRequestDto tokenRequestDto =
                new TokenRequestDto(Platform.KAKAO.name(), "1", "email@email.com", "alex", "url");
        final TokenResponseDto tokenResponseDto = authService.createToken(tokenRequestDto);

        final Long memberId = tokenResponseDto.getId();
        final MemberResponseDto memberResponse = memberService.findById(memberId);

        assertThat(memberResponse).extracting("id", "username", "email")
                .containsExactly(memberId, tokenRequestDto.getUsername(), tokenRequestDto.getEmail());
    }
}