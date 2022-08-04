package com.woowacourse.naepyeon.document;

import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;

import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class TeamControllerTest extends TestSupport {

    @Test
    void getTeam() throws Exception {
        mockMvc.perform(
                        get("/api/v1/teams/{teamId}", teamId)
                                .header("Authorization", "Bearer " + joinedMemberAccessToken)
                )
                .andExpect(status().isOk())
                .andDo(restDocs.document());
    }

    @Test
    void getJoinedTeams() throws Exception {
        mockMvc.perform(
                        get("/api/v1/teams/me")
                                .header("Authorization", "Bearer " + joinedMemberAccessToken)
                )
                .andExpect(status().isOk())
                .andDo(restDocs.document());
    }

    @Test
    void getAllTeams() throws Exception {
        mockMvc.perform(
                        get("/api/v1/teams")
                                .header("Authorization", "Bearer " + joinedMemberAccessToken)
                )
                .andExpect(status().isOk())
                .andDo(restDocs.document());

    }

    @Test
    void getJoinedMembers() throws Exception {
        mockMvc.perform(
                        get("/api/v1/teams/{teamId}/members", teamId)
                                .header("Authorization", "Bearer " + joinedMemberAccessToken)
                )
                .andExpect(status().isOk())
                .andDo(restDocs.document());
    }

    @Test
    void createTeam() throws Exception {
        mockMvc.perform(
                        post("/api/v1/teams")
                                .header("Authorization", "Bearer " + joinedMemberAccessToken)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(readJson("/json/teams/team-create.json"))
                )
                .andExpect(status().isCreated())
                .andDo(restDocs.document());
    }

    @Test
    void updateTeam() throws Exception {
        mockMvc.perform(
                        put("/api/v1/teams/{teamId}", teamId)
                                .header("Authorization", "Bearer " + joinedMemberAccessToken)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(readJson("/json/teams/team-update.json"))
                )
                .andExpect(status().isNoContent())
                .andDo(restDocs.document());
    }

    @Test
    void joinMember() throws Exception {
        mockMvc.perform(
                        post("/api/v1/teams/{teamId}", teamId)
                                .header("Authorization", "Bearer " + notJoinedMemberAccessToken)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(readJson("/json/teams/team-join.json"))
                )
                .andExpect(status().isNoContent())
                .andDo(restDocs.document());
    }
}
