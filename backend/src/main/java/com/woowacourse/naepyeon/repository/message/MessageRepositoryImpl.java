package com.woowacourse.naepyeon.repository.message;

import static com.woowacourse.naepyeon.domain.QMessage.message;
import static com.woowacourse.naepyeon.domain.QTeam.team;
import static com.woowacourse.naepyeon.domain.QTeamParticipation.teamParticipation;
import static com.woowacourse.naepyeon.domain.rollingpaper.QRollingpaper.rollingpaper;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.ConstructorExpression;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.woowacourse.naepyeon.domain.Message;
import com.woowacourse.naepyeon.domain.rollingpaper.Recipient;
import com.woowacourse.naepyeon.service.dto.WrittenMessageResponseDto;
import java.util.List;
import java.util.function.Supplier;
import javax.persistence.EntityManager;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

public class MessageRepositoryImpl implements MessageRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    public MessageRepositoryImpl(final EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public List<Message> findAllByRollingpaperId(final Long rollingpaperId) {
        return queryFactory
                .selectFrom(message)
                .where(isRollingpaperIdEq(rollingpaperId))
                .fetch();
    }

    @Override
    public Page<WrittenMessageResponseDto> findAllByAuthorId(final Long authorId, final Pageable pageRequest) {
        final JPAQuery<WrittenMessageResponseDto> query =
                getQueryWhenFindAllByAuthorId(authorId);

        final List<WrittenMessageResponseDto> content = query
                .offset(pageRequest.getOffset())
                .limit(pageRequest.getPageSize())
                .fetch();

        final long total = query
                .stream()
                .count();

        return new PageImpl<>(content, pageRequest, total);
    }

    private JPAQuery<WrittenMessageResponseDto> getQueryWhenFindAllByAuthorId(final Long authorId) {
        return queryFactory
                .select(makeProjections())
                .from(message)
                .leftJoin(message.rollingpaper, rollingpaper)
                .leftJoin(rollingpaper.team, team)
                .join(teamParticipation).on(message.rollingpaper.team.id.eq(teamParticipation.team.id))
                .where(isAuthorIdEq(authorId)
                        .and(message.rollingpaper.id.eq(rollingpaper.id))
                        .and(rollingpaper.team.id.eq(team.id))
                        .and(message.rollingpaper.member.id.isNull()
                                .or(message.rollingpaper.member.id.eq(teamParticipation.member.id))
                        )
                )
                .distinct();
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
                new CaseBuilder()
                        .when(message.rollingpaper.recipient.eq(Recipient.MEMBER))
                        .then(teamParticipation.nickname)
                        .when(message.rollingpaper.recipient.eq(Recipient.TEAM))
                        .then(message.rollingpaper.team.name)
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
