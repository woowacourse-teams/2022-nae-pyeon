package com.woowacourse.naepyeon.repository.rollingpaper;

import static com.woowacourse.naepyeon.domain.QTeamParticipation.teamParticipation;
import static com.woowacourse.naepyeon.domain.rollingpaper.QRollingpaper.rollingpaper;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.woowacourse.naepyeon.domain.rollingpaper.Rollingpaper;
import java.util.List;
import java.util.Optional;
import java.util.function.Supplier;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;

@RequiredArgsConstructor
public class RollingpaperRepositoryImpl implements RollingpaperRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    @Override
    public Page<Rollingpaper> findByAddresseeId(final Long addresseeId, final Pageable pageRequest) {
        final List<Rollingpaper> content = queryFactory
                .selectFrom(rollingpaper)
                .where(isAddresseeIdEq(addresseeId))
                .offset(pageRequest.getOffset())
                .limit(pageRequest.getPageSize())
                .fetch();

        final JPAQuery<Long> countQuery = queryFactory
                .select(rollingpaper.count())
                .from(rollingpaper)
                .where(isAddresseeIdEq(addresseeId));

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
    public Optional<String> findAddresseeNicknameByMemberRollingpaperId(final Long rollingpaperId) {
        return Optional.ofNullable(queryFactory
                .select(teamParticipation.nickname)
                .from(rollingpaper)
                .innerJoin(rollingpaper.teamParticipation, teamParticipation)
                .where(rollingpaper.id.eq(rollingpaperId))
                .fetchOne());
    }

    private BooleanBuilder isAddresseeIdEq(final Long addresseeId) {
        return nullSafeBuilder(() -> rollingpaper.addressee.id.eq(addresseeId));
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
