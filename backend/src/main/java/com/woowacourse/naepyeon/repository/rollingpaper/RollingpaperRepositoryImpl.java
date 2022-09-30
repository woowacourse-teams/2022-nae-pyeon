package com.woowacourse.naepyeon.repository.rollingpaper;

import static com.woowacourse.naepyeon.domain.rollingpaper.QRollingpaper.rollingpaper;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.woowacourse.naepyeon.domain.rollingpaper.Rollingpaper;
import java.util.List;
import java.util.function.Supplier;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;

@RequiredArgsConstructor
public class RollingpaperRepositoryImpl implements RollingpaperRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    @Override
    public Page<Rollingpaper> findByMemberId(final Long memberId, final Pageable pageRequest) {
        final List<Rollingpaper> content = queryFactory
                .selectFrom(rollingpaper)
                .where(isMemberIdEq(memberId))
                .offset(pageRequest.getOffset())
                .limit(pageRequest.getPageSize())
                .fetch();

        final JPAQuery<Long> countQuery = queryFactory
                .select(rollingpaper.count())
                .from(rollingpaper)
                .where(isMemberIdEq(memberId));

        return PageableExecutionUtils.getPage(content, pageRequest, countQuery::fetchOne);
    }

    @Override
    public List<Rollingpaper> findByTeamId(final Long teamId) {
        return queryFactory
                .selectFrom(rollingpaper)
                .where(isTeamIdEq(teamId))
                .fetch();
    }

    @Override
    public String findAddresseeNicknameByRollingpaperId(final Long rollingpaperId) {
        return queryFactory
                .select(rollingpaper.teamParticipation.nickname)
                .from(rollingpaper)
                .where(rollingpaper.id.eq(rollingpaperId))
                .fetchOne();
    }

    private BooleanBuilder isMemberIdEq(final Long memberId) {
        return nullSafeBuilder(() -> rollingpaper.member.id.eq(memberId));
    }

    private BooleanBuilder isTeamIdEq(final Long teamId) {
        return nullSafeBuilder(() -> rollingpaper.team.id.eq(teamId));
    }

    private BooleanBuilder nullSafeBuilder(Supplier<BooleanExpression> f) {
        try {
            return new BooleanBuilder(f.get());
        } catch (final IllegalArgumentException | NullPointerException e) {
            return new BooleanBuilder();
        }
    }
}
