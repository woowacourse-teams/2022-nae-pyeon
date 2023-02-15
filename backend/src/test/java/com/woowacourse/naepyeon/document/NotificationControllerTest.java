package com.woowacourse.naepyeon.document;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

class NotificationControllerTest extends TestSupport {

    @Test
    @DisplayName("subscribe로 sse연결")
    void subscribe() throws Exception {
        when(notificationService.subscribe(any())).thenReturn(new SseEmitter(60L * 1000 * 60));
        mockMvc.perform(
                        get("/api/v1/subscribe?id=1")
                                .contentType(MediaType.TEXT_EVENT_STREAM_VALUE)
                )
                .andExpect(status().isOk())
                .andDo(restDocs.document());
    }

    @Test
    @DisplayName("안읽은 알림 전체 조회")
    void notifications() throws Exception {
        mockMvc.perform(
                        get("/api/v1/notifications")
                                .header("Authorization", "Bearer " + joinedMemberAccessToken)
                                .contentType(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isOk())
                .andDo(restDocs.document());
    }

    @Test
    @DisplayName("읽지 않은 알림 단건 읽음 처리")
    void readNotification() throws Exception {
        mockMvc.perform(
                        put("/api/v1/notifications/{id}", 1L)
                                .header("Authorization", "Bearer " + joinedMemberAccessToken)
                                .contentType(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isNoContent())
                .andDo(restDocs.document());
    }

    @Test
    @DisplayName("읽지 않은 알림들 모두 읽음 처리")
    void readAllNotifications() throws Exception {
        mockMvc.perform(
                        put("/api/v1/notifications/all")
                                .header("Authorization", "Bearer " + joinedMemberAccessToken)
                                .contentType(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isNoContent())
                .andDo(restDocs.document());
    }
}
