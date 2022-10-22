package com.woowacourse.naepyeon.service.dto;

import com.woowacourse.naepyeon.domain.rollingpaper.Recipient;
import com.woowacourse.naepyeon.domain.rollingpaper.Rollingpaper;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@ToString
public class RollingpaperPreviewResponseDto {

    private Long id;
    private String title;
    private String to;
    private Recipient recipient;

    public static RollingpaperPreviewResponseDto createPreviewRollingpaper(final Rollingpaper rollingpaper,
                                                                           final String to) {
        return new RollingpaperPreviewResponseDto(
                rollingpaper.getId(),
                rollingpaper.getTitle(),
                to,
                rollingpaper.getRecipient()
        );
    }
}
