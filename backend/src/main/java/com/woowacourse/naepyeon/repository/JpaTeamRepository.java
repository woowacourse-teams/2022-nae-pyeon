package com.woowacourse.naepyeon.repository;

import com.woowacourse.naepyeon.domain.Team;
import com.woowacourse.naepyeon.repository.jpa.TeamJpaDao;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class JpaTeamRepository implements TeamRepository {

    private final TeamJpaDao teamJpaDao;

    @Override
    public Long save(Team team) {
        return teamJpaDao.save(team).getId();
    }

    @Override
    public Optional<Team> findById(Long teamId) {
        return teamJpaDao.findById(teamId);
    }

    @Override
    public void delete(Long teamId) {
        teamJpaDao.deleteById(teamId);
    }
}
