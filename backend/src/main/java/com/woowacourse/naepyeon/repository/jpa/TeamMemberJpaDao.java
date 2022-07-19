package com.woowacourse.naepyeon.repository.jpa;

import com.woowacourse.naepyeon.domain.Team;
import com.woowacourse.naepyeon.domain.TeamParticipation;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TeamMemberJpaDao extends JpaRepository<TeamParticipation, Long> {

    List<TeamParticipation> findByTeamId(final Long teamId);

    @Query("select p.team "
            + "from TeamParticipation p "
            + "where p.member.id = :memberId")
    List<Team> findTeamsByJoinedMemberId(@Param("memberId") final Long memberId);

    @Query("select p "
            + "from TeamParticipation p "
            + "where p.team.id = :teamId")
    List<TeamParticipation> findMembersByTeamId(@Param("teamId") final Long teamId);

    @Query("select count(p) "
            + "from TeamParticipation p "
            + "where p.member.id = :memberId and p.team.id = :teamId")
    int isJoinedMember(final Long memberId, final Long teamId);
}