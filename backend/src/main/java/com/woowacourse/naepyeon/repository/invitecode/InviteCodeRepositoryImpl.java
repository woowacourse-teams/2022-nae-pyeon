package com.woowacourse.naepyeon.repository.invitecode;

import static com.woowacourse.naepyeon.domain.invitecode.QInviteCode.inviteCode;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.woowacourse.naepyeon.domain.invitecode.InviteCode;
import java.time.LocalDateTime;
import java.util.Optional;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class InviteCodeRepositoryImpl implements InviteCodeRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    @Override
    public long deleteExpired(final LocalDateTime now) {
        return queryFactory.delete(inviteCode)
                .where(inviteCode.expired.before(now))
                .execute();
    }

    @Override
    public Optional<InviteCode> findByCode(final String code) {
        return Optional.ofNullable(
                queryFactory.selectFrom(inviteCode)
                        .where(inviteCode.code.eq(code))
                        .fetchOne()
        );
    }
}
