package com.woowacourse.naepyeon.repository.member;

import static com.woowacourse.naepyeon.domain.QMember.member;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.woowacourse.naepyeon.domain.Platform;
import java.util.Optional;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class MemberRepositoryImpl implements MemberRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    @Override
    public Optional<Long> findMemberIdByPlatformAndPlatformId(final Platform platform, final String platformId) {
        return Optional.ofNullable(queryFactory
                .select(member.id)
                .from(member)
                .where(member.platform.eq(platform).and(member.platformId.eq(platformId)))
                .fetchOne());
    }
}
