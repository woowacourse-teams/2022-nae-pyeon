package com.woowacourse.naepyeon.repository.jpa;

import com.woowacourse.naepyeon.domain.TeamMember;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamMemberJpaDao extends JpaRepository<TeamMember, Long> {

    List<TeamMember> findByTeamId(final Long teamId);
}