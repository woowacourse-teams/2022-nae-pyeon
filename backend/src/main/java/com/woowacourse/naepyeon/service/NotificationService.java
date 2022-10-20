package com.woowacourse.naepyeon.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.woowacourse.naepyeon.domain.TeamParticipation;
import com.woowacourse.naepyeon.domain.notification.ContentType;
import com.woowacourse.naepyeon.domain.notification.Notification;
import com.woowacourse.naepyeon.domain.rollingpaper.Rollingpaper;
import com.woowacourse.naepyeon.exception.InvalidRedisMessageException;
import com.woowacourse.naepyeon.exception.NotFoundNotificationException;
import com.woowacourse.naepyeon.repository.notification.NotificationRepository;
import com.woowacourse.naepyeon.repository.teamparticipation.TeamParticipationRepository;
import com.woowacourse.naepyeon.service.dto.NotificationResponseDto;
import com.woowacourse.naepyeon.service.dto.NotificationsResponseDto;
import com.woowacourse.naepyeon.service.event.RollingpaperAndTeamIdAndAuthorIdEvent;
import com.woowacourse.naepyeon.service.event.RollingpaperAndAuthorIdEvent;
import java.io.IOException;
import java.util.List;
import java.util.Objects;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.data.redis.core.RedisOperations;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.event.TransactionalEventListener;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class NotificationService {

    private static final long DEFAULT_TIMEOUT = 60L * 1000 * 60;
    private static final List<SseEmitter> emitters = new CopyOnWriteArrayList<>();

    private final NotificationRepository notificationRepository;
    private final TeamParticipationRepository teamParticipationRepository;
    private final RedisOperations<String, NotificationResponseDto> eventRedisOperations;
    private final RedisMessageListenerContainer redisMessageListenerContainer;
    private final ObjectMapper objectMapper;

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    @TransactionalEventListener
    public void send(final RollingpaperAndAuthorIdEvent rollingpaperAndAuthorIdEvent) {
        final Rollingpaper rollingpaper = rollingpaperAndAuthorIdEvent.getRollingpaper();
        final Long authorId = rollingpaperAndAuthorIdEvent.getAuthorId();
        if (rollingpaper.isAddressee(authorId)) {
            return;
        }
        final Notification notification = createNotification(rollingpaper);
        notificationRepository.save(notification);
        final String id = String.valueOf(notification.getMemberId());
        this.eventRedisOperations.convertAndSend(getChannelName(id), notification);
    }

    private Notification createNotification(final Rollingpaper rollingpaper) {
        return new Notification(rollingpaper.getAddressee().getId(), ContentType.MESSAGE_AT_MY_ROLLINGPAPER,
                rollingpaper.getTeamName(), rollingpaper.getTitle(), createUrl(rollingpaper), false);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    @TransactionalEventListener
    public void send(final RollingpaperAndTeamIdAndAuthorIdEvent rollingpaperAndTeamIdAndAuthorIdEvent) {
        final Rollingpaper rollingpaper = rollingpaperAndTeamIdAndAuthorIdEvent.getRollingpaper();
        final Long teamId = rollingpaperAndTeamIdAndAuthorIdEvent.getTeamId();
        final Long authorId = rollingpaperAndTeamIdAndAuthorIdEvent.getAuthorId();
        final List<TeamParticipation> teamParticipations = teamParticipationRepository.findByTeamId(teamId);
        for (TeamParticipation teamParticipation : teamParticipations) {
            if (Objects.equals(teamParticipation.findMemberId(), authorId)) {
                continue;
            }
            final Long memberId = teamParticipation.findMemberId();
            final Notification notification = createNotification(memberId, rollingpaper);
            notificationRepository.save(notification);
            final String id = String.valueOf(memberId);
            this.eventRedisOperations.convertAndSend(getChannelName(id), notification);
        }
    }

    private Notification createNotification(final Long memberId, final Rollingpaper rollingpaper) {
        return new Notification(memberId, ContentType.ROLLINGPAPER_AT_MY_TEAM, rollingpaper.getTeamName(),
                rollingpaper.getTitle(), createUrl(rollingpaper), false);
    }

    private String createUrl(final Rollingpaper rollingpaper) {
        final Long teamId = rollingpaper.getTeam().getId();
        return "/team/" + teamId + "/rollingpaper/" + rollingpaper.getId();
    }

    public SseEmitter subscribe(final Long memberId) throws IOException {
        final String id = String.valueOf(memberId);
        final SseEmitter emitter = new SseEmitter(DEFAULT_TIMEOUT);
        //초반 연결용 메시지!!
        emitter.send(SseEmitter.event()
                .id(id)
                .name("sse"));
        emitters.add(emitter);
        final MessageListener messageListener = (message, pattern) -> {
            final NotificationResponseDto notificationResponse = serialize(message);
            sendToClient(emitter, id, notificationResponse);
        };
        this.redisMessageListenerContainer.addMessageListener(messageListener, ChannelTopic.of(getChannelName(id)));
        checkEmitterStatus(emitter, messageListener);
        return emitter;
    }

    private NotificationResponseDto serialize(final Message message) {
        try {
            final Notification notification = this.objectMapper.readValue(message.getBody(), Notification.class);
            return NotificationResponseDto.from(notification);
        } catch (IOException e) {
            throw new InvalidRedisMessageException(message);
        }
    }

    private void sendToClient(final SseEmitter emitter, final String id, final Object data) {
        try {
            emitter.send(SseEmitter.event()
                    .id(id)
                    .name("sse")
                    .data(data));
        } catch (IOException e) {
            emitters.remove(emitter);
            log.error("SSE 연결이 올바르지 않습니다. 해당 memberID={}", id);
        }
    }

    private void checkEmitterStatus(final SseEmitter emitter, final MessageListener messageListener) {
        emitter.onCompletion(() -> {
            emitters.remove(emitter);
            this.redisMessageListenerContainer.removeMessageListener(messageListener);
        });
        emitter.onTimeout(() -> {
            emitters.remove(emitter);
            this.redisMessageListenerContainer.removeMessageListener(messageListener);
        });
    }

    private String getChannelName(final String memberId) {
        return "sample:topics:" + memberId;
    }

    @Transactional(readOnly = true)
    public NotificationsResponseDto findAllByMemberIdAndUnread(final Long memberId) {
        List<NotificationResponseDto> responses = notificationRepository.findAllByMemberIdAndUnread(memberId)
                .stream()
                .map(NotificationResponseDto::from)
                .collect(Collectors.toUnmodifiableList());
        long unreadCount = responses.size();

        return NotificationsResponseDto.of(responses, unreadCount);
    }

    public void readNotification(final Long id) {
        final Notification notification = notificationRepository.findById(id)
                .orElseThrow(() -> new NotFoundNotificationException(id));
        notification.read();
    }

    public void readAllNotifications(final Long id) {
        notificationRepository.updateNotificationRead(id);
    }
}
