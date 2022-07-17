package com.woowacourse.naepyeon.repository;

import com.woowacourse.naepyeon.domain.Team;
import com.woowacourse.naepyeon.domain.TeamParticipation;
import java.util.List;
import java.util.Optional;

public interface TeamMemberRepository {

    Long save(final TeamParticipation teamParticipation);

    Optional<TeamParticipation> findById(final Long id);

    List<TeamParticipation> findByTeamId(final Long teamId);

    List<Team> findTeamsByJoinedMemberId(final Long memberId);
}
