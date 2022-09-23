package com.woowacourse.naepyeon.repository.message;

import static com.woowacourse.naepyeon.domain.QMessage.message;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.woowacourse.naepyeon.domain.Message;
import java.util.List;
import java.util.function.Supplier;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class MessageRepositoryImpl implements MessageRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    @Override
    public List<Message> findAllByRollingpaperId(final Long rollingpaperId) {
        return queryFactory
                .selectFrom(message)
                .where(isRollingpaperIdEq(rollingpaperId))
                .fetch();
    }

    private BooleanBuilder isRollingpaperIdEq(final Long rollingpaperId) {
        return nullSafeBuilder(() -> message.rollingpaper.id.eq(rollingpaperId));
    }

    private BooleanBuilder nullSafeBuilder(Supplier<BooleanExpression> f) {
        try {
            return new BooleanBuilder(f.get());
        } catch (final IllegalArgumentException | NullPointerException e) {
            return new BooleanBuilder();
        }
    }
}
