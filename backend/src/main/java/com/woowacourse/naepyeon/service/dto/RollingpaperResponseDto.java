package com.woowacourse.naepyeon.service.dto;

import com.woowacourse.naepyeon.domain.rollingpaper.Recipient;
import java.util.List;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@ToString
public class RollingpaperResponseDto {

    private Long id;
    private String title;
    private String to;
    private Recipient recipient;
    private List<MessageResponseDto> messages;

    public static RollingpaperResponseDto of(final RollingpaperPreviewResponseDto rollingpaperPreviewResponseDto,
                                             final List<MessageResponseDto> messages) {
        return new RollingpaperResponseDto(
                rollingpaperPreviewResponseDto.getId(),
                rollingpaperPreviewResponseDto.getTitle(),
                rollingpaperPreviewResponseDto.getTo(),
                rollingpaperPreviewResponseDto.getRecipient(),
                messages
        );
    }
}
