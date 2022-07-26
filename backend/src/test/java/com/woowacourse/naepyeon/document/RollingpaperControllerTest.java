package com.woowacourse.naepyeon.document;

import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.put;
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
                .andDo(restDocs.document());
    }

    @Test
    void findRollingpaperById() throws Exception {
        mockMvc.perform(
                        get("/api/v1/teams/{teamId}/rollingpapers/{rollingpaperId}", 1L, 1L)
                                .header("Authorization", "Bearer " + teamMemberAccessToken)
                )
                .andExpect(status().isOk())
                .andDo(restDocs.document());
    }

    @Test
    void findRollingpapersByTeamId() throws Exception {
        mockMvc.perform(
                        get("/api/v1/teams/{teamId}/rollingpapers", 1L)
                                .header("Authorization", "Bearer " + teamMemberAccessToken)
                )
                .andExpect(status().isOk())
                .andDo(restDocs.document());
    }

    @Test
    void findRollingpapersByMemberId() throws Exception {
        mockMvc.perform(
                        get("/api/v1/teams/{teamId}/rollingpapers/me", 1L)
                                .header("Authorization", "Bearer " + teamMemberAccessToken)
                )
                .andExpect(status().isOk())
                .andDo(restDocs.document());
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
                .andDo(restDocs.document());
    }
}
