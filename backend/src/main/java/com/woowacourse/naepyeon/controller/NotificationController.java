package com.woowacourse.naepyeon.controller;

import com.woowacourse.naepyeon.controller.auth.AuthenticationPrincipal;
import com.woowacourse.naepyeon.controller.dto.LoginMemberRequest;
import com.woowacourse.naepyeon.service.NotificationService;
import com.woowacourse.naepyeon.service.dto.NotificationsResponseDto;
import java.io.IOException;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/")
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping(value = "/subscribe", produces = "text/event-stream")
    public SseEmitter subscribe(@RequestParam("id") Long id) throws IOException {
        return notificationService.subscribe(id);
    }

    @GetMapping("/notifications")
    public ResponseEntity<NotificationsResponseDto> notifications(
            @AuthenticationPrincipal @Valid final LoginMemberRequest loginMemberRequest) {
        return ResponseEntity.ok().body(notificationService.findAllById(loginMemberRequest.getId()));
    }

    @PutMapping("/notifications/{id}")
    public ResponseEntity<Void> readNotification(@PathVariable Long id) {
        notificationService.readNotification(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/notifications/all")
    public ResponseEntity<Void> readAllNotifications(
            @AuthenticationPrincipal @Valid final LoginMemberRequest loginMemberRequest) {
        notificationService.readAllNotifications(loginMemberRequest.getId());
        return ResponseEntity.noContent().build();
    }
}
