package com.woowacourse.naepyeon.repository.teamparticipation;

import com.woowacourse.naepyeon.domain.Team;
import com.woowacourse.naepyeon.domain.TeamParticipation;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface TeamParticipationRepositoryCustom {

    TeamParticipation findByTeamIdAndMemberId(final Long teamId, final Long memberId);

    List<TeamParticipation> findByTeamId(final Long teamId);

    List<Team> findTeamsByMemberId(final Long memberId);

    Page<Team> findTeamsByMemberId(final Long memberId, final Pageable pageRequest);

    String findNicknameByTeamIdAndMemberId(final Long teamId, final Long memberId);

    List<String> findAllNicknamesByTeamId(final Long teamId);

    void updateNickname(final String newNickname, final Long memberId, final Long teamId);
}
