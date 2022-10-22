package com.woowacourse.naepyeon.service.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class NotificationsResponseDto {

    private List<NotificationResponseDto> notifications;
    private long unreadCount;

    public static NotificationsResponseDto of(List<NotificationResponseDto> notifications, long count) {
        return new NotificationsResponseDto(notifications, count);
    }
}
