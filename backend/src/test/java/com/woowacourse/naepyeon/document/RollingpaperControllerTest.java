package com.woowacourse.naepyeon.document;

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

class RollingpaperControllerTest extends TestSupport {

    @Test
    void createRollingpaper() throws Exception {
        mockMvc.perform(
                        post("/api/v1/teams/{teamId}/rollingpapers", 1L)
                                .header("Authorization", "Bearer " + teamMemberAccessToken)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(readJson("/json/rollingpapers/rollingpaper-create.json"))
                )
                .andExpect(status().isCreated())
                .andDo(
                        restDocs.document(
                                pathParameters(
                                        parameterWithName("teamId").description("모임 식별자 값")
                                ),
                                requestFields(
                                        fieldWithPath("title").description("롤링페이퍼 제목"),
                                        fieldWithPath("addresseeId").description("롤링페이퍼 수신자 식별자 값")
                                ),
                                responseFields(
                                        fieldWithPath("id").description("롤링페이퍼 식별자 값")
                                )
                        )
                );
    }

    @Test
    void findRollingpaperById() throws Exception {
        mockMvc.perform(
                        get("/api/v1/teams/{teamId}/rollingpapers/{rollingpaperId}", 1L, 1L)
                                .header("Authorization", "Bearer " + teamMemberAccessToken)
                )
                .andExpect(status().isOk())
                .andDo(
                        restDocs.document(
                                pathParameters(
                                        parameterWithName("teamId").description("모임 식별자 값"),
                                        parameterWithName("rollingpaperId").description("롤링페이퍼 식별자 값")
                                ),
                                responseFields(
                                        fieldWithPath("id").description("롤링페이퍼 식별자 값"),
                                        fieldWithPath("title").description("롤링페이퍼 제목"),
                                        fieldWithPath("to").description("롤링페이퍼 수신자"),
                                        fieldWithPath("messages.[].id").description("메시지 식별자 값"),
                                        fieldWithPath("messages.[].content").description("메시지 내용"),
                                        fieldWithPath("messages.[].from").description("메시지 발송자"),
                                        fieldWithPath("messages.[].authorId").description("메시지 작성자")
                                )
                        )
                );
    }

    @Test
    void findRollingpapersByTeamId() throws Exception {
        mockMvc.perform(
                        get("/api/v1/teams/{teamId}/rollingpapers", 1L)
                                .header("Authorization", "Bearer " + teamMemberAccessToken)
                )
                .andExpect(status().isOk())
                .andDo(
                        restDocs.document(
                                pathParameters(
                                        parameterWithName("teamId").description("모임 식별자 값")
                                ),
                                responseFields(
                                        fieldWithPath("rollingpapers.[].id").description("롤링페이퍼 식별자 값"),
                                        fieldWithPath("rollingpapers.[].title").description("롤링페이퍼 제목"),
                                        fieldWithPath("rollingpapers.[].to").description("롤링페이퍼 대상 닉네임")
                                )
                        )
                );
    }

    @Test
    void findRollingpapersByMemberId() throws Exception {
        mockMvc.perform(
                        get("/api/v1/teams/{teamId}/rollingpapers/me", 1L)
                                .header("Authorization", "Bearer " + teamMemberAccessToken)
                )
                .andExpect(status().isOk())
                .andDo(
                        restDocs.document(
                                pathParameters(
                                        parameterWithName("teamId").description("모임 식별자 값")
                                ),
                                responseFields(
                                        fieldWithPath("rollingpapers.[].id").description("롤링페이퍼 식별자 값"),
                                        fieldWithPath("rollingpapers.[].title").description("롤링페이퍼 제목"),
                                        fieldWithPath("rollingpapers.[].to").description("롤링페이퍼 대상 닉네임")
                                )
                        )
                );
    }

    @Test
    void updateRollingpaper() throws Exception {
        mockMvc.perform(
                        put("/api/v1/teams/{teamId}/rollingpapers/{rollingpaperId}", 1L, 2L)
                                .header("Authorization", "Bearer " + teamMemberAccessToken)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(readJson("/json/rollingpapers/rollingpaper-update.json"))
                )
                .andExpect(status().isNoContent())
                .andDo(
                        restDocs.document(
                                pathParameters(
                                        parameterWithName("teamId").description("모임 식별자 값"),
                                        parameterWithName("rollingpaperId").description("롤링페이퍼 식별자 값")
                                ),
                                requestFields(
                                        fieldWithPath("title").description("롤링페이퍼 수정 제목")
                                )
                        )
                );
    }
}
