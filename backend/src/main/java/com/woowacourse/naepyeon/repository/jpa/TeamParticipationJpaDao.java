package com.woowacourse.naepyeon.repository.jpa;

import com.woowacourse.naepyeon.domain.Team;
import com.woowacourse.naepyeon.domain.TeamParticipation;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TeamParticipationJpaDao extends JpaRepository<TeamParticipation, Long> {

    List<TeamParticipation> findByTeamId(final Long teamId);

    @Query("select p.team "
            + "from TeamParticipation p "
            + "where p.member.id = :memberId")
    List<Team> findTeamsByMemberId(@Param("memberId") final Long memberId);

    @Query("select p.nickname "
            + "from TeamParticipation p "
            + "where p.member.id = :memberId and p.team.id = :teamId")
    String findNicknameByMemberIdAndTeamId(@Param("memberId") final Long memberId, @Param("teamId") final Long teamId);
}