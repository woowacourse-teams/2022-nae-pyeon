package com.woowacourse.naepyeon.service;

import com.woowacourse.naepyeon.domain.Team;
import com.woowacourse.naepyeon.repository.TeamRepository;
import com.woowacourse.naepyeon.service.dto.TeamResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TeamService {

    private final TeamRepository teamRepository;

    @Transactional
    public Long save(final String name) {
        final Team team = new Team(name);
        return teamRepository.save(team);
    }

    public TeamResponse findById(final Long teamId) {
        final Team team = teamRepository.findById(teamId)
                .orElseThrow(IllegalArgumentException::new);
        return new TeamResponse(team);
    }

    @Transactional
    public void updateName(Long teamId, String name) {
        final Team team = teamRepository.findById(teamId)
                .orElseThrow(IllegalArgumentException::new);
        team.changeName(name);
    }

    @Transactional
    public void delete(Long teamId) {
        teamRepository.delete(teamId);
    }
}
