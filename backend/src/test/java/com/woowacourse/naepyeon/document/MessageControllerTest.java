package com.woowacourse.naepyeon.document;

import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.delete;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.woowacourse.naepyeon.controller.dto.MessageRequest;
import com.woowacourse.naepyeon.controller.dto.MessageUpdateRequest;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;

class MessageControllerTest extends TestSupport {

    @Test
    void createMessage() throws Exception {
        final MessageRequest messageRequest =
                new MessageRequest("오늘 하루도 고생했어!\n 내일은 더 좋은 일들이 기다릴거야!", "#123456", false, false);
        mockMvc.perform(
                        post("/api/v1/rollingpapers/{rollingpaperId}/messages", rollingpaperId1)
                                .header("Authorization", "Bearer " + joinedMemberAccessToken)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(messageRequest))
                )
                .andExpect(status().isCreated())
                .andDo(restDocs.document());
    }

    @Test
    void findMessage() throws Exception {
        mockMvc.perform(
                        get("/api/v1/rollingpapers/{rollingpaperId}/messages/{messageId}", rollingpaperId1, messageId)
                                .header("Authorization", "Bearer " + joinedMemberAccessToken)
                )
                .andExpect(status().isOk())
                .andDo(restDocs.document());
    }

    @Test
    void updateMessage() throws Exception {
        final MessageUpdateRequest messageUpdateRequest = new MessageUpdateRequest("내편팀 파이팅", "#234567", true, false);
        mockMvc.perform(
                        put("/api/v1/rollingpapers/{rollingpaperId}/messages/{messageId}", rollingpaperId1, messageId)
                                .header("Authorization", "Bearer " + joinedMemberAccessToken)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(messageUpdateRequest))
                )
                .andExpect(status().isNoContent())
                .andDo(restDocs.document());
    }

    @Test
    void deleteMessage() throws Exception {
        mockMvc.perform(
                        delete("/api/v1/rollingpapers/{rollingpaperId}/messages/{messageId}", rollingpaperId1, messageId)
                                .header("Authorization", "Bearer " + joinedMemberAccessToken)
                )
                .andExpect(status().isNoContent())
                .andDo(restDocs.document());
    }
}
