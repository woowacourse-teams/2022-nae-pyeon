package com.woowacourse.naepyeon.service.dto;

import com.woowacourse.naepyeon.domain.rollingpaper.Classification;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class RollingpaperResponseDto {

    private Long id;
    private String title;
    private String to;
    private Classification classification;
    private List<MessageResponseDto> messages;

    public static RollingpaperResponseDto of(final RollingpaperPreviewResponseDto rollingpaperPreviewResponseDto,
                                             final List<MessageResponseDto> messages) {
        return new RollingpaperResponseDto(
                rollingpaperPreviewResponseDto.getId(),
                rollingpaperPreviewResponseDto.getTitle(),
                rollingpaperPreviewResponseDto.getTo(),
                rollingpaperPreviewResponseDto.getClassification(),
                messages
        );
    }
}
