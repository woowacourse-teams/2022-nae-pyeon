package com.woowacourse.naepyeon.service;

import com.woowacourse.naepyeon.controller.dto.TeamRequest;
import com.woowacourse.naepyeon.domain.Member;
import com.woowacourse.naepyeon.domain.Team;
import com.woowacourse.naepyeon.domain.TeamParticipation;
import com.woowacourse.naepyeon.exception.NotFoundMemberException;
import com.woowacourse.naepyeon.exception.NotFoundTeamException;
import com.woowacourse.naepyeon.repository.MemberRepository;
import com.woowacourse.naepyeon.repository.TeamParticipationRepository;
import com.woowacourse.naepyeon.repository.TeamRepository;
import com.woowacourse.naepyeon.service.dto.JoinedMemberResponseDto;
import com.woowacourse.naepyeon.service.dto.JoinedMembersResponseDto;
import com.woowacourse.naepyeon.service.dto.TeamResponseDto;
import com.woowacourse.naepyeon.service.dto.TeamsResponseDto;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TeamService {

    private final TeamRepository teamRepository;
    private final MemberRepository memberRepository;
    private final TeamParticipationRepository teamParticipationRepository;

    @Transactional
    public Long save(final TeamRequest teamRequest, final Long memberId) {
        final Team team = new Team(
                teamRequest.getName(),
                teamRequest.getDescription(),
                teamRequest.getEmoji(),
                teamRequest.getColor()
        );
        final Long createdTeamId = teamRepository.save(team);
        final Member owner = memberRepository.findById(memberId)
                .orElseThrow(() -> new NotFoundMemberException(memberId));
        teamParticipationRepository.save(new TeamParticipation(team, owner, "마스터"));
        return createdTeamId;
    }

    @Transactional
    public Long joinMember(final Long teamId, final Long memberId, final String nickname) {
        final Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new NotFoundTeamException(teamId));
        final Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new NotFoundMemberException(memberId));
        final TeamParticipation teamParticipation = new TeamParticipation(team, member, nickname);
        return teamParticipationRepository.save(teamParticipation);
    }

    public TeamResponseDto findById(final Long teamId, final Long memberId) {
        final Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new NotFoundTeamException(teamId));
        return TeamResponseDto.of(team, teamParticipationRepository.isJoinedMember(memberId, teamId));
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

    public TeamsResponseDto findAll(final Long memberId) {
        final List<Team> teams = teamRepository.findAll();
        final List<Team> joinedTeams = teamParticipationRepository.findTeamsByJoinedMemberId(memberId);

        final List<TeamResponseDto> teamResponseDtos = teams.stream()
                .map(team -> TeamResponseDto.of(team, joinedTeams.contains(team)))
                .collect(Collectors.toList());

        return new TeamsResponseDto(teamResponseDtos);
    }

    public TeamsResponseDto findByJoinedMemberId(final Long memberId) {
        final List<Team> teams = teamParticipationRepository.findTeamsByJoinedMemberId(memberId);
        final List<TeamResponseDto> teamResponseDtos = teams.stream()
                .map(team -> TeamResponseDto.of(team, true))
                .collect(Collectors.toList());

        return new TeamsResponseDto(teamResponseDtos);
    }

    public JoinedMembersResponseDto findJoinedMembers(final Long teamId) {
        final List<TeamParticipation> participations = teamParticipationRepository.findMembersByTeamId(teamId);

        final List<JoinedMemberResponseDto> joinedMembers = participations.stream()
                .map(
                        participation -> new JoinedMemberResponseDto(
                                participation.getMember().getId(),
                                participation.getNickname()
                        )
                ).collect(Collectors.toList());

        return new JoinedMembersResponseDto(joinedMembers);
    }

    public boolean isJoinedMember(final Long memberId, final Long teamId) {
        if (teamRepository.findById(teamId).isEmpty()) {
            throw new NotFoundTeamException(teamId);
        }
        return teamParticipationRepository.isJoinedMember(memberId, teamId);
    }
}
