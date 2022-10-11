package com.woowacourse.naepyeon.repository.refreshtoken;

import static org.assertj.core.api.Assertions.assertThat;

import com.woowacourse.naepyeon.config.JpaAuditingConfig;
import com.woowacourse.naepyeon.config.QueryDslConfig;
import com.woowacourse.naepyeon.domain.Member;
import com.woowacourse.naepyeon.domain.Platform;
import com.woowacourse.naepyeon.domain.refreshtoken.RefreshToken;
import com.woowacourse.naepyeon.repository.member.MemberRepository;
import java.util.UUID;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.context.annotation.Import;

@DataJpaTest
@Import({JpaAuditingConfig.class, QueryDslConfig.class})
class RefreshTokenRepositoryTest {

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private RefreshTokenRepository refreshTokenRepository;

    @Autowired
    private TestEntityManager em;

    @Test
    @DisplayName("멤버 아이디로 리프레시 토큰의 갯수를 찾는다.")
    void findCountByMemberId() {
        final Member member = new Member("seungpang", "email@email.com", Platform.KAKAO, "1");
        final Long memberId = memberRepository.save(member)
                .getId();
        final RefreshToken refreshToken1 = RefreshToken.createBy(memberId, () -> UUID.randomUUID().toString());
        final RefreshToken refreshToken2 = RefreshToken.createBy(memberId, () -> UUID.randomUUID().toString());
        final RefreshToken refreshToken3 = RefreshToken.createBy(memberId, () -> UUID.randomUUID().toString());
        refreshTokenRepository.save(refreshToken1);
        refreshTokenRepository.save(refreshToken2);
        refreshTokenRepository.save(refreshToken3);
        em.flush();
        em.clear();

        final int count = refreshTokenRepository.findByMemberId(memberId).size();

        assertThat(count).isEqualTo(3);
    }
}
