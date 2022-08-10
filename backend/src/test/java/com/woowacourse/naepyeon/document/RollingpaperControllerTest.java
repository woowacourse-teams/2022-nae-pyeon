package com.woowacourse.naepyeon.document;

import com.woowacourse.naepyeon.controller.dto.CreateMemberRollingpaperRequest;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;

import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class RollingpaperControllerTest extends TestSupport {

    @Test
    void createRollingpaper() throws Exception {
        mockMvc.perform(
                        post("/api/v1/teams/{teamId}/rollingpapers", teamId)
                                .header("Authorization", "Bearer " + accessToken)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(new CreateMemberRollingpaperRequest("어서오세요", memberId2)))
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
    void findRollingpapersByTeamId() throws Exception {
        mockMvc.perform(
                        get("/api/v1/teams/{teamId}/rollingpapers", teamId)
                                .header("Authorization", "Bearer " + accessToken)
                )
                .andExpect(status().isOk())
                .andDo(restDocs.document());
    }

    @Test
    void updateRollingpaper() throws Exception {
        mockMvc.perform(
                        put("/api/v1/teams/{teamId}/rollingpapers/{rollingpaperId}", teamId, rollingpaperId2)
                                .header("Authorization", "Bearer " + joinedMemberAccessToken)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(readJson("/json/rollingpapers/rollingpaper-update.json"))
                )
                .andExpect(status().isNoContent())
                .andDo(restDocs.document());
    }
}
