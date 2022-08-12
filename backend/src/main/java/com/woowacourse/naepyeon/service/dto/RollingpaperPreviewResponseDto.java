package com.woowacourse.naepyeon.service.dto;

import com.woowacourse.naepyeon.domain.rollingpaper.Classification;
import com.woowacourse.naepyeon.domain.rollingpaper.Rollingpaper;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static com.woowacourse.naepyeon.domain.rollingpaper.Classification.TEAM;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class RollingpaperPreviewResponseDto {

    private Long id;
    private String title;
    private String to;
    private Classification classification;

    public static RollingpaperPreviewResponseDto createPreviewRollingpaper(final Rollingpaper rollingpaper, final String to) {
        if (rollingpaper.getClassification().equals(TEAM)) {
            return getRollingpaperPreviewResponseDto(rollingpaper, rollingpaper.getTeam().getName());
        }

        return getRollingpaperPreviewResponseDto(rollingpaper, to);
    }

    private static RollingpaperPreviewResponseDto getRollingpaperPreviewResponseDto(Rollingpaper rollingpaper, String to) {
        return new RollingpaperPreviewResponseDto(
                rollingpaper.getId(),
                rollingpaper.getTitle(),
                to,
                rollingpaper.getClassification()
        );
    }
}
