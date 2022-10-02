package com.woowacourse.naepyeon.service;

import com.woowacourse.naepyeon.domain.Member;
import com.woowacourse.naepyeon.domain.Team;
import com.woowacourse.naepyeon.domain.TeamParticipation;
import com.woowacourse.naepyeon.domain.invitecode.InviteCode;
import com.woowacourse.naepyeon.exception.DuplicateNicknameException;
import com.woowacourse.naepyeon.exception.DuplicateTeamNameException;
import com.woowacourse.naepyeon.exception.DuplicateTeamPaticipateException;
import com.woowacourse.naepyeon.exception.InviteCodeExpiredException;
import com.woowacourse.naepyeon.exception.NotFoundMemberException;
import com.woowacourse.naepyeon.exception.NotFoundTeamException;
import com.woowacourse.naepyeon.exception.UncertificationTeamMemberException;
import com.woowacourse.naepyeon.repository.invitecode.InviteCodeRepository;
import com.woowacourse.naepyeon.repository.member.MemberRepository;
import com.woowacourse.naepyeon.repository.team.TeamRepository;
import com.woowacourse.naepyeon.repository.teamparticipation.TeamParticipationRepository;
import com.woowacourse.naepyeon.service.dto.AllTeamsResponseDto;
import com.woowacourse.naepyeon.service.dto.JoinedMemberResponseDto;
import com.woowacourse.naepyeon.service.dto.JoinedMembersResponseDto;
import com.woowacourse.naepyeon.service.dto.TeamMemberResponseDto;
import com.woowacourse.naepyeon.service.dto.TeamRequestDto;
import com.woowacourse.naepyeon.service.dto.TeamResponseDto;
import com.woowacourse.naepyeon.service.dto.TeamsResponseDto;
import com.woowacourse.naepyeon.support.SecureRandomStringUtils;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TeamService {

    private final TeamRepository teamRepository;
    private final MemberRepository memberRepository;
    private final TeamParticipationRepository teamParticipationRepository;
    private final InviteCodeRepository inviteCodeRepository;

    @Transactional
    public Long save(final TeamRequestDto teamRequestDto, final Long memberId) {
        validateDuplicateTeamName(teamRequestDto);
        final Team team = new Team(
                teamRequestDto.getName(),
                teamRequestDto.getDescription(),
                teamRequestDto.getEmoji(),
                teamRequestDto.getColor(),
                teamRequestDto.isSecret()
        );
        final Long createdTeamId = teamRepository.save(team)
                .getId();
        final Member owner = memberRepository.findById(memberId)
                .orElseThrow(() -> new NotFoundMemberException(memberId));
        teamParticipationRepository.save(new TeamParticipation(team, owner, teamRequestDto.getNickname()));
        return createdTeamId;
    }

    private void validateDuplicateTeamName(final TeamRequestDto teamRequestDto) {
        if (teamRepository.existsByName(teamRequestDto.getName())) {
            throw new DuplicateTeamNameException(teamRequestDto.getName());
        }
    }

    @Transactional
    public Long joinMember(final Long teamId, final Long memberId, final String nickname) {
        validateDuplicateJoined(teamId, memberId);
        validateDuplicateNickname(teamId, nickname);
        final Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new NotFoundTeamException(teamId));
        final Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new NotFoundMemberException(memberId));
        final TeamParticipation teamParticipation = new TeamParticipation(team, member, nickname);
        return teamParticipationRepository.save(teamParticipation)
                .getId();
    }

    private void validateDuplicateJoined(final Long teamId, final Long memberId) {
        if (isJoinedMember(memberId, teamId)) {
            throw new DuplicateTeamPaticipateException(teamId, memberId);
        }
    }

    public TeamResponseDto findById(final Long teamId, final Long memberId) {
        final Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new NotFoundTeamException(teamId));
        return TeamResponseDto.of(team, isJoinedMember(memberId, teamId), team.isSecret());
    }

    @Transactional
    public void updateName(final Long teamId, final String name) {
        final Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new NotFoundTeamException(teamId));
        team.changeName(name);
    }

    @Transactional
    public void delete(final Long teamId) {
        teamRepository.deleteById(teamId);
    }

    public TeamsResponseDto findTeamsByContainingTeamName(final String keyword, final Long memberId,
                                                          final Integer page, final int count) {
        final Pageable pageRequest = PageRequest.of(page, count);
        final Page<Team> teams = teamRepository.findTeamsByNameContaining(keyword, pageRequest);
        final List<Team> joinedTeams = teamParticipationRepository.findTeamsByMemberId(memberId);

        final List<TeamResponseDto> teamResponseDtos = teams.stream()
                .map(team -> TeamResponseDto.of(team, joinedTeams.contains(team), team.isSecret()))
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
                .map(team -> TeamResponseDto.of(team, joinedTeams.contains(team), team.isSecret()))
                .collect(Collectors.toList());

        return new AllTeamsResponseDto(teamResponseDtos);
    }

    public TeamsResponseDto findByJoinedMemberId(final Long memberId, final Integer page, final int count) {
        final Pageable pageRequest = PageRequest.of(page, count);
        final Page<Team> teams = teamParticipationRepository.findTeamsByMemberId(memberId, pageRequest);
        final List<TeamResponseDto> teamResponseDtos = teams.stream()
                .map(team -> TeamResponseDto.of(team, true, team.isSecret()))
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
        validateDuplicateNickname(teamId, newNickname);
        teamParticipationRepository.updateNickname(newNickname, memberId, teamId);
    }

    private void validateDuplicateNickname(final Long teamId, final String nickname) {
        if (teamParticipationRepository.findAllNicknamesByTeamId(teamId).contains(nickname)) {
            throw new DuplicateNicknameException(nickname);
        }
    }

    private void checkMemberNotIncludedTeam(final Long teamId, final Long memberId) {
        if (!isJoinedMember(memberId, teamId)) {
            throw new UncertificationTeamMemberException(teamId, memberId);
        }
    }

    public boolean isJoinedMember(final Long memberId, final Long teamId) {
        validateExistTeam(teamId);
        final List<Team> teams = teamParticipationRepository.findTeamsByMemberId(memberId);
        return teams.stream()
                .anyMatch(team -> team.getId().equals(teamId));
    }

    @Transactional
    public String createInviteCode(final Long teamId) {
        final Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new NotFoundTeamException(teamId));
        final InviteCode inviteCode = team.createInviteCode(
                () -> SecureRandomStringUtils.createRandomAlphanumericSecure(10)
        );
        try {
            return inviteCodeRepository.save(inviteCode)
                    .getCode();
        } catch (final DataIntegrityViolationException e) {
            log.debug("초대 코드 중복 키 발생, 재시도");
            return createInviteCode(teamId);
        }
    }

    private void validateExistTeam(final Long teamId) {
        if (teamRepository.findById(teamId).isEmpty()) {
            throw new NotFoundTeamException(teamId);
        }
    }

    @Transactional
    public void deleteExpiredInviteCodes() {
        inviteCodeRepository.deleteExpired(LocalDateTime.now());
    }

    public TeamResponseDto findTeamByInviteCode(final String code, final Long memberId) {
        final InviteCode inviteCode = inviteCodeRepository.findByCode(code)
                .filter(InviteCode::isAvailable)
                .orElseThrow(InviteCodeExpiredException::new);
        final Team team = teamRepository.findById(inviteCode.getTeamId())
                .orElseThrow(() -> new NotFoundTeamException(inviteCode.getTeamId()));
        return TeamResponseDto.of(team, isJoinedMember(memberId, inviteCode.getTeamId()), team.isSecret());
    }

    @Transactional
    public Long inviteJoin(final String code, final Long memberId, final String nickname) {
        final InviteCode inviteCode = inviteCodeRepository.findByCode(code)
                .filter(InviteCode::isAvailable)
                .orElseThrow(InviteCodeExpiredException::new);

        return joinMember(inviteCode.getTeamId(), memberId, nickname);
    }
}
