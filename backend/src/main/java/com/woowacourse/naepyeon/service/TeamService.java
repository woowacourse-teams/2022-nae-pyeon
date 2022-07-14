package com.woowacourse.naepyeon.service;

import com.woowacourse.naepyeon.controller.dto.TeamRequest;
import com.woowacourse.naepyeon.domain.Member;
import com.woowacourse.naepyeon.domain.Team;
import com.woowacourse.naepyeon.domain.TeamMember;
import com.woowacourse.naepyeon.exception.NotFoundMemberException;
import com.woowacourse.naepyeon.exception.NotFoundTeamException;
import com.woowacourse.naepyeon.repository.MemberRepository;
import com.woowacourse.naepyeon.repository.TeamMemberRepository;
import com.woowacourse.naepyeon.repository.TeamRepository;
import com.woowacourse.naepyeon.service.dto.TeamResponseDto;
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
    public Long save(final TeamRequest teamRequest) {
        final Team team = new Team(
                teamRequest.getName(),
                teamRequest.getDescription(),
                teamRequest.getEmoji(),
                teamRequest.getColor()
        );
        return teamRepository.save(team);
    }

    @Transactional
    public Long joinMember(final Long teamId, final Long memberId) {
        final Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new NotFoundTeamException(teamId));
        final Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new NotFoundMemberException(memberId));
        final TeamMember teamMember = new TeamMember(team, member);
        return teamMemberRepository.save(teamMember);
    }

    public TeamResponseDto findById(final Long teamId) {
        final Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new NotFoundTeamException(teamId));
        return new TeamResponseDto(
                teamId,
                team.getName(),
                team.getDescription(),
                team.getEmoji(),
                team.getColor()
        );
    }

    @Transactional
    public void updateName(final Long teamId, final String name) {
        final Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new NotFoundTeamException(teamId));
        team.changeName(name);
    }

    @Transactional
    public void delete(final Long teamId) {
        teamRepository.delete(teamId);
    }
}
