package com.woowacourse.naepyeon.repository.message;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.ConstructorExpression;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.woowacourse.naepyeon.domain.message.Message;
import com.woowacourse.naepyeon.domain.rollingpaper.Recipient;
import com.woowacourse.naepyeon.service.dto.WrittenMessageResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;

import java.util.List;
import java.util.function.Supplier;

import static com.woowacourse.naepyeon.domain.QTeam.team;
import static com.woowacourse.naepyeon.domain.QTeamParticipation.teamParticipation;
import static com.woowacourse.naepyeon.domain.message.QMessage.message;
import static com.woowacourse.naepyeon.domain.rollingpaper.QRollingpaper.rollingpaper;

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
                .from(message)
                .innerJoin(message.rollingpaper, rollingpaper)
                .innerJoin(rollingpaper.team, team)
                .leftJoin(rollingpaper.teamParticipation, teamParticipation)
                .where(isAuthorIdEq(authorId))
                .orderBy(message.createdDate.desc())
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
                rollingpaper.id,
                rollingpaper.title,
                team.id,
                team.name,
                message.content,
                message.color,
                new CaseBuilder()
                        .when(rollingpaper.recipient.eq(Recipient.MEMBER))
                        .then(teamParticipation.nickname)
                        .when(rollingpaper.recipient.eq(Recipient.TEAM))
                        .then(team.name)
                        .otherwise("")
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
