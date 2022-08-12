package com.woowacourse.naepyeon.document;

import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.woowacourse.naepyeon.controller.dto.InviteJoinRequest;
import com.woowacourse.naepyeon.support.InviteTokenProvider;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;

class TeamControllerTest extends TestSupport {

    @Autowired
    private InviteTokenProvider inviteTokenProvider;

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
                        get("/api/v1/teams/me?page=0&count=10")
                                .header("Authorization", "Bearer " + joinedMemberAccessToken)
                )
                .andExpect(status().isOk())
                .andDo(restDocs.document());
    }

    @Test
    void getAllTeams() throws Exception {
        mockMvc.perform(
                        get("/api/v1/teams?keyword=&page=0&count=10")
                                .header("Authorization", "Bearer " + joinedMemberAccessToken)
                )
                .andExpect(status().isOk())
                .andDo(restDocs.document());

    }

    @Test
    void getAllTeamsByKeyword() throws Exception {
        mockMvc.perform(
                        get("/api/v1/teams?keyword=우테코&page=0&count=10")
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

    @Test
    void getMyInfoInTeam() throws Exception {
        mockMvc.perform(
                        get("/api/v1/teams/{teamId}/me", teamId)
                                .header("Authorization", "Bearer " + joinedMemberAccessToken)
                )
                .andExpect(status().isOk())
                .andDo(restDocs.document());
    }

    @Test
    void updateMyInfo() throws Exception {
        mockMvc.perform(
                        put("/api/v1/teams/{teamId}/me", teamId)
                                .header("Authorization", "Bearer " + joinedMemberAccessToken)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(readJson("/json/teams/update-my-info.json"))
                )
                .andExpect(status().isNoContent())
                .andDo(restDocs.document());
    }

    @Test
    void createInviteToken() throws Exception {
        mockMvc.perform(
                        post("/api/v1/teams/{teamId}/invite", teamId)
                                .header("Authorization", "Bearer " + joinedMemberAccessToken)
                                .contentType(MediaType.APPLICATION_JSON)
                ).andExpect(status().isOk())
                .andDo(restDocs.document());
    }

    @Test
    void getTeamIdByInviteToken() throws Exception {
        final String inviteToken = inviteTokenProvider.createInviteToken(teamId);
        mockMvc.perform(
                        get("/api/v1/teams/invite?inviteToken=" + inviteToken)
                                .header("Authorization", "Bearer " + joinedMemberAccessToken)
                                .contentType(MediaType.APPLICATION_JSON)
                ).andExpect(status().isOk())
                .andDo(restDocs.document());
    }

    @Test
    void inviteJoin() throws Exception {
        final String inviteToken = inviteTokenProvider.createInviteToken(teamId);
        final InviteJoinRequest inviteJoinRequest = new InviteJoinRequest(inviteToken, "모임가입닉네임");
        mockMvc.perform(
                        post("/api/v1/teams/invite/join")
                                .header("Authorization", "Bearer " + notJoinedMemberAccessToken)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(inviteJoinRequest))
                ).andExpect(status().isNoContent())
                .andDo(restDocs.document());
    }
}
