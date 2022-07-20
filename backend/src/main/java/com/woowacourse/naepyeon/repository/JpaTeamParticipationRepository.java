package com.woowacourse.naepyeon.repository;

import com.woowacourse.naepyeon.domain.Team;
import com.woowacourse.naepyeon.domain.TeamParticipation;
import com.woowacourse.naepyeon.exception.DuplicateTeamPaticipateException;
import com.woowacourse.naepyeon.repository.jpa.TeamParticipationJpaDao;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class JpaTeamParticipationRepository implements TeamParticipationRepository {

    private final TeamParticipationJpaDao teamParticipationJpaDao;

    @Override
    public Long save(final TeamParticipation teamParticipation) {
        try {
            return teamParticipationJpaDao.save(teamParticipation)
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
        return teamParticipationJpaDao.findById(id);
    }

    @Override
    public List<TeamParticipation> findByTeamId(final Long teamId) {
        return teamParticipationJpaDao.findByTeamId(teamId);
    }

    @Override
    public List<Team> findTeamsByJoinedMemberId(final Long memberId) {
        return teamParticipationJpaDao.findTeamsByJoinedMemberId(memberId);
    }

    @Override
    public String findNicknameByMemberId(final Long addresseeId, final Long teamId) {
        return teamParticipationJpaDao.findNicknameByMemberId(addresseeId, teamId);
    }

    @Override
    public boolean isJoinedMember(final Long memberId, final Long teamId) {
        final List<Team> teams = teamParticipationJpaDao.findTeamsByJoinedMemberId(memberId);
        return teams.stream()
                .anyMatch(team -> team.getId().equals(teamId));
    }
}
