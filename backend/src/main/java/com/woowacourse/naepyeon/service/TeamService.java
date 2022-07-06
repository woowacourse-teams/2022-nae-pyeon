package com.woowacourse.naepyeon.service;

import com.woowacourse.naepyeon.domain.Member;
import com.woowacourse.naepyeon.domain.Team;
import com.woowacourse.naepyeon.domain.TeamMember;
import com.woowacourse.naepyeon.repository.MemberRepository;
import com.woowacourse.naepyeon.repository.TeamMemberRepository;
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
    private final MemberRepository memberRepository;
    private final TeamMemberRepository teamMemberRepository;

    @Transactional
    public Long save(final String name) {
        final Team team = new Team(name);
        return teamRepository.save(team);
    }

    @Transactional
    public Long joinMember(final Long teamId, final Long memberId) {
        final Team team = teamRepository.findById(teamId)
                .orElseThrow(IllegalArgumentException::new);
        final Member member = memberRepository.findById(memberId)
                .orElseThrow(IllegalArgumentException::new);
        final TeamMember teamMember = new TeamMember(team, member);
        return teamMemberRepository.save(teamMember);
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
