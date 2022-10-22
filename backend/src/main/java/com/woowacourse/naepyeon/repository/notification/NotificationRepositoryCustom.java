package com.woowacourse.naepyeon.repository.notification;

import com.woowacourse.naepyeon.domain.notification.Notification;
import java.util.List;

public interface NotificationRepositoryCustom {

    List<Notification> findAllByMemberIdAndUnread(Long memberId);

    void updateNotificationRead(final Long memberId);
}
