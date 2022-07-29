package com.woowacourse.naepyeon.repository;

import com.woowacourse.naepyeon.domain.Team;
import com.woowacourse.naepyeon.exception.DuplicateTeamNameException;
import com.woowacourse.naepyeon.exception.NotFoundTeamException;
import com.woowacourse.naepyeon.repository.jpa.TeamJpaDao;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
    public List<Team> findTeamsByContainingTeamName(final String keyword, final Pageable pageRequest) {
        return teamJpaDao.findByNameContaining(keyword, pageRequest);
    }

    @Override
    public List<Team> findAll() {
        return teamJpaDao.findAll();
    }

    @Override
    public void delete(Long teamId) {
        final int affectedRow = teamJpaDao.deleteByIdAndGetAffectedRow(teamId);

        if (affectedRow != 1) {
            throw new NotFoundTeamException(teamId);
        }
    }
}
