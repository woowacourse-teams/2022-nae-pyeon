package com.woowacourse.naepyeon.repository;

import com.woowacourse.naepyeon.domain.Member;
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
    public Member findMemberByMemberIdAndTeamId(final Long memberId, final Long teamId) {
        return teamParticipationJpaDao.findMemberByMemberIdAndTeamId(memberId, teamId);
    }

    @Override
    public List<TeamParticipation> findByTeamId(final Long teamId) {
        return teamParticipationJpaDao.findByTeamId(teamId);
    }

    @Override
    public List<Team> findTeamsByMemberId(final Long memberId) {
        return teamParticipationJpaDao.findTeamsByMemberId(memberId);
    }

    @Override
    public String findNicknameByMemberId(final Long memberId, final Long teamId) {
        return teamParticipationJpaDao.findNicknameByMemberIdAndTeamId(memberId, teamId);
    }

    @Override
    public List<String> findAllNicknames(final Long teamId) {
        return teamParticipationJpaDao.findNicknamesByTeamId(teamId);
    }

    @Override
    public boolean isJoinedMember(final Long memberId, final Long teamId) {
        final List<Team> teams = teamParticipationJpaDao.findTeamsByMemberId(memberId);
        return teams.stream()
                .anyMatch(team -> team.getId().equals(teamId));
    }

    @Override
    public void updateNickname(final String newNickname, final Long memberId, final Long teamId) {
        teamParticipationJpaDao.updateNickname(newNickname, memberId, teamId);
    }
}
