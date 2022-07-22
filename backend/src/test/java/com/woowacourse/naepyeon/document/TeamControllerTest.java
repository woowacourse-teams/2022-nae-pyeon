package com.woowacourse.naepyeon.document;

import static com.woowacourse.naepyeon.document.RestDocsConfiguration.field;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.responseHeaders;
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

class TeamControllerTest extends TestSupport {

    @Test
    void getTeam() throws Exception {
        mockMvc.perform(
                        get("/api/v1/teams/{teamId}", 1L)
                                .header("Authorization", "Bearer " + teamMemberAccessToken)
                )
                .andExpect(status().isOk())
                .andDo(
                        restDocs.document(
                                pathParameters(
                                        parameterWithName("teamId").description("모임 식별자 값")
                                ),
                                responseFields(
                                        fieldWithPath("id").description("모임 식별자 값"),
                                        fieldWithPath("name").description("모임 이름"),
                                        fieldWithPath("description").description("모임 설명"),
                                        fieldWithPath("emoji").description("모임 표시 이모지"),
                                        fieldWithPath("color").description("모임 표시 색깔"),
                                        fieldWithPath("joined").description("모임에 대한 참가 여부")
                                )
                        )
                );
    }

    @Test
    void getJoinedTeams() throws Exception {
        mockMvc.perform(
                        get("/api/v1/teams/me")
                                .header("Authorization", "Bearer " + teamMemberAccessToken)
                )
                .andExpect(status().isOk())
                .andDo(
                        restDocs.document(
                                responseFields(
                                        fieldWithPath("teams.[].id").description("모임 식별자 값"),
                                        fieldWithPath("teams.[].name").description("모임 이름"),
                                        fieldWithPath("teams.[].description").description("모임 설명"),
                                        fieldWithPath("teams.[].emoji").description("모임 표시 이모지"),
                                        fieldWithPath("teams.[].color").description("모임 표시 색깔"),
                                        fieldWithPath("teams.[].joined").description("모임에 대한 참가 여부")
                                )
                        )
                );
    }

    @Test
    void getAllTeams() throws Exception {
        mockMvc.perform(
                        get("/api/v1/teams")
                                .header("Authorization", "Bearer " + teamMemberAccessToken)
                )
                .andExpect(status().isOk())
                .andDo(
                        restDocs.document(
                                responseFields(
                                        fieldWithPath("teams.[].id").description("모임 식별자 값"),
                                        fieldWithPath("teams.[].name").description("모임 이름"),
                                        fieldWithPath("teams.[].description").description("모임 설명"),
                                        fieldWithPath("teams.[].emoji").description("모임 표시 이모지"),
                                        fieldWithPath("teams.[].color").description("모임 표시 색깔"),
                                        fieldWithPath("teams.[].joined").description("모임에 대한 참가 여부")
                                )
                        )
                );

    }

    @Test
    void getJoinedMembers() throws Exception {
        mockMvc.perform(
                        get("/api/v1/teams/{teamId}/members", 1L)
                                .header("Authorization", "Bearer " + teamMemberAccessToken)
                )
                .andExpect(status().isOk())
                .andDo(
                        restDocs.document(
                                pathParameters(
                                        parameterWithName("teamId").description("모임 식별자 값")
                                ),
                                responseFields(
                                        fieldWithPath("members.[].id").description("모임 참가자 식별자 값"),
                                        fieldWithPath("members.[].nickname").description("모임 참가자 닉네임")
                                )
                        )
                );
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
                .andDo(
                        restDocs.document(
                                requestFields(
                                        fieldWithPath("name").description("모임 이름")
                                                .attributes(field("length", "20자 이내")),
                                        fieldWithPath("description").description("모임 설명")
                                                .attributes(field("length", "100자 이내")),
                                        fieldWithPath("emoji").description("모임 설명에 표시되는 이모지")
                                                .attributes(field("length", "제한 없음")),
                                        fieldWithPath("color").description("모임이 표시되는 색상")
                                                .attributes(field("length", "15자 이내")),
                                        fieldWithPath("nickname").description("모임을 생성하는 유저의 닉네임")
                                                .attributes(field("length", "20자 이내"))
                                ),
                                responseHeaders(
                                        headerWithName("Location").description("리소스 위치")
                                )
                        )
                );
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
                .andDo(
                        restDocs.document(
                                requestFields(
                                        fieldWithPath("name").description("모임 이름")
                                                .attributes(field("length", "20자 이내")),
                                        fieldWithPath("description").description("모임 설명")
                                                .attributes(field("length", "100자 이내")),
                                        fieldWithPath("emoji").description("모임 설명에 표시되는 이모지")
                                                .attributes(field("length", "제한 없음")),
                                        fieldWithPath("color").description("모임이 표시되는 색상")
                                                .attributes(field("length", "15자 이내")),
                                        fieldWithPath("nickname").description("모임을 생성하는 유저의 닉네임")
                                                .attributes(field("length", "20자 이내"))
                                )
                        )
                );
    }

//    @Test
//    void deleteTeam() throws Exception {
//        mockMvc.perform(
//                        delete("/api/v1/teams/{teamId}", 1L)
//                                .header("Authorization", "Bearer " + teamMemberAccessToken)
//                )
//                .andExpect(status().isNoContent())
//                .andDo(
//                        restDocs.document(
//                                pathParameters(
//                                        parameterWithName("teamId").description("모임 식별자 값")
//                                )
//                        )
//                );
//    }

    @Test
    void joinMember() throws Exception {
        mockMvc.perform(
                        post("/api/v1/teams/{teamId}", 1L)
                                .header("Authorization", "Bearer " + accessToken)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(readJson("/json/teams/team-join.json"))
                )
                .andExpect(status().isNoContent())
                .andDo(
                        restDocs.document(
                                pathParameters(
                                        parameterWithName("teamId").description("모임 식별자 값")
                                ),
                                requestFields(
                                        fieldWithPath("nickname").description("모임에서 사용하는 닉네임")
                                )
                        )
                );
    }
}
