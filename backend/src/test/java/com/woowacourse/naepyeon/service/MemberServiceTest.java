package com.woowacourse.naepyeon.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.woowacourse.naepyeon.exception.NotFoundMemberException;
import com.woowacourse.naepyeon.service.dto.MemberResponseDto;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Transactional
class MemberServiceTest {

    @Autowired
    private MemberService memberService;

    @Test
    @DisplayName("회원을 id값으로 찾는다.")
    void findById() {
        // given
        final Long memberId = memberService.save("seungpang", "email@email.com", "KAKAO", "1");

        // when
        final MemberResponseDto findMember = memberService.findById(memberId);

        // then
        assertThat(findMember)
                .extracting("username", "email")
                .containsExactly("seungpang", "email@email.com");
    }

    @Test
    @DisplayName("회원의 유저네임을 수정한다.")
    void update() {
        // given
        final Long memberId = memberService.save("seungpang", "email@email.com", "KAKAO", "2");

        // when
        memberService.updateUsername(memberId, "zero");

        // then
        assertThat(memberService.findById(memberId))
                .extracting("username", "email")
                .containsExactly("zero", "email@email.com");
    }

    @Test
    @DisplayName("회원을 id값을 통해 제거한다.")
    void delete() {
        // given
        final Long memberId = memberService.save("seungpang", "email@email.com", "KAKAO", "3");

        // when
        memberService.delete(memberId);

        // then
        assertThatThrownBy(() -> memberService.findById(memberId))
                .isInstanceOf(NotFoundMemberException.class);
    }
}
