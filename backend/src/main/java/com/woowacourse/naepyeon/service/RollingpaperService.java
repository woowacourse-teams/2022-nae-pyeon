package com.woowacourse.naepyeon.service;

import com.woowacourse.naepyeon.domain.Member;
import com.woowacourse.naepyeon.domain.Rollingpaper;
import com.woowacourse.naepyeon.domain.Team;
import com.woowacourse.naepyeon.repository.RollingpaperRepository;
import com.woowacourse.naepyeon.repository.jpa.MemberJpaDao;
import com.woowacourse.naepyeon.repository.jpa.TeamJpaDao;
import com.woowacourse.naepyeon.service.dto.RollingpaperResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class RollingpaperService {

    private final RollingpaperRepository rollingpaperRepository;
    private final MessageService messageService;
    private final TeamJpaDao teamJpaDao; //todo: #20 머지 후 teamRepository로 변경
    private final MemberJpaDao memberJpaDao; //todo: #19 머지 후 memberRepository로 변경

    public Long openRollingpaper(final String title, final Long teamId, final Long memberId) {
        final Team team = teamJpaDao.findById(teamId)
                .orElseThrow(IllegalArgumentException::new);
        final Member member = memberJpaDao.findById(memberId)
                .orElseThrow(IllegalArgumentException::new);
        final Rollingpaper rollingpaper = new Rollingpaper(title, team, member);
        return rollingpaperRepository.save(rollingpaper);
    }

    @Transactional(readOnly = true)
    public RollingpaperResponse findById(final Long rollingpaperId) {
        final Rollingpaper rollingpaper = rollingpaperRepository.findById(rollingpaperId)
                .orElseThrow(IllegalArgumentException::new);

        return new RollingpaperResponse(
                rollingpaper.getTitle(),
                rollingpaper.getMember().getUsername(),
                messageService.findMessages(rollingpaperId)
        );
    }

    @Transactional(readOnly = true)
    public RollingpapersResponseDto findByTeamId(final Long teamId) {
        final List<Rollingpaper> rollingpapers = rollingpaperRepository.findByTeamId(teamId);
        final List<RollingpaperPreviewResponseDto> rollingpaperPreviewResponseDtos = rollingpapers.stream()
                .map(RollingpaperPreviewResponseDto::from)
                .collect(Collectors.toUnmodifiableList());
        return new RollingpapersResponseDto(rollingpaperPreviewResponseDtos);
    }

    public void updateTitle(final Long rollingpaperId, final String newTitle) {
        rollingpaperRepository.update(rollingpaperId, newTitle);
    }

    public void deleteRollingpaper(final Long rollingpaperId) {
        rollingpaperRepository.delete(rollingpaperId);
    }
}
