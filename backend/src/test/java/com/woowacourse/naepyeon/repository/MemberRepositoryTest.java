package com.woowacourse.naepyeon.repository;

import static org.assertj.core.api.Assertions.assertThat;

import com.woowacourse.naepyeon.domain.Member;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Transactional
class MemberRepositoryTest {

    @Autowired
    private MemberRepository memberRepository;

    @Test
    @DisplayName("회원을 id값으로 찾는다.")
    public void findById() {
        // given
        final Member member = new Member("seungpang", "email@email.com", "password123!A");
        final Long memberId = memberRepository.save(member);

        // when
        final Member findMember = memberRepository.findById(memberId).get();

        // then
        assertThat(findMember)
                .extracting("id", "username", "email", "password")
                .containsExactly(memberId, "seungpang", "email@email.com", "password123!A");
    }

    @Test
    @DisplayName("회원을 id값을 통해 제거한다.")
    public void delete() {
        // given
        final Member member = new Member("seungpang", "email@email.com", "password123!A");
        final Long memberId = memberRepository.save(member);

        // when
        memberRepository.delete(memberId);

        // then
        assertThat(memberRepository.findById(memberId))
                .isEmpty();
    }
}