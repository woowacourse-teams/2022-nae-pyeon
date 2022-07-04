package com.woowacourse.naepyeon.acceptance;

import com.woowacourse.naepyeon.controller.dto.TeamRequest;
import io.restassured.RestAssured;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

import static org.assertj.core.api.Assertions.assertThat;

public class TeamAcceptanceTest extends AcceptanceTest {

    @Test
    @DisplayName("모임 추가")
    void addTeam() {
        //모임 생성
        TeamRequest teamRequest = new TeamRequest("woowacourse");
        ExtractableResponse<Response> response = 모임_추가(teamRequest);

        //모임이 추가됨
        모임이_추가됨(response);
    }

    @Test
    @DisplayName("모임 이름 수정")
    void updateTeam() {
        // 모임 생성
        TeamRequest teamRequest = new TeamRequest("woowacourse-4th");
        모임_추가(teamRequest);

        // 모임 이름 수정
        TeamRequest changeTeamRequest = new TeamRequest("woowacourse-5th");
        final ExtractableResponse<Response> response = 모임_이름_수정(1L, changeTeamRequest);

        // 모임이름이 수정됨
        모임이름이_수정됨(response);
    }

    @Test
    @DisplayName("모임 삭제")
    void deleteTeam() {
        //모임 생성
        TeamRequest teamRequest = new TeamRequest("woowacourse");
        모임_추가(teamRequest);

        //모임 삭제
        ExtractableResponse<Response> response = 모임_삭제(1L);

        //모임이 삭제됨
        모임_삭제됨(response);
    }

    private ExtractableResponse<Response> 모임_삭제(final Long id) {
        return RestAssured.given().log().all()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .when().delete("/api/v1/teams/" + id)
                .then().log().all()
                .extract();
    }

    private void 모임_삭제됨(ExtractableResponse<Response> response) {
        assertThat(response.statusCode()).isEqualTo(HttpStatus.NO_CONTENT.value());
    }

    private ExtractableResponse<Response> 모임_이름_수정(final Long id, final TeamRequest teamRequest) {
        return RestAssured.given().log().all()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .body(teamRequest)
                .when().put("/api/v1/teams/" + id)
                .then().log().all()
                .extract();
    }

    private void 모임이름이_수정됨(ExtractableResponse<Response> response) {
        assertThat(response.statusCode()).isEqualTo(HttpStatus.NO_CONTENT.value());
    }

    private ExtractableResponse<Response> 모임_추가(TeamRequest teamRequest) {
        return RestAssured.given().log().all()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .body(teamRequest)
                .when().post("/api/v1/teams")
                .then().log().all()
                .extract();
    }

    private void 모임이_추가됨(ExtractableResponse<Response> response) {
        assertThat(response.statusCode()).isEqualTo(HttpStatus.CREATED.value());
        assertThat(response.header("Location")).isNotBlank();
    }

}
