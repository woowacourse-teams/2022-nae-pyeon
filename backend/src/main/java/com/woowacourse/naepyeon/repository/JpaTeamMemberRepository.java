package com.woowacourse.naepyeon.repository;

import com.woowacourse.naepyeon.domain.TeamParticipation;
import com.woowacourse.naepyeon.repository.jpa.TeamMemberJpaDao;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class JpaTeamMemberRepository implements TeamMemberRepository {

    private final TeamMemberJpaDao teamMemberJpaDao;

    @Override
    public Long save(final TeamParticipation teamParticipation) {
        return teamMemberJpaDao.save(teamParticipation)
                .getId();
    }

    @Override
    public Optional<TeamParticipation> findById(final Long id) {
        return teamMemberJpaDao.findById(id);
    }

    @Override
    public List<TeamParticipation> findByTeamId(final Long teamId) {
        return teamMemberJpaDao.findByTeamId(teamId);
    }
}
