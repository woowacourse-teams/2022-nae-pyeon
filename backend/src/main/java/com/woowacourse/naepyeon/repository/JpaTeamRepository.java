package com.woowacourse.naepyeon.repository;

import com.woowacourse.naepyeon.domain.Team;
import com.woowacourse.naepyeon.exception.DuplicateTeamNameException;
import com.woowacourse.naepyeon.repository.jpa.TeamJpaDao;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class JpaTeamRepository implements TeamRepository {

    private final TeamJpaDao teamJpaDao;

    @Override
    public Long save(Team team) {
        try {
            return teamJpaDao.save(team).getId();
        } catch (final DataIntegrityViolationException e) {
            throw new DuplicateTeamNameException(team.getName());
        }
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
