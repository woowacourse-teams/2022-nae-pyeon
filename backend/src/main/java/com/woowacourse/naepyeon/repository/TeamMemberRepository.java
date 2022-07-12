package com.woowacourse.naepyeon.repository;

import com.woowacourse.naepyeon.domain.TeamMember;
import java.util.List;
import java.util.Optional;

public interface TeamMemberRepository {

    Long save(final TeamMember teamMember);

    Optional<TeamMember> findById(final Long id);

    List<TeamMember> findByTeamId(final Long teamId);
}
