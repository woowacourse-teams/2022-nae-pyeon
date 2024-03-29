package com.woowacourse.naepyeon.repository.messagelike;

import static com.woowacourse.naepyeon.domain.message.QMessageLike.messageLike;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class MessageLikeRepositoryImpl implements MessageLikeRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    @Override
    public Boolean existsByMemberIdAndMessageId(final Long memberId, final Long messageId) {
        Integer fetchOne = queryFactory
                .selectOne()
                .from(messageLike)
                .where(messageLike.memberId.eq(memberId).and(messageLike.messageId.eq(messageId)))
                .fetchFirst();
        return fetchOne != null;
    }
}
