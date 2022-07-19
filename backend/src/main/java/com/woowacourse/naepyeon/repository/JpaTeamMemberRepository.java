package com.woowacourse.naepyeon.repository;

import com.woowacourse.naepyeon.domain.Member;
import com.woowacourse.naepyeon.domain.Team;
import com.woowacourse.naepyeon.domain.TeamParticipation;
import com.woowacourse.naepyeon.exception.DuplicateTeamPaticipateException;
import com.woowacourse.naepyeon.repository.jpa.TeamMemberJpaDao;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class JpaTeamMemberRepository implements TeamMemberRepository {

    private final TeamMemberJpaDao teamMemberJpaDao;

    @Override
    public Long save(final TeamParticipation teamParticipation) {
        try {
            return teamMemberJpaDao.save(teamParticipation)
                    .getId();
        } catch (final DataIntegrityViolationException e) {
            throw new DuplicateTeamPaticipateException(
                    teamParticipation.getTeam().getId(),
                    teamParticipation.getMember().getId()
            );
        }
    }

    @Override
    public Optional<TeamParticipation> findById(final Long id) {
        return teamMemberJpaDao.findById(id);
    }

    @Override
    public List<TeamParticipation> findByTeamId(final Long teamId) {
        return teamMemberJpaDao.findByTeamId(teamId);
    }

    @Override
    public List<Team> findTeamsByJoinedMemberId(final Long memberId) {
        return teamMemberJpaDao.findTeamsByJoinedMemberId(memberId);
    }

    @Override
    public List<TeamParticipation> findMembersByTeamId(final Long teamId) {
        return teamMemberJpaDao.findMembersByTeamId(teamId);
    }
}
