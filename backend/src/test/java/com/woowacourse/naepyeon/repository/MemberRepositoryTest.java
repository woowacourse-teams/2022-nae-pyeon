package com.woowacourse.naepyeon.repository;

import static org.assertj.core.api.Assertions.assertThat;

import com.woowacourse.naepyeon.config.JpaAuditingConfig;
import com.woowacourse.naepyeon.domain.Member;
import com.woowacourse.naepyeon.domain.Platform;
import java.time.LocalDateTime;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;

@DataJpaTest
@Import(JpaAuditingConfig.class)
class MemberRepositoryTest {

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private EntityManager em;

    @Test
    @DisplayName("회원을 id값으로 찾는다.")
    void findById() {
        // given
        final Member member = new Member("seungpang", "email@email.com", Platform.KAKAO, "1");
        final Long memberId = memberRepository.save(member)
                .getId();

        // when
        final Member findMember = memberRepository.findById(memberId)
                .orElseThrow();

        // then
        assertThat(findMember)
                .extracting("id", "username", "email", "platform", "platformId")
                .containsExactly(memberId, "seungpang", "email@email.com", member.getPlatform(),
                        member.getPlatformId());
    }

    @Test
    @DisplayName("회원을 id값을 통해 제거한다.")
    void delete() {
        // given
        final Member member = new Member("seungpang", "email@email.com", Platform.KAKAO, "1");
        final Long memberId = memberRepository.save(member)
                .getId();

        // when
        memberRepository.deleteById(memberId);

        // then
        assertThat(memberRepository.findById(memberId))
                .isEmpty();
    }

    @Test
    @DisplayName("회원을 생성할 때 생성일자가 올바르게 나온다.")
    void createMemberWhen() {
        final Member member = new Member("alex", "alex@naepyeon.com", Platform.KAKAO, "1");
        final Long memberId = memberRepository.save(member)
                .getId();

        final Member actual = memberRepository.findById(memberId)
                .orElseThrow();
        assertThat(actual.getCreatedDate()).isAfter(LocalDateTime.MIN);
    }

    @Test
    @DisplayName("회원 정보를 수정할 때 수정일자가 올바르게 나온다.")
    void updateMemberWhen() {
        final Member member = new Member("alex", "alex@naepyeon.com", Platform.KAKAO, "1");
        final Long memberId = memberRepository.save(member)
                .getId();

        member.changeUsername("kth990303");
        em.flush();

        final Member actual = memberRepository.findById(memberId)
                .orElseThrow();
        assertThat(actual.getLastModifiedDate()).isAfter(actual.getCreatedDate());
    }
}
