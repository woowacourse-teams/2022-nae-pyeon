package com.woowacourse.naepyeon.service;

import com.woowacourse.naepyeon.domain.Member;
import com.woowacourse.naepyeon.domain.Team;
import com.woowacourse.naepyeon.domain.TeamParticipation;
import com.woowacourse.naepyeon.domain.rollingpaper.Recipient;
import com.woowacourse.naepyeon.domain.rollingpaper.Rollingpaper;
import com.woowacourse.naepyeon.exception.NotFoundMemberException;
import com.woowacourse.naepyeon.exception.NotFoundRollingpaperException;
import com.woowacourse.naepyeon.exception.NotFoundTeamException;
import com.woowacourse.naepyeon.exception.NotFoundTeamMemberException;
import com.woowacourse.naepyeon.exception.UncertificationTeamMemberException;
import com.woowacourse.naepyeon.repository.member.MemberRepository;
import com.woowacourse.naepyeon.repository.rollingpaper.RollingpaperRepository;
import com.woowacourse.naepyeon.repository.team.TeamRepository;
import com.woowacourse.naepyeon.repository.teamparticipation.TeamParticipationRepository;
import com.woowacourse.naepyeon.service.dto.ReceivedRollingpaperResponseDto;
import com.woowacourse.naepyeon.service.dto.ReceivedRollingpapersResponseDto;
import com.woowacourse.naepyeon.service.dto.RollingpaperPreviewResponseDto;
import com.woowacourse.naepyeon.service.dto.RollingpaperResponseDto;
import com.woowacourse.naepyeon.service.dto.RollingpapersResponseDto;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

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
        final Member addressee = memberRepository.findById(addresseeId)
                .orElseThrow(() -> new NotFoundMemberException(addresseeId));
        validateTeamAndMember(teamId, loginMemberId, addresseeId);
        final TeamParticipation teamParticipation =
                teamParticipationRepository.findByTeamIdAndMemberId(teamId, addresseeId);
        final Rollingpaper rollingpaper = new Rollingpaper(title, Recipient.MEMBER, team, addressee, teamParticipation);
        return rollingpaperRepository.save(rollingpaper)
                .getId();
    }

    private void validateTeamAndMember(final Long teamId, final Long loginMemberId, final Long addresseeId) {
        if (checkMemberNotIncludedTeam(teamId, loginMemberId)) {
            throw new UncertificationTeamMemberException(teamId, loginMemberId);
        }
        if (checkMemberNotIncludedTeam(teamId, addresseeId)) {
            throw new NotFoundTeamMemberException(addresseeId);
        }
    }

    public Long createTeamRollingpaper(final String title, final Long teamId, final Long loginMemberId) {
        final Team team = teamRepository.findById(teamId)
                .orElseThrow((() -> new NotFoundTeamException(teamId)));
        if (checkMemberNotIncludedTeam(teamId, loginMemberId)) {
            throw new UncertificationTeamMemberException(teamId, loginMemberId);
        }
        final Rollingpaper rollingpaper = new Rollingpaper(title, Recipient.TEAM, team, null, null);
        return rollingpaperRepository.save(rollingpaper)
                .getId();
    }

    @Transactional(readOnly = true)
    public RollingpaperResponseDto findById(final Long rollingpaperId, final Long teamId, final Long loginMemberId) {
        final Rollingpaper rollingpaper = checkCreatableRollingpaper(rollingpaperId, teamId, loginMemberId);
        final String addresseeNickname = findRollingpaperAddresseeNickname(rollingpaper);

        return RollingpaperResponseDto.of(
                RollingpaperPreviewResponseDto.createPreviewRollingpaper(rollingpaper, addresseeNickname),
                messageService.findMessages(rollingpaper.getId(), teamId, loginMemberId)
        );
    }

    private Rollingpaper checkCreatableRollingpaper(final Long rollingpaperId, final Long teamId,
                                                    final Long loginMemberId) {
        if (checkMemberNotIncludedTeam(teamId, loginMemberId)) {
            throw new UncertificationTeamMemberException(teamId, loginMemberId);
        }
        return rollingpaperRepository.findById(rollingpaperId)
                .orElseThrow(() -> new NotFoundRollingpaperException(rollingpaperId));
    }

    @Transactional(readOnly = true)
    public RollingpapersResponseDto findByTeamId(
            final Long teamId, final Long loginMemberId, final String order, final String filter
    ) {
        if (checkMemberNotIncludedTeam(teamId, loginMemberId)) {
            throw new UncertificationTeamMemberException(teamId, loginMemberId);
        }
        final List<Rollingpaper> rollingpapers = filterRollingpapers(teamId, order, filter);
        final List<RollingpaperPreviewResponseDto> rollingpaperPreviewResponseDtos = rollingpapers.stream()
                .map(rollingpaper -> RollingpaperPreviewResponseDto.createPreviewRollingpaper(
                        rollingpaper, findRollingpaperAddresseeNickname(rollingpaper))
                )
                .collect(Collectors.toUnmodifiableList());
        return new RollingpapersResponseDto(rollingpaperPreviewResponseDtos);
    }

    private List<Rollingpaper> filterRollingpapers(final Long teamId, final String order, final String filter) {
        final List<Rollingpaper> rollingpapers = rollingpaperRepository.findByTeamIdAndOrder(teamId, order);
        // filter 값이 null일 경우
        if (!StringUtils.hasText(filter)) {
            return rollingpapers;
        }
        final Optional<Recipient> recipient = Recipient.from(filter);
        if (recipient.isEmpty()) {
            return rollingpapers;   // filter 값이 member, team 외의 값일 경우 전부 리턴
        }
        return rollingpapers.stream()
                .filter(rollingpaper -> rollingpaper.checkSameRecipient(recipient.get()))
                .collect(Collectors.toUnmodifiableList());
    }

    private String findRollingpaperAddresseeNickname(final Rollingpaper rollingpaper) {
        if (rollingpaper.isMemberNull()) {
            return rollingpaper.getTeamName();
        }
        return rollingpaperRepository.findAddresseeNicknameByMemberRollingpaperId(rollingpaper.getId())
                .orElse(rollingpaper.getTeamName());
    }

    @Transactional(readOnly = true)
    public ReceivedRollingpapersResponseDto findReceivedRollingpapers(
            final Long loginMemberId, final Integer page, final int count) {
        final Pageable pageRequest = PageRequest.of(page, count);
        final Page<Rollingpaper> rollingpapers = rollingpaperRepository.findByAddresseeId(loginMemberId, pageRequest);
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
        final Rollingpaper rollingpaper = rollingpaperRepository.findById(rollingpaperId)
                .orElseThrow(() -> new NotFoundRollingpaperException(rollingpaperId));
        rollingpaper.changeTitle(newTitle);
    }

    public void deleteRollingpaper(final Long rollingpaperId, final Long teamId, final Long loginMemberId) {
        if (checkMemberNotIncludedTeam(teamId, loginMemberId)) {
            throw new UncertificationTeamMemberException(teamId, loginMemberId);
        }
        rollingpaperRepository.deleteById(rollingpaperId);
    }

    private boolean checkMemberNotIncludedTeam(final Long teamId, final Long memberId) {
        final List<Long> joinedTeamsId = teamParticipationRepository.findTeamsByMemberId(memberId)
                .stream()
                .map(Team::getId)
                .collect(Collectors.toUnmodifiableList());
        return !joinedTeamsId.contains(teamId);
    }
}
