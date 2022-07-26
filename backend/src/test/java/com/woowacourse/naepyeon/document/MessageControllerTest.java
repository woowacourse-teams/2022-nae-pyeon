package com.woowacourse.naepyeon.document;

import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.delete;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;

class MessageControllerTest extends TestSupport {

    @Test
    void createMessage() throws Exception {
        mockMvc.perform(
                        post("/api/v1/rollingpapers/{rollingpaperId}/messages", 1L)
                                .header("Authorization", "Bearer " + teamMemberAccessToken)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(readJson("/json/messages/message-create.json"))
                )
                .andExpect(status().isCreated())
                .andDo(restDocs.document());
    }

    @Test
    void findMessage() throws Exception {
        mockMvc.perform(
                        get("/api/v1/rollingpapers/{rollingpaperId}/messages/{messageId}", 1L, 2L)
                                .header("Authorization", "Bearer " + teamMemberAccessToken)
                )
                .andExpect(status().isOk())
                .andDo(restDocs.document());
    }

    @Test
    void updateMessageContent() throws Exception {
        mockMvc.perform(
                        put("/api/v1/rollingpapers/{rollingpaperId}/messages/{messageId}", 1L, 2L)
                                .header("Authorization", "Bearer " + teamMemberAccessToken)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(readJson("/json/messages/message-update.json"))
                )
                .andExpect(status().isNoContent())
                .andDo(restDocs.document());
    }

    @Test
    void deleteMessage() throws Exception {
        mockMvc.perform(
                        delete("/api/v1/rollingpapers/{rollingpaperId}/messages/{messageId}", 1L, 2L)
                                .header("Authorization", "Bearer " + teamMemberAccessToken)
                )
                .andExpect(status().isNoContent())
                .andDo(restDocs.document());
    }
}
