package com.woowacourse.naepyeon.service;

import com.woowacourse.naepyeon.domain.rollingpaper.Classification;
import com.woowacourse.naepyeon.domain.Member;
import com.woowacourse.naepyeon.domain.rollingpaper.Rollingpaper;
import com.woowacourse.naepyeon.domain.Team;
import com.woowacourse.naepyeon.exception.NotFoundMemberException;
import com.woowacourse.naepyeon.exception.NotFoundRollingpaperException;
import com.woowacourse.naepyeon.exception.NotFoundTeamException;
import com.woowacourse.naepyeon.exception.NotFoundTeamMemberException;
import com.woowacourse.naepyeon.exception.UncertificationTeamMemberException;
import com.woowacourse.naepyeon.repository.MemberRepository;
import com.woowacourse.naepyeon.repository.RollingpaperRepository;
import com.woowacourse.naepyeon.repository.TeamParticipationRepository;
import com.woowacourse.naepyeon.repository.TeamRepository;
import com.woowacourse.naepyeon.service.dto.ReceivedRollingpaperResponseDto;
import com.woowacourse.naepyeon.service.dto.ReceivedRollingpapersResponseDto;
import com.woowacourse.naepyeon.service.dto.RollingpaperPreviewResponseDto;
import com.woowacourse.naepyeon.service.dto.RollingpaperResponseDto;
import com.woowacourse.naepyeon.service.dto.RollingpapersResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

import static com.woowacourse.naepyeon.domain.rollingpaper.Classification.MEMBER;

@Service
@RequiredArgsConstructor
@Transactional
public class RollingpaperService {

    private final RollingpaperRepository rollingpaperRepository;
    private final MessageService messageService;
    private final TeamRepository teamRepository;
    private final TeamParticipationRepository teamParticipationRepository;
    private final MemberRepository memberRepository;

    public Long createMemberRollingpaper(final String title, final Long teamId,
                                         final Long loginMemberId, final Long addresseeId) {
        final Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new NotFoundTeamException(teamId));
        final Member member = memberRepository.findById(addresseeId)
                .orElseThrow(() -> new NotFoundMemberException(addresseeId));
        validateTeamAndMember(teamId, loginMemberId, addresseeId);
        final Rollingpaper rollingpaper = new Rollingpaper(title, MEMBER, team, member);
        return rollingpaperRepository.save(rollingpaper);
    }

    private void validateTeamAndMember(final Long teamId, final Long loginMemberId, final Long memberId) {
        if (checkMemberNotIncludedTeam(teamId, loginMemberId)) {
            throw new UncertificationTeamMemberException(teamId, loginMemberId);
        }
        if (checkMemberNotIncludedTeam(teamId, memberId)) {
            throw new NotFoundTeamMemberException(memberId);
        }
    }

    public Long createTeamRollingpaper(final String title, final Long teamId, final Long loginMemberId) {
        final Team team = teamRepository.findById(teamId)
                .orElseThrow((() -> new NotFoundTeamException(teamId)));
        if (checkMemberNotIncludedTeam(teamId, loginMemberId)) {
            throw new UncertificationTeamMemberException(teamId, loginMemberId);
        }
        final Rollingpaper rollingpaper = new Rollingpaper(title, Classification.TEAM, team, null);
        return rollingpaperRepository.save(rollingpaper);
    }

    @Transactional(readOnly = true)
    public RollingpaperResponseDto findById(final Long rollingpaperId, final Long teamId, final Long loginMemberId) {
        final Rollingpaper rollingpaper = checkCreatableRollingpaper(rollingpaperId, teamId, loginMemberId);

        return RollingpaperResponseDto.of(
                RollingpaperPreviewResponseDto.createPreviewRollingpaper(
                        rollingpaper, findRollingpaperAddresseeNickname(rollingpaper, teamId)
                ),
                messageService.findMessages(rollingpaper.getId(), teamId)
        );
    }

    private Rollingpaper checkCreatableRollingpaper(final Long rollingpaperId, final Long teamId, final Long loginMemberId) {
        if (checkMemberNotIncludedTeam(teamId, loginMemberId)) {
            throw new UncertificationTeamMemberException(teamId, loginMemberId);
        }
        return rollingpaperRepository.findById(rollingpaperId)
                .orElseThrow(() -> new NotFoundRollingpaperException(rollingpaperId));
    }

    public String findRollingpaperAddresseeNickname(final Rollingpaper rollingpaper, final Long teamId) {
        if (rollingpaper.getMember() == null) {
            return "";
        }
        return teamParticipationRepository.findNicknameByMemberIdAndTeamId(rollingpaper.getAddresseeId(), teamId);
    }

    @Transactional(readOnly = true)
    public RollingpapersResponseDto findByTeamId(final Long teamId, final Long loginMemberId) {
        if (checkMemberNotIncludedTeam(teamId, loginMemberId)) {
            throw new UncertificationTeamMemberException(teamId, loginMemberId);
        }
        final List<Rollingpaper> rollingpapers = rollingpaperRepository.findByTeamId(teamId);
        final List<RollingpaperPreviewResponseDto> rollingpaperPreviewResponseDtos = rollingpapers.stream()
                .map(rollingpaper -> RollingpaperPreviewResponseDto.createPreviewRollingpaper(
                        rollingpaper, findRollingpaperAddresseeNickname(rollingpaper, teamId))
                )
                .collect(Collectors.toUnmodifiableList());
        return new RollingpapersResponseDto(rollingpaperPreviewResponseDtos);
    }

    @Transactional(readOnly = true)
    public ReceivedRollingpapersResponseDto findReceivedRollingpapers(
            final Long loginMemberId, final Integer page, final int count) {
        final Pageable pageRequest = PageRequest.of(page, count);
        final Page<Rollingpaper> rollingpapers = rollingpaperRepository.findByMemberId(loginMemberId, pageRequest);
        final List<ReceivedRollingpaperResponseDto> receivedRollingpaperResponseDtos = rollingpapers.stream()
                .map(rollingpaper -> ReceivedRollingpaperResponseDto.of(
                        rollingpaper.getId(), rollingpaper.getTitle(), rollingpaper.getTeam())
                )
                .collect(Collectors.toUnmodifiableList());
        return new ReceivedRollingpapersResponseDto(
                rollingpapers.getTotalElements(),
                rollingpapers.getNumber(),
                receivedRollingpaperResponseDtos
        );
    }

    public void updateTitle(final Long rollingpaperId, final String newTitle, final Long teamId,
                            final Long loginMemberId) {
        if (checkMemberNotIncludedTeam(teamId, loginMemberId)) {
            throw new UncertificationTeamMemberException(teamId, loginMemberId);
        }
        rollingpaperRepository.update(rollingpaperId, newTitle);
    }

    public void deleteRollingpaper(final Long rollingpaperId, final Long teamId, final Long loginMemberId) {
        if (checkMemberNotIncludedTeam(teamId, loginMemberId)) {
            throw new UncertificationTeamMemberException(teamId, loginMemberId);
        }
        rollingpaperRepository.delete(rollingpaperId);
    }

    private boolean checkMemberNotIncludedTeam(final Long teamId, final Long memberId) {
        final List<Long> joinedTeamsId = teamParticipationRepository.findTeamsByMemberId(memberId)
                .stream()
                .map(Team::getId)
                .collect(Collectors.toUnmodifiableList());
        return !joinedTeamsId.contains(teamId);
    }
}
