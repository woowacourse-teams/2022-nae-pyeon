package com.woowacourse.naepyeon.repository.teamparticipation;

import com.woowacourse.naepyeon.domain.TeamParticipation;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamParticipationRepository extends
        JpaRepository<TeamParticipation, Long>, TeamParticipationRepositoryCustom {

    Optional<TeamParticipation> findById(final Long id);
}
