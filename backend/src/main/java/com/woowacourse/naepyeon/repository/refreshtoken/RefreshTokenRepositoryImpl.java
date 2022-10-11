package com.woowacourse.naepyeon.repository.refreshtoken;

import static com.woowacourse.naepyeon.domain.refreshtoken.QRefreshToken.refreshToken;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.woowacourse.naepyeon.domain.refreshtoken.RefreshToken;
import java.time.LocalDateTime;
import java.util.List;
import javax.persistence.EntityManager;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class RefreshTokenRepositoryImpl implements RefreshTokenRepositoryCustom {

    private final JPAQueryFactory queryFactory;
    private final EntityManager em;

    @Override
    public List<RefreshToken> findByMemberId(final Long memberId) {
        return queryFactory.selectFrom(refreshToken)
                .where(refreshToken.member.id.eq(memberId))
                .fetch();
    }

    @Override
    public long deleteExpired(final LocalDateTime deleteTime) {
        final long deletedRowCount = queryFactory.delete(refreshToken)
                .where(refreshToken.expiredTime.before(deleteTime))
                .execute();

        em.flush();
        em.clear();
        return deletedRowCount;
    }
}
