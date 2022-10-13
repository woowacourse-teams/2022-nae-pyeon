package com.woowacourse.naepyeon.repository.invitecode;

import static com.woowacourse.naepyeon.domain.invitecode.QInviteCode.inviteCode;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.woowacourse.naepyeon.domain.invitecode.InviteCode;
import java.time.LocalDateTime;
import java.util.Optional;
import javax.persistence.EntityManager;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class InviteCodeRepositoryImpl implements InviteCodeRepositoryCustom {

    private final JPAQueryFactory queryFactory;
    private final EntityManager em;

    @Override
    public long deleteExpired(final LocalDateTime deleteTime) {
        final long deletedRowCount = queryFactory.delete(inviteCode)
                .where(inviteCode.expired.before(deleteTime))
                .execute();
        em.flush();
        em.clear();
        return deletedRowCount;
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
