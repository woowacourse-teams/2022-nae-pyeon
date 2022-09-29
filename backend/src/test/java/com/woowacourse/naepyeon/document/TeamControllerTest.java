package com.woowacourse.naepyeon.document;

import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.woowacourse.naepyeon.controller.dto.InviteJoinRequest;
import com.woowacourse.naepyeon.controller.dto.JoinTeamMemberRequest;
import com.woowacourse.naepyeon.controller.dto.TeamRequest;
import com.woowacourse.naepyeon.controller.dto.TeamUpdateRequest;
import com.woowacourse.naepyeon.controller.dto.UpdateTeamParticipantRequest;
import com.woowacourse.naepyeon.domain.Team;
import com.woowacourse.naepyeon.domain.invitecode.InviteCode;
import com.woowacourse.naepyeon.repository.invitecode.InviteCodeRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;

class TeamControllerTest extends TestSupport {

    @Autowired
    InviteCodeRepository inviteCodeRepository;

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
        final TeamRequest teamRequest = new TeamRequest("우아한 테크코스 4기", "우아한 테크코스 4기 모임입니다.", "\uD83D\uDC4D", "#C5FF98",
                "우아한 테크코스", false);
        mockMvc.perform(
                        post("/api/v1/teams")
                                .header("Authorization", "Bearer " + joinedMemberAccessToken)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(teamRequest))
                )
                .andExpect(status().isCreated())
                .andDo(restDocs.document());
    }

    @Test
    void updateTeam() throws Exception {
        final TeamUpdateRequest teamUpdateRequest = new TeamUpdateRequest("우아한 테크코스 5기");
        mockMvc.perform(
                        put("/api/v1/teams/{teamId}", teamId)
                                .header("Authorization", "Bearer " + joinedMemberAccessToken)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(teamUpdateRequest))
                )
                .andExpect(status().isNoContent())
                .andDo(restDocs.document());
    }

    @Test
    void joinMember() throws Exception {
        final JoinTeamMemberRequest joinTeamMemberRequest = new JoinTeamMemberRequest("승팡");
        mockMvc.perform(
                        post("/api/v1/teams/{teamId}", teamId)
                                .header("Authorization", "Bearer " + notJoinedMemberAccessToken)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(joinTeamMemberRequest))
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
        final UpdateTeamParticipantRequest updateTeamParticipantRequest = new UpdateTeamParticipantRequest("승파팡");
        mockMvc.perform(
                        put("/api/v1/teams/{teamId}/me", teamId)
                                .header("Authorization", "Bearer " + joinedMemberAccessToken)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(updateTeamParticipantRequest))
                )
                .andExpect(status().isNoContent())
                .andDo(restDocs.document());
    }

    @Test
    void createInviteCode() throws Exception {
        mockMvc.perform(
                        post("/api/v1/teams/{teamId}/invite", teamId)
                                .header("Authorization", "Bearer " + joinedMemberAccessToken)
                                .contentType(MediaType.APPLICATION_JSON)
                ).andExpect(status().isOk())
                .andDo(restDocs.document());
    }

    @Test
    void getTeamIdByInviteCode() throws Exception {
        final Team team = teamRepository.findById(teamId).get();
        final InviteCode inviteCode = team.createInviteCode(() -> "abc");
        inviteCodeRepository.save(inviteCode);
        mockMvc.perform(
                        get("/api/v1/teams/invite?inviteToken=" + inviteCode.getCode())
                                .header("Authorization", "Bearer " + joinedMemberAccessToken)
                                .contentType(MediaType.APPLICATION_JSON)
                ).andExpect(status().isOk())
                .andDo(restDocs.document());
    }

    @Test
    void inviteJoin() throws Exception {
        final Team team = teamRepository.findById(teamId).get();
        final InviteCode inviteCode = team.createInviteCode(() -> "abc");
        inviteCodeRepository.save(inviteCode);
        final InviteJoinRequest inviteJoinRequest = new InviteJoinRequest(inviteCode.getCode(), "모임가입닉네임");
        mockMvc.perform(
                        post("/api/v1/teams/invite/join")
                                .header("Authorization", "Bearer " + notJoinedMemberAccessToken)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(inviteJoinRequest))
                ).andExpect(status().isNoContent())
                .andDo(restDocs.document());
    }
}
