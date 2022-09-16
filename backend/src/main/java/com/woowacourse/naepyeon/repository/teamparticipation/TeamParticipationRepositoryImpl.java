package com.woowacourse.naepyeon.repository.teamparticipation;

import static com.woowacourse.naepyeon.domain.QTeam.team;
import static com.woowacourse.naepyeon.domain.QTeamParticipation.teamParticipation;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.woowacourse.naepyeon.domain.Team;
import java.util.List;
import java.util.function.Supplier;
import javax.persistence.EntityManager;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;

public class TeamParticipationRepositoryImpl implements TeamParticipationRepositoryCustom {

    private final JPAQueryFactory queryFactory;
    private final EntityManager em;

    public TeamParticipationRepositoryImpl(final EntityManager em) {
        this.em = em;
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public List<Team> findTeamsByMemberId(final Long memberId) {
        return queryFactory
                .select(team)
                .from(teamParticipation)
                .where(isMemberIdEq(memberId))
                .fetch();
    }

    @Override
    public Page<Team> findTeamsByMemberId(final Long memberId, final Pageable pageRequest) {
        final List<Team> content = queryFactory
                .select(team)
                .from(teamParticipation)
                .where(isMemberIdEq(memberId))
                .offset(pageRequest.getOffset())
                .limit(pageRequest.getPageSize())
                .fetch();

        final JPAQuery<Long> countQuery = queryFactory
                .select(team.count())
                .from(teamParticipation)
                .where(isMemberIdEq(memberId));

        return PageableExecutionUtils.getPage(content, pageRequest, countQuery::fetchOne);
    }


    @Override
    public String findNicknameByMemberIdAndTeamId(final Long memberId, final Long teamId) {
        return queryFactory
                .select(teamParticipation.nickname)
                .from(teamParticipation)
                .where(isMemberIdEq(memberId)
                        .and(isTeamIdEq(teamId)))
                .fetchOne();
    }

    @Override
    public List<String> findAllNicknamesByTeamId(final Long teamId) {
        return queryFactory
                .select(teamParticipation.nickname)
                .from(teamParticipation)
                .where(isTeamIdEq(teamId))
                .fetch();
    }

    @Override
    public void updateNickname(final String newNickname, final Long memberId, final Long teamId) {
        queryFactory
                .update(teamParticipation)
                .set(teamParticipation.nickname, newNickname)
                .where(isMemberIdEq(memberId)
                        .and(isTeamIdEq(teamId)))
                .execute();

        em.clear();
    }

    private BooleanBuilder isMemberIdEq(final Long memberId) {
        return nullSafeBuilder(() -> teamParticipation.member.id.eq(memberId));
    }

    private BooleanBuilder isTeamIdEq(final Long teamId) {
        return nullSafeBuilder(() -> teamParticipation.team.id.eq(teamId));
    }

    private BooleanBuilder nullSafeBuilder(Supplier<BooleanExpression> f) {
        try {
            return new BooleanBuilder(f.get());
        } catch (final IllegalArgumentException | NullPointerException e) {
            return new BooleanBuilder();
        }
    }
}
