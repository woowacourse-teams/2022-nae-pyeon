package com.woowacourse.naepyeon.service.dto;

import com.woowacourse.naepyeon.domain.Rollingpaper;
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

    public static RollingpaperPreviewResponseDto from(final Rollingpaper rollingpaper, final String nickname) {
        return new RollingpaperPreviewResponseDto(
                rollingpaper.getId(),
                rollingpaper.getTitle(),
                nickname
        );
    }
}
