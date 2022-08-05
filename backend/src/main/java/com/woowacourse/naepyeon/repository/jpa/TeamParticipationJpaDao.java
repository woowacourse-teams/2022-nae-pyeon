package com.woowacourse.naepyeon.repository.jpa;

import com.woowacourse.naepyeon.domain.Member;
import com.woowacourse.naepyeon.domain.Team;
import com.woowacourse.naepyeon.domain.TeamParticipation;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TeamParticipationJpaDao extends JpaRepository<TeamParticipation, Long> {

    List<TeamParticipation> findByTeamId(final Long teamId);

    @Query("select t "
            + "from TeamParticipation p "
            + "join p.team t "
            + "where p.member.id = :memberId")
    List<Team> findTeamsByMemberId(@Param("memberId") final Long memberId);

    @Query("select t "
            + "from TeamParticipation p "
            + "join p.team t "
            + "where p.member.id = :memberId")
    Page<Team> findTeamsByMemberIdAndPageRequest(@Param("memberId") final Long memberId, final Pageable pageRequest);

    @Query("select p.member "
            + "from TeamParticipation p "
            + "join Member m on m.id = :memberId "
            + "where p.team.id = :teamId")
    Optional<Member> findMemberByMemberIdAndTeamId(@Param("memberId") final Long memberId,
                                                   @Param("teamId") final Long teamId);

    @Query("select p.nickname "
            + "from TeamParticipation p "
            + "where p.member.id = :memberId and p.team.id = :teamId")
    String findNicknameByMemberIdAndTeamId(@Param("memberId") final Long memberId, @Param("teamId") final Long teamId);

    @Query("select p.nickname "
            + "from TeamParticipation p "
            + "where p.team.id = :teamId")
    List<String> findNicknamesByTeamId(@Param("teamId") final Long teamId);

    @Query("update TeamParticipation p "
            + "set p.nickname = :newNickname "
            + "where p.member.id = :memberId and p.team.id = :teamId")
    @Modifying(clearAutomatically = true)
    void updateNickname(@Param("newNickname") final String newNickname,
                        @Param("memberId") final Long memberId, @Param("teamId") final Long teamId);
}