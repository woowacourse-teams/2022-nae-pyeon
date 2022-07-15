package com.woowacourse.naepyeon.repository.jpa;

import com.woowacourse.naepyeon.domain.TeamParticipation;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamMemberJpaDao extends JpaRepository<TeamParticipation, Long> {

    List<TeamParticipation> findByTeamId(final Long teamId);
}