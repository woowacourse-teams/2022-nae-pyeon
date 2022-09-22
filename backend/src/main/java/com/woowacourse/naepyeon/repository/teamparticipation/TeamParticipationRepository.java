package com.woowacourse.naepyeon.repository.teamparticipation;

import com.woowacourse.naepyeon.domain.TeamParticipation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamParticipationRepository extends
        JpaRepository<TeamParticipation, Long>, TeamParticipationRepositoryCustom {

}
