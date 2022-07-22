package com.woowacourse.naepyeon.document;

import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.delete;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.put;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
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
                .andDo(
                        restDocs.document(
                                pathParameters(
                                        parameterWithName("rollingpaperId").description("롤링페이퍼 식별자 값")
                                ),
                                requestFields(
                                        fieldWithPath("content").description("메시지 내용")
                                ),
                                responseFields(
                                        fieldWithPath("id").description("메시지 식별자 값")
                                )
                        )
                );
    }

    @Test
    void findMessage() throws Exception {
        mockMvc.perform(
                        get("/api/v1/rollingpapers/{rollingpaperId}/messages/{messageId}", 1L, 2L)
                                .header("Authorization", "Bearer " + teamMemberAccessToken)
                )
                .andExpect(status().isOk())
                .andDo(
                        restDocs.document(
                                pathParameters(
                                        parameterWithName("rollingpaperId").description("롤링페이퍼 식별자 값"),
                                        parameterWithName("messageId").description("메시지 식별자 값")
                                ),
                                responseFields(
                                        fieldWithPath("id").description("메시지 식별자 값"),
                                        fieldWithPath("content").description("메시지 내용"),
                                        fieldWithPath("from").description("메시지 작성자 닉네임"),
                                        fieldWithPath("authorId").description("메시지 작성자 식별자 값")
                                )
                        )
                );
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
                .andDo(
                        restDocs.document(
                                pathParameters(
                                        parameterWithName("rollingpaperId").description("롤링페이퍼 식별자 값"),
                                        parameterWithName("messageId").description("메시지 식별자 값")
                                ),
                                requestFields(
                                        fieldWithPath("content").description("메시지 수정할 내용")
                                )
                        )
                );
    }

    @Test
    void deleteMessage() throws Exception {
        mockMvc.perform(
                        delete("/api/v1/rollingpapers/{rollingpaperId}/messages/{messageId}", 1L, 2L)
                                .header("Authorization", "Bearer " + teamMemberAccessToken)
                )
                .andExpect(status().isNoContent())
                .andDo(
                        restDocs.document(
                                pathParameters(
                                        parameterWithName("rollingpaperId").description("롤링페이퍼 식별자 값"),
                                        parameterWithName("messageId").description("메시지 식별자 값")
                                )
                        )
                );
    }
}
