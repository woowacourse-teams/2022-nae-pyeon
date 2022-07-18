package com.woowacourse.naepyeon.service;

import com.woowacourse.naepyeon.domain.Member;
import com.woowacourse.naepyeon.domain.Rollingpaper;
import com.woowacourse.naepyeon.domain.Team;
import com.woowacourse.naepyeon.exception.NotFoundMemberException;
import com.woowacourse.naepyeon.exception.NotFoundRollingpaperException;
import com.woowacourse.naepyeon.exception.NotFoundTeamException;
import com.woowacourse.naepyeon.exception.NotFoundTeamMemberException;
import com.woowacourse.naepyeon.exception.UncertificationTeamMemberException;
import com.woowacourse.naepyeon.repository.MemberRepository;
import com.woowacourse.naepyeon.repository.RollingpaperRepository;
import com.woowacourse.naepyeon.repository.TeamMemberRepository;
import com.woowacourse.naepyeon.repository.TeamRepository;
import com.woowacourse.naepyeon.service.dto.RollingpaperPreviewResponseDto;
import com.woowacourse.naepyeon.service.dto.RollingpaperResponseDto;
import com.woowacourse.naepyeon.service.dto.RollingpapersResponseDto;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class RollingpaperService {

    private final RollingpaperRepository rollingpaperRepository;
    private final MessageService messageService;
    private final TeamRepository teamRepository;
    private final TeamMemberRepository teamMemberRepository;
    private final MemberRepository memberRepository;

    public Long createRollingpaper(final String title, final Long teamId, final Long loginMemberId,
                                   final Long memberId) {
        final Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new NotFoundTeamException(teamId));
        final Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new NotFoundMemberException(memberId));
        validateTeamAndMember(teamId, loginMemberId, memberId);
        final Rollingpaper rollingpaper = new Rollingpaper(title, team, member);
        return rollingpaperRepository.save(rollingpaper);
    }

    private void validateTeamAndMember(final Long teamId, final Long loginMemberId, final Long memberId) {
        if (checkMemberNotIncludedTeam(teamId, loginMemberId)) {
            throw new UncertificationTeamMemberException(teamId);
        }
        if (checkMemberNotIncludedTeam(teamId, memberId)) {
            throw new NotFoundTeamMemberException(memberId);
        }
    }

    @Transactional(readOnly = true)
    public RollingpaperResponseDto findById(final Long rollingpaperId, final Long teamId, final Long loginMemberId) {
        if (checkMemberNotIncludedTeam(teamId, loginMemberId)) {
            throw new UncertificationTeamMemberException(teamId);
        }
        final Rollingpaper rollingpaper = rollingpaperRepository.findById(rollingpaperId)
                .orElseThrow(() -> new NotFoundRollingpaperException(rollingpaperId));
        return new RollingpaperResponseDto(
                rollingpaperId,
                rollingpaper.getTitle(),
                rollingpaper.getMember().getUsername(),
                messageService.findMessages(rollingpaperId)
        );
    }

    @Transactional(readOnly = true)
    public RollingpapersResponseDto findByTeamId(final Long teamId, final Long loginMemberId) {
        if (checkMemberNotIncludedTeam(teamId, loginMemberId)) {
            throw new UncertificationTeamMemberException(teamId);
        }
        final List<Rollingpaper> rollingpapers = rollingpaperRepository.findByTeamId(teamId);
        final List<RollingpaperPreviewResponseDto> rollingpaperPreviewResponseDtos = rollingpapers.stream()
                .map(RollingpaperPreviewResponseDto::from)
                .collect(Collectors.toUnmodifiableList());
        return new RollingpapersResponseDto(rollingpaperPreviewResponseDtos);
    }

    @Transactional(readOnly = true)
    public RollingpapersResponseDto findByMemberId(final Long teamId, final Long loginMemberId) {
        final List<Rollingpaper> rollingpapers = rollingpaperRepository.findByMemberId(loginMemberId);
        final List<RollingpaperPreviewResponseDto> rollingpaperPreviewResponseDtos = rollingpapers.stream()
                .map(RollingpaperPreviewResponseDto::from)
                .collect(Collectors.toUnmodifiableList());
        return new RollingpapersResponseDto(rollingpaperPreviewResponseDtos);
    }

    public void updateTitle(final Long rollingpaperId, final String newTitle, final Long teamId,
                            final Long loginMemberId) {
        if (checkMemberNotIncludedTeam(teamId, loginMemberId)) {
            throw new UncertificationTeamMemberException(teamId);
        }
        rollingpaperRepository.update(rollingpaperId, newTitle);
    }

    public void deleteRollingpaper(final Long rollingpaperId, final Long teamId, final Long loginMemberId) {
        if (checkMemberNotIncludedTeam(teamId, loginMemberId)) {
            throw new UncertificationTeamMemberException(teamId);
        }
        rollingpaperRepository.delete(rollingpaperId);
    }

    private boolean checkMemberNotIncludedTeam(final Long teamId, final Long memberId) {
        final List<Long> joinedTeamsId = teamMemberRepository.findTeamsByJoinedMemberId(memberId)
                .stream()
                .map(Team::getId)
                .collect(Collectors.toUnmodifiableList());
        return !joinedTeamsId.contains(teamId);
    }
}
