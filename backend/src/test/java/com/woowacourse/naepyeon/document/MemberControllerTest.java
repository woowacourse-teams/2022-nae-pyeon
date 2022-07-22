package com.woowacourse.naepyeon.document;

import static com.woowacourse.naepyeon.document.RestDocsConfiguration.field;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.requestHeaders;
import static org.springframework.restdocs.headers.HeaderDocumentation.responseHeaders;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.delete;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.put;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;

class MemberControllerTest extends TestSupport {

    @Test
    void createMember() throws Exception {
        mockMvc.perform(
                        post("/api/v1/members")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(readJson("/json/members/member-create.json"))

                )
                .andExpect(status().isCreated())
                .andDo(
                        restDocs.document(
                                requestFields(
                                        fieldWithPath("username").description("유저 이름")
                                                .attributes(field("length", "20자 이내")),
                                        fieldWithPath("email").description("유저 이메일")
                                                .attributes(field("length", "255자 이내")),
                                        fieldWithPath("password").description("유저 비밀번호")
                                                .attributes(field("length", "255자 이내"))
                                ),
                                responseHeaders(
                                        headerWithName("Location").description("리소스 위치")
                                )
                        )
                );
    }

    @Test
    void findMember() throws Exception {
        mockMvc.perform(
                        get("/api/v1/members/me")
                                .header("Authorization", "Bearer " + accessToken)
                )
                .andExpect(status().isOk())
                .andDo(
                        restDocs.document(
                                requestHeaders(
                                        headerWithName("Authorization").description("accessToken 값")
                                ),
                                responseFields(
                                        fieldWithPath("username").description("유저 이름"),
                                        fieldWithPath("email").description("유저 이메일")
                                )
                        )
                );
    }

    @Test
    void updateMember() throws Exception {
        mockMvc.perform(
                        put("/api/v1/members/me")
                                .header("Authorization", "Bearer " + accessToken)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(readJson("/json/members/member-update.json"))
                )
                .andExpect(status().isNoContent())
                .andDo(
                        restDocs.document(
                                requestFields(
                                        fieldWithPath("username").description("유저 이름")
                                )
                        )
                );
    }

    @Test
    void deleteMember() throws Exception {
        mockMvc.perform(
                        delete("/api/v1/members/me")
                                .header("Authorization", "Bearer " + accessToken)
                )
                .andExpect(status().isNoContent());
    }
}
