package com.woowacourse.naepyeon.document;

import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.delete;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.woowacourse.naepyeon.controller.dto.MemberUpdateRequest;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;

class MemberControllerTest extends TestSupport {

    @Test
    void findMember() throws Exception {
        mockMvc.perform(
                        get("/api/v1/members/me")
                                .header("Authorization", "Bearer " + accessToken)
                )
                .andExpect(status().isOk())
                .andDo(restDocs.document());
    }

    @Test
    void findReceivedRollingpapers() throws Exception {
        mockMvc.perform(
                        get("/api/v1/members/me/rollingpapers/received?page=0&count=10")
                                .header("Authorization", "Bearer " + accessToken)
                )
                .andExpect(status().isOk())
                .andDo(restDocs.document());
    }

    @Test
    void findWrittenMessages() throws Exception {
        mockMvc.perform(
                        get("/api/v1/members/me/messages/written?page=0&count=10")
                                .header("Authorization", "Bearer " + accessToken)
                )
                .andExpect(status().isOk())
                .andDo(restDocs.document());
    }

    @Test
    void updateMember() throws Exception {
        final MemberUpdateRequest memberUpdateRequest = new MemberUpdateRequest("승팡");
        mockMvc.perform(
                        put("/api/v1/members/me")
                                .header("Authorization", "Bearer " + accessToken)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(memberUpdateRequest))
                )
                .andExpect(status().isNoContent())
                .andDo(restDocs.document());
    }

    @Test
    void deleteMember() throws Exception {
        mockMvc.perform(
                        delete("/api/v1/members/me")
                                .header("Authorization", "Bearer " + notJoinedMemberAccessToken)
                )
                .andExpect(status().isNoContent());
    }
}
