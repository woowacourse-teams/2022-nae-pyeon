package com.woowacourse.naepyeon.service;

import com.woowacourse.naepyeon.controller.dto.TeamRequest;
import com.woowacourse.naepyeon.domain.Member;
import com.woowacourse.naepyeon.domain.Team;
import com.woowacourse.naepyeon.domain.TeamParticipation;
import com.woowacourse.naepyeon.exception.DuplicateNicknameException;
import com.woowacourse.naepyeon.exception.NotFoundMemberException;
import com.woowacourse.naepyeon.exception.NotFoundTeamException;
import com.woowacourse.naepyeon.exception.UncertificationTeamMemberException;
import com.woowacourse.naepyeon.repository.MemberRepository;
import com.woowacourse.naepyeon.repository.TeamParticipationRepository;
import com.woowacourse.naepyeon.repository.TeamRepository;
import com.woowacourse.naepyeon.service.dto.AllTeamsResponseDto;
import com.woowacourse.naepyeon.service.dto.JoinedMemberResponseDto;
import com.woowacourse.naepyeon.service.dto.JoinedMembersResponseDto;
import com.woowacourse.naepyeon.service.dto.TeamMemberResponseDto;
import com.woowacourse.naepyeon.service.dto.TeamResponseDto;
import com.woowacourse.naepyeon.service.dto.TeamsResponseDto;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
        teamParticipationRepository.save(new TeamParticipation(team, owner, teamRequest.getNickname()));
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

    public TeamsResponseDto findTeamsByContainingTeamName(final String keyword, final Long memberId,
                                                          final Pageable pageRequest) {
        final Page<Team> teams = teamRepository.findTeamsByContainingTeamName(keyword, pageRequest);
        final List<Team> joinedTeams = teamParticipationRepository.findTeamsByMemberId(memberId);

        final List<TeamResponseDto> teamResponseDtos = teams.stream()
                .map(team -> TeamResponseDto.of(team, joinedTeams.contains(team)))
                .collect(Collectors.toList());

        return new TeamsResponseDto(
                teams.getTotalElements(),
                teams.getNumber(),
                teamResponseDtos
        );
    }

    public AllTeamsResponseDto findAll(final Long memberId) {
        final List<Team> teams = teamRepository.findAll();
        final List<Team> joinedTeams = teamParticipationRepository.findTeamsByMemberId(memberId);

        final List<TeamResponseDto> teamResponseDtos = teams.stream()
                .map(team -> TeamResponseDto.of(team, joinedTeams.contains(team)))
                .collect(Collectors.toList());

        return new AllTeamsResponseDto(teamResponseDtos);
    }

    public TeamsResponseDto findByJoinedMemberId(final Long memberId, final Pageable pageRequest) {
        final Page<Team> teams = teamParticipationRepository.findTeamsByMemberIdAndPageRequest(memberId, pageRequest);
        final List<TeamResponseDto> teamResponseDtos = teams.stream()
                .map(team -> TeamResponseDto.of(team, true))
                .collect(Collectors.toList());

        return new TeamsResponseDto(
                teams.getTotalElements(),
                teams.getNumber(),
                teamResponseDtos
        );
    }

    public JoinedMembersResponseDto findJoinedMembers(final Long teamId) {
        final List<TeamParticipation> participations = teamParticipationRepository.findByTeamId(teamId);

        final List<JoinedMemberResponseDto> joinedMembers = participations.stream()
                .map(
                        participation -> new JoinedMemberResponseDto(
                                participation.findMemberId(),
                                participation.getNickname()
                        )
                ).collect(Collectors.toList());

        return new JoinedMembersResponseDto(joinedMembers);
    }

    public TeamMemberResponseDto findMyInfoInTeam(final Long teamId, final Long memberId) {
        checkMemberNotIncludedTeam(teamId, memberId);
        final String nickname = teamParticipationRepository.findNicknameByMemberIdAndTeamId(memberId, teamId);
        return new TeamMemberResponseDto(nickname);
    }

    @Transactional
    public void updateMyInfo(final Long teamId, final Long memberId, final String newNickname) {
        checkMemberNotIncludedTeam(teamId, memberId);
        if (teamParticipationRepository.findAllNicknamesByTeamId(teamId).contains(newNickname)) {
            throw new DuplicateNicknameException(newNickname);
        }
        teamParticipationRepository.updateNickname(newNickname, memberId, teamId);
    }

    private void checkMemberNotIncludedTeam(final Long teamId, final Long memberId) {
        if (!isJoinedMember(memberId, teamId)) {
            throw new UncertificationTeamMemberException(teamId, memberId);
        }
    }

    public boolean isJoinedMember(final Long memberId, final Long teamId) {
        if (teamRepository.findById(teamId).isEmpty()) {
            throw new NotFoundTeamException(teamId);
        }
        return teamParticipationRepository.isJoinedMember(memberId, teamId);
    }
}
