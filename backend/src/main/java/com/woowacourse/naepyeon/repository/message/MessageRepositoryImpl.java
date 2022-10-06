package com.woowacourse.naepyeon.repository.message;

import static com.woowacourse.naepyeon.domain.QMessage.message;
import static com.woowacourse.naepyeon.domain.QTeam.team;
import static com.woowacourse.naepyeon.domain.QTeamParticipation.teamParticipation;
import static com.woowacourse.naepyeon.domain.rollingpaper.QRollingpaper.rollingpaper;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.ConstructorExpression;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.woowacourse.naepyeon.domain.Message;
import com.woowacourse.naepyeon.service.dto.WrittenMessageResponseDto;
import java.util.List;
import java.util.function.Supplier;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;

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

    @Override
    public Page<WrittenMessageResponseDto> findAllByAuthorId(final Long authorId, final Pageable pageRequest) {
        final List<WrittenMessageResponseDto> content = queryFactory
                .select(makeProjections())
                .distinct()
                .from(message)
                .join(message.rollingpaper, rollingpaper)
                .join(message.rollingpaper.team, team)
                .join(message.rollingpaper.teamParticipation, teamParticipation)
                .where(isAuthorIdEq(authorId))
                .offset(pageRequest.getOffset())
                .limit(pageRequest.getPageSize())
                .fetch();

        final JPAQuery<Long> countQuery = queryFactory
                .select(message.countDistinct())
                .from(message)
                .where(isAuthorIdEq(authorId));

        return PageableExecutionUtils.getPage(content, pageRequest, countQuery::fetchOne);
    }

    private ConstructorExpression<WrittenMessageResponseDto> makeProjections() {
        return Projections.constructor(WrittenMessageResponseDto.class,
                message.id,
                message.rollingpaper.id,
                message.rollingpaper.title,
                message.rollingpaper.team.id,
                message.rollingpaper.team.name,
                message.content,
                message.color,
                message.rollingpaper.teamParticipation.nickname
        );
    }

    private BooleanBuilder isRollingpaperIdEq(final Long rollingpaperId) {
        return nullSafeBuilder(() -> message.rollingpaper.id.eq(rollingpaperId));
    }

    private BooleanBuilder isAuthorIdEq(final Long authorId) {
        return nullSafeBuilder(() -> message.author.id.eq(authorId));
    }

    private BooleanBuilder nullSafeBuilder(Supplier<BooleanExpression> f) {
        try {
            return new BooleanBuilder(f.get());
        } catch (final IllegalArgumentException | NullPointerException e) {
            return new BooleanBuilder();
        }
    }
}
