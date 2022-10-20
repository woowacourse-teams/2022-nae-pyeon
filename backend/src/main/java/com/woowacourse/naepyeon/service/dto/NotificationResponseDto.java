package com.woowacourse.naepyeon.service.dto;

import com.woowacourse.naepyeon.domain.notification.ContentType;
import com.woowacourse.naepyeon.domain.notification.Notification;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class NotificationResponseDto {

    private Long id;

    private ContentType contentType;

    private String teamName;

    private String rollingpaperTitle;

    private String url;

    private LocalDateTime createAt;

    public static NotificationResponseDto from(final Notification notification) {
        return new NotificationResponseDto(
                notification.getId(),
                notification.getContentType(),
                notification.getTeamName(),
                notification.getRollingpaperTitle(),
                notification.getUrl(),
                notification.getCreatedDate()
        );
    }
}
