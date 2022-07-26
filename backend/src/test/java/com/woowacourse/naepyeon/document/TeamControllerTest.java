package com.woowacourse.naepyeon.document;

import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;

class TeamControllerTest extends TestSupport {

    @Test
    void getTeam() throws Exception {
        mockMvc.perform(
                        get("/api/v1/teams/{teamId}", 1L)
                                .header("Authorization", "Bearer " + teamMemberAccessToken)
                )
                .andExpect(status().isOk())
                .andDo(restDocs.document());
    }

    @Test
    void getJoinedTeams() throws Exception {
        mockMvc.perform(
                        get("/api/v1/teams/me")
                                .header("Authorization", "Bearer " + teamMemberAccessToken)
                )
                .andExpect(status().isOk())
                .andDo(restDocs.document());
    }

    @Test
    void getAllTeams() throws Exception {
        mockMvc.perform(
                        get("/api/v1/teams")
                                .header("Authorization", "Bearer " + teamMemberAccessToken)
                )
                .andExpect(status().isOk())
                .andDo(restDocs.document());

    }

    @Test
    void getJoinedMembers() throws Exception {
        mockMvc.perform(
                        get("/api/v1/teams/{teamId}/members", 1L)
                                .header("Authorization", "Bearer " + teamMemberAccessToken)
                )
                .andExpect(status().isOk())
                .andDo(restDocs.document());
    }

    @Test
    void createTeam() throws Exception {
        mockMvc.perform(
                        post("/api/v1/teams")
                                .header("Authorization", "Bearer " + teamMemberAccessToken)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(readJson("/json/teams/team-create.json"))
                )
                .andExpect(status().isCreated())
                .andDo(restDocs.document());
    }

    @Test
    void updateTeam() throws Exception {
        mockMvc.perform(
                        put("/api/v1/teams/{teamId}", 1L)
                                .header("Authorization", "Bearer " + teamMemberAccessToken)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(readJson("/json/teams/team-update.json"))
                )
                .andExpect(status().isNoContent())
                .andDo(restDocs.document());
    }

    @Test
    void joinMember() throws Exception {
        mockMvc.perform(
                        post("/api/v1/teams/{teamId}", 1L)
                                .header("Authorization", "Bearer " + accessToken)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(readJson("/json/teams/team-join.json"))
                )
                .andExpect(status().isNoContent())
                .andDo(restDocs.document());
    }
}
