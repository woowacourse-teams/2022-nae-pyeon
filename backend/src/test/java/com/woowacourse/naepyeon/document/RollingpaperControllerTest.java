package com.woowacourse.naepyeon.document;

import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.woowacourse.naepyeon.controller.dto.CreateMemberRollingpaperRequest;
import com.woowacourse.naepyeon.controller.dto.CreateTeamRollingpaperRequest;
import com.woowacourse.naepyeon.controller.dto.RollingpaperUpdateRequest;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;

class RollingpaperControllerTest extends TestSupport {

    @Test
    void createMemberRollingpaper() throws Exception {
        final CreateMemberRollingpaperRequest createMemberRollingpaperRequest =
                new CreateMemberRollingpaperRequest("어서오세요", memberId2);
        mockMvc.perform(
                        post("/api/v1/teams/{teamId}/rollingpapers", teamId)
                                .header("Authorization", "Bearer " + accessToken)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(createMemberRollingpaperRequest))
                )
                .andExpect(status().isCreated())
                .andDo(restDocs.document());
    }

    @Test
    void createTeamRollingpaper() throws Exception {
        final CreateTeamRollingpaperRequest createTeamRollingpaperRequest =
                new CreateTeamRollingpaperRequest("우아한 테크 코스에게 하고 싶은 말");
        mockMvc.perform(
                        post("/api/v1/teams/{teamId}/team-rollingpapers", teamId)
                                .header("Authorization", "Bearer " + accessToken)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(createTeamRollingpaperRequest))
                )
                .andExpect(status().isCreated())
                .andDo(restDocs.document());
    }

    @Test
    void findRollingpaperById() throws Exception {
        mockMvc.perform(
                        get("/api/v1/teams/{teamId}/rollingpapers/{rollingpaperId}", teamId, rollingpaperId1)
                                .header("Authorization", "Bearer " + accessToken)
                )
                .andExpect(status().isOk())
                .andDo(restDocs.document());
    }

    @Test
    void findRollingpapersByTeamIdAndOldestOrder() throws Exception {
        mockMvc.perform(
                        get("/api/v1/teams/{teamId}/rollingpapers", teamId)
                                .header("Authorization", "Bearer " + accessToken)
                                .queryParam("order", "oldest")
                )
                .andExpect(status().isOk())
                .andDo(restDocs.document());
    }

    @Test
    void findRollingpapersByTeamIdAndLatestOrder() throws Exception {
        mockMvc.perform(
                        get("/api/v1/teams/{teamId}/rollingpapers", teamId)
                                .header("Authorization", "Bearer " + accessToken)
                                .queryParam("order", "latest")
                )
                .andExpect(status().isOk())
                .andDo(restDocs.document());
    }

    @Test
    void findMemberRollingpapersByTeamId() throws Exception {
        mockMvc.perform(
                        get("/api/v1/teams/{teamId}/rollingpapers", teamId)
                                .header("Authorization", "Bearer " + accessToken)
                                .queryParam("filter", "member")
                )
                .andExpect(status().isOk())
                .andDo(restDocs.document());
    }

    @Test
    void findTeamRollingpapersByTeamId() throws Exception {
        mockMvc.perform(
                        get("/api/v1/teams/{teamId}/rollingpapers", teamId)
                                .header("Authorization", "Bearer " + accessToken)
                                .param("filter", "team")
                )
                .andExpect(status().isOk())
                .andDo(restDocs.document());
    }

    @Test
    void updateRollingpaper() throws Exception {
        final RollingpaperUpdateRequest rollingpaperUpdateRequest = new RollingpaperUpdateRequest("오늘 하루도 수고했어");
        mockMvc.perform(
                        put("/api/v1/teams/{teamId}/rollingpapers/{rollingpaperId}", teamId, rollingpaperId2)
                                .header("Authorization", "Bearer " + joinedMemberAccessToken)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(rollingpaperUpdateRequest))
                )
                .andExpect(status().isNoContent())
                .andDo(restDocs.document());
    }
}
