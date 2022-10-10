package com.woowacourse.naepyeon.repository.refreshtoken;

import static com.woowacourse.naepyeon.domain.refreshtoken.QRefreshToken.*;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.woowacourse.naepyeon.domain.refreshtoken.QRefreshToken;
import javax.persistence.EntityManager;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class RefreshTokenRepositoryImpl implements RefreshTokenRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    @Override
    public Long findCountByMemberId(final Long memberId) {
        return queryFactory.select(refreshToken.id.count())
                .from(refreshToken)
                .where(refreshToken.member.id.eq(memberId))
                .fetchOne();
    }
}
