package com.woowacourse.naepyeon.repository;

import com.woowacourse.naepyeon.domain.Member;
import com.woowacourse.naepyeon.repository.jpa.MemberJpaDao;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(SpringExtension.class)
@DataJpaTest
class JpaMemberRepositoryTest {

    @Autowired
    private MemberJpaDao memberJpaDao;

    private MemberRepository memberRepository;

    @BeforeEach
    void setup() {
        memberRepository = new JpaMemberRepository(memberJpaDao);
    }

    @Test
    @DisplayName("회원을 id값으로 찾는다.")
    public void findById() {
        // given
        Member member = new Member("seungpang", "email@email.com", "password123!A");
        Long memberId = memberRepository.save(member);

        // when
        Member findMember = memberRepository.findById(memberId).get();

        // then
        assertThat(findMember)
                .extracting("id", "username", "email", "password")
                .containsExactly(memberId, "seungpang", "email@email.com", "password123!A");
    }

    @Test
    @DisplayName("회원을 id값을 통해 제거한다.")
    public void delete() {
        // given
        Member member = new Member("seungpang", "email@email.com", "password123!A");
        Long memberId = memberRepository.save(member);

        // when
        memberRepository.delete(memberId);

        // then
        assertThat(memberRepository.findById(memberId))
                .isEmpty();
    }
}