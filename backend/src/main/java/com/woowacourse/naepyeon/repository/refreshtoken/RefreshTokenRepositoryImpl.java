package com.woowacourse.naepyeon.repository.refreshtoken;

import static com.woowacourse.naepyeon.domain.refreshtoken.QRefreshToken.refreshToken;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.woowacourse.naepyeon.domain.refreshtoken.RefreshToken;
import java.util.List;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class RefreshTokenRepositoryImpl implements RefreshTokenRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    @Override
    public List<RefreshToken> findByMemberId(final Long memberId) {
        return queryFactory.selectFrom(refreshToken)
                .where(refreshToken.memberId.eq(memberId))
                .fetch();
    }
}
