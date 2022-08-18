package com.woowacourse.naepyeon.service.dto;

import static com.woowacourse.naepyeon.domain.rollingpaper.Recipient.TEAM;

import com.woowacourse.naepyeon.domain.rollingpaper.Recipient;
import com.woowacourse.naepyeon.domain.rollingpaper.Rollingpaper;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class RollingpaperPreviewResponseDto {

    private Long id;
    private String title;
    private String to;
    private Recipient recipient;

    public static RollingpaperPreviewResponseDto createPreviewRollingpaper(final Rollingpaper rollingpaper,
                                                                           final String to) {
        if (rollingpaper.checkSameRecipient(TEAM)) {
            return getRollingpaperPreviewResponseDto(rollingpaper, rollingpaper.getTeamName());
        }

        return getRollingpaperPreviewResponseDto(rollingpaper, to);
    }

    private static RollingpaperPreviewResponseDto getRollingpaperPreviewResponseDto(final Rollingpaper rollingpaper,
                                                                                    final String to) {
        return new RollingpaperPreviewResponseDto(
                rollingpaper.getId(),
                rollingpaper.getTitle(),
                to,
                rollingpaper.getRecipient()
        );
    }
}
