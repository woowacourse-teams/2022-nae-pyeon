package com.woowacourse.naepyeon.repository.notification;

import com.woowacourse.naepyeon.domain.notification.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<Notification, Long>, NotificationRepositoryCustom {
}
