package com.woowacourse.naepyeon.repository.teamparticipation;

import com.woowacourse.naepyeon.domain.Team;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface TeamParticipationRepositoryCustom {

    List<Team> findTeamsByMemberId(final Long memberId);

    Page<Team> findTeamsByMemberId(final Long memberId, final Pageable pageRequest);

    String findNicknameByMemberIdAndTeamId(final Long memberId, final Long teamId);

    List<String> findAllNicknamesByTeamId(final Long teamId);

    void updateNickname(final String newNickname, final Long memberId, final Long teamId);
}
