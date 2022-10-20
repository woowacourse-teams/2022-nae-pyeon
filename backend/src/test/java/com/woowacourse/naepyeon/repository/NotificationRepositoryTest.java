package com.woowacourse.naepyeon.repository;

import static org.assertj.core.api.Assertions.assertThat;

import com.woowacourse.naepyeon.config.JpaAuditingConfig;
import com.woowacourse.naepyeon.config.QueryDslConfig;
import com.woowacourse.naepyeon.domain.notification.ContentType;
import com.woowacourse.naepyeon.domain.notification.Notification;
import com.woowacourse.naepyeon.repository.notification.NotificationRepository;
import java.util.List;
import java.util.stream.Collectors;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;

@DataJpaTest
@Import({JpaAuditingConfig.class, QueryDslConfig.class})
class NotificationRepositoryTest {

    @Autowired
    private NotificationRepository notificationRepository;

    private final Long seungpangId = 1L;
    private final Notification notification1 = new Notification(
            seungpangId,
            ContentType.MESSAGE_AT_MY_ROLLINGPAPER,
            "내편",
            "승팡 생일축하해",
            "/team/1/rollingpaper/1",
            false
    );

    final Notification notification2 = new Notification(
            seungpangId,
            ContentType.MESSAGE_AT_MY_ROLLINGPAPER,
            "내편",
            "승팡 생일축하해",
            "/team/1/rollingpaper/1",
            false);

    @BeforeEach
    void setUp() {
        notificationRepository.save(notification1);
        notificationRepository.save(notification2);
    }
    
    @Test
    @DisplayName("알림을 저장하고 id를 찾는다.")
    void save() {
        final Long memberId = 1L;
        final ContentType contentType = ContentType.MESSAGE_AT_MY_ROLLINGPAPER;
        final String teamName = "내편짱짱";
        final String rollingpaperTitle = "다들 고생했어!";
        final String url = "team/1/Rollingpaper/1";
        final boolean isRead = false;
        final Notification notification = new Notification(memberId, contentType, teamName, rollingpaperTitle,
                url, isRead);

        final Long id = notificationRepository.save(notification)
                .getId();
        final Notification findNotification = notificationRepository.findById(id)
                .orElseThrow();

        assertThat(findNotification)
                .extracting("id", "memberId", "contentType", "teamName", "rollingpaperTitle", "url", "isRead")
                .containsExactly(id, memberId, contentType, teamName, rollingpaperTitle, url, isRead);
    }

    @Test
    @DisplayName("읽지 않은 알림들을 모두 조회한다.")
    void findAllByMemberIdUnRead() {
        final List<Long> notificationsId = notificationRepository.findAllByMemberIdAndUnread(seungpangId)
                .stream()
                .map(Notification::getId)
                .collect(Collectors.toUnmodifiableList());

        assertThat(notificationsId)
                .containsExactly(notification2.getId(), notification1.getId());
    }

    @Test
    @DisplayName("읽지 않은 알림들을 모두 읽음 처리 한다.")
    void readAllUnreadNotifications() {
        notificationRepository.updateNotificationRead(seungpangId);

        assertThat(notificationRepository.findAllByMemberIdAndUnread(seungpangId))
                .isEmpty();
    }
}
