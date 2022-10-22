package com.woowacourse.naepyeon.repository.notification;

import static com.woowacourse.naepyeon.domain.notification.QNotification.notification;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.woowacourse.naepyeon.domain.notification.Notification;
import java.util.List;
import javax.persistence.EntityManager;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class NotificationRepositoryImpl implements NotificationRepositoryCustom {

    private final JPAQueryFactory queryFactory;
    private final EntityManager em;

    @Override
    public List<Notification> findAllByMemberIdAndUnread(final Long memberId) {
        return queryFactory.selectFrom(notification)
                .where(notification.memberId.eq(memberId), notification.isRead.eq(false))
                .orderBy(notification.id.desc())
                .fetch();
    }

    @Override
    public void updateNotificationRead(final Long memberId) {
        queryFactory.update(notification)
                .set(notification.isRead, true)
                .where(notification.memberId.eq(memberId))
                .execute();

        em.flush();
        em.clear();
    }
}
