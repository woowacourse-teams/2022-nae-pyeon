package com.woowacourse.naepyeon.repository.refreshtoken;

import static org.assertj.core.api.Assertions.assertThat;

import com.woowacourse.naepyeon.config.JpaAuditingConfig;
import com.woowacourse.naepyeon.config.QueryDslConfig;
import com.woowacourse.naepyeon.domain.Member;
import com.woowacourse.naepyeon.domain.Platform;
import com.woowacourse.naepyeon.domain.refreshtoken.RefreshToken;
import com.woowacourse.naepyeon.repository.member.MemberRepository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;

@DataJpaTest
@Import({JpaAuditingConfig.class, QueryDslConfig.class})
class RefreshTokenRepositoryTest {

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private RefreshTokenRepository refreshTokenRepository;

    @Test
    @DisplayName("멤버 아이디로 리프레시 토큰을 찾는다.")
    void findByMemberId() {
        final Member member = new Member("seungpang", "email@email.com", Platform.KAKAO, "1");
        memberRepository.save(member);
        final RefreshToken refreshToken1 = RefreshToken.createBy(member, () -> UUID.randomUUID().toString());
        final RefreshToken refreshToken2 = RefreshToken.createBy(member, () -> UUID.randomUUID().toString());
        final RefreshToken refreshToken3 = RefreshToken.createBy(member, () -> UUID.randomUUID().toString());
        refreshTokenRepository.save(refreshToken1);
        refreshTokenRepository.save(refreshToken2);
        refreshTokenRepository.save(refreshToken3);

        final int count = refreshTokenRepository.findByMemberId(member.getId()).size();

        assertThat(count).isEqualTo(3);
    }

    @Test
    @DisplayName("리프레시 토큰 값으로 조회한다.")
    void findByValue() {
        final Member member = new Member("seungpang", "email@email.com", Platform.KAKAO, "1");
        memberRepository.save(member);
        final RefreshToken refreshToken = RefreshToken.createBy(member, () -> UUID.randomUUID().toString());
        refreshTokenRepository.save(refreshToken);

        final RefreshToken findRefreshToken = refreshTokenRepository.findByValue(refreshToken.getValue())
                .orElseThrow();

        assertThat(findRefreshToken).isSameAs(refreshToken);
    }

    @Test
    @DisplayName("리프레시 토큰 값으로 삭제한다.")
    void deleteByValue() {
        final Member member = new Member("seungpang", "email@email.com", Platform.KAKAO, "1");
        memberRepository.save(member);
        final RefreshToken refreshToken = RefreshToken.createBy(member, () -> UUID.randomUUID().toString());
        refreshTokenRepository.save(refreshToken);

        refreshTokenRepository.deleteByValue(refreshToken.getValue());
        final Optional<RefreshToken> findRefreshToken = refreshTokenRepository.findByValue(refreshToken.getValue());

        assertThat(findRefreshToken).isEmpty();
    }

    @Test
    @DisplayName("만료시간이 입력시간 이전인 모든 토큰 삭제")
    void deleteExpired() {
        final Member member = new Member("seungpang", "email@email.com", Platform.KAKAO, "1");
        memberRepository.save(member);
        final RefreshToken refreshToken1 = RefreshToken.createBy(member, () -> UUID.randomUUID().toString());
        final RefreshToken refreshToken2 = RefreshToken.createBy(member, () -> UUID.randomUUID().toString());
        final RefreshToken refreshToken3 = RefreshToken.createBy(member, () -> UUID.randomUUID().toString());
        refreshTokenRepository.save(refreshToken1);
        refreshTokenRepository.save(refreshToken2);
        refreshTokenRepository.save(refreshToken3);

        refreshTokenRepository.deleteExpired(LocalDateTime.now().plusDays(7).plusMinutes(1));

        final List<RefreshToken> refreshTokens = refreshTokenRepository.findByMemberId(member.getId());

        assertThat(refreshTokens).isEmpty();
    }
}
