package com.woowacourse.naepyeon.acceptance;

import com.woowacourse.naepyeon.controller.dto.CreateMemberRollingpaperRequest;
import com.woowacourse.naepyeon.controller.dto.CreateResponse;
import com.woowacourse.naepyeon.controller.dto.CreateTeamRollingpaperRequest;
import com.woowacourse.naepyeon.controller.dto.JoinTeamMemberRequest;
import com.woowacourse.naepyeon.controller.dto.MemberUpdateRequest;
import com.woowacourse.naepyeon.controller.dto.MessageRequest;
import com.woowacourse.naepyeon.controller.dto.MessageUpdateRequest;
import com.woowacourse.naepyeon.controller.dto.RollingpaperUpdateRequest;
import com.woowacourse.naepyeon.controller.dto.TeamRequest;
import com.woowacourse.naepyeon.controller.dto.TokenRequest;
import com.woowacourse.naepyeon.controller.dto.UpdateTeamParticipantRequest;
import com.woowacourse.naepyeon.service.dto.TokenResponseDto;
import io.restassured.RestAssured;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import org.springframework.http.MediaType;

public class AcceptanceFixture {

    public static ExtractableResponse<Response> member_post(final Object body, final String uri) {
        return RestAssured.given().log().all()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .body(body)
                .when().post(uri)
                .then().log().all()
                .extract();
    }

    public static ExtractableResponse<Response> post(final TokenResponseDto tokenResponseDto,
                                                     final Object body, final String uri) {
        return RestAssured.given().log().all()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .auth().oauth2(tokenResponseDto.getAccessToken())
                .body(body)
                .when().post(uri)
                .then().log().all()
                .extract();
    }

    public static ExtractableResponse<Response> get(final TokenResponseDto tokenResponseDto,
                                                    final String uri) {
        return RestAssured.given().log().all()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .auth().oauth2(tokenResponseDto.getAccessToken())
                .when().get(uri)
                .then().log().all()
                .extract();
    }

    public static ExtractableResponse<Response> get_search(
            final TokenResponseDto tokenResponseDto, final String uri,
            final String keyword, final int page, final int count) {
        return RestAssured.given().log().all()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .auth().oauth2(tokenResponseDto.getAccessToken())
                .queryParam("keyword", keyword)
                .queryParam("page", page)
                .queryParam("count", count)
                .when().get(uri)
                .then().log().all()
                .extract();
    }

    public static ExtractableResponse<Response> put(final TokenResponseDto tokenResponseDto, final Object body,
                                                    final String uri) {
        return RestAssured.given().log().all()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .auth().oauth2(tokenResponseDto.getAccessToken())
                .body(body)
                .put(uri)
                .then().log().all()
                .extract();
    }

    public static ExtractableResponse<Response> delete(final TokenResponseDto tokenResponseDto, final String uri) {
        return RestAssured.given().log().all()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .auth().oauth2(tokenResponseDto.getAccessToken())
                .when().delete(uri)
                .then().log().all()
                .extract();
    }

    public static Long 모임_생성(final TokenResponseDto tokenResponseDto) {
        final TeamRequest teamRequest = new TeamRequest(
                "woowacourse-4th",
                "테스트 모임입니다.",
                "testEmoji",
                "#123456",
                "나는야모임장",
                false
        );
        return 모임_추가(tokenResponseDto, teamRequest).as(CreateResponse.class)
                .getId();
    }

    public static ExtractableResponse<Response> 회원_조회(final TokenResponseDto tokenResponseDto) {
        return get(tokenResponseDto, "/api/v1/members/me");
    }

    public static ExtractableResponse<Response> 회원_유저네임_수정(final TokenResponseDto tokenResponseDto,
                                                           final MemberUpdateRequest memberUpdateRequest) {
        return put(tokenResponseDto, memberUpdateRequest, "/api/v1/members/me");
    }

    public static ExtractableResponse<Response> 회원_삭제(final TokenResponseDto tokenResponseDto) {
        return delete(tokenResponseDto, "/api/v1/members/me");
    }

    public static ExtractableResponse<Response> 모임_추가(final TokenResponseDto tokenResponseDto,
                                                      final TeamRequest teamRequest) {
        return post(tokenResponseDto, teamRequest, "/api/v1/teams");
    }

    public static ExtractableResponse<Response> 모임_이름_수정(final TokenResponseDto tokenResponseDto,
                                                         final Long id, final TeamRequest teamRequest) {
        return put(tokenResponseDto, teamRequest, "/api/v1/teams/" + id);
    }

    public static ExtractableResponse<Response> 모임_삭제(final TokenResponseDto tokenResponseDto, final Long id) {
        return delete(tokenResponseDto, "/api/v1/teams/" + id);
    }

    public static ExtractableResponse<Response> 로그인_응답(final TokenRequest tokenRequest) {
        return member_post(tokenRequest, "/api/v1/login");
    }

    public static ExtractableResponse<Response> 모임_가입(final TokenResponseDto tokenResponseDto,
                                                      final Long teamId,
                                                      final JoinTeamMemberRequest joinTeamMemberRequest) {
        return post(tokenResponseDto, joinTeamMemberRequest, "/api/v1/teams/" + teamId);
    }

    public static ExtractableResponse<Response> 모임_단건_조회(final TokenResponseDto tokenResponseDto,
                                                         final Long teamId) {
        return get(tokenResponseDto, "/api/v1/teams/" + teamId);
    }

    public static ExtractableResponse<Response> 키워드로_모든_모임_조회(
            final TokenResponseDto tokenResponseDto, final String keyword, final int page, final int count) {
        return get_search(tokenResponseDto, "/api/v1/teams", keyword, page, count);
    }

    public static ExtractableResponse<Response> 가입한_모임_조회(
            final TokenResponseDto tokenResponseDto, final int page, final int count) {
        return get_search(tokenResponseDto, "/api/v1/teams/me", "", page, count);
    }

    public static ExtractableResponse<Response> 모임에_가입한_회원_목록_조회(final TokenResponseDto tokenResponseDto,
                                                                 final Long teamId) {
        return get(tokenResponseDto, "/api/v1/teams/" + teamId + "/members");
    }

    public static ExtractableResponse<Response> 모임_가입_정보_조회(final TokenResponseDto tokenResponseDto,
                                                            final Long teamId) {
        return get(tokenResponseDto, "/api/v1/teams/" + teamId + "/me");
    }

    public static ExtractableResponse<Response> 모임_내_닉네임_변경(final TokenResponseDto tokenResponseDto, final Long teamId,
                                                            final UpdateTeamParticipantRequest updateTeamParticipantRequest) {
        return put(tokenResponseDto, updateTeamParticipantRequest, "/api/v1/teams/" + teamId + "/me");
    }

    public static ExtractableResponse<Response> 회원_롤링페이퍼_생성(final TokenResponseDto tokenResponseDto,
                                                            final Long teamId,
                                                            final CreateMemberRollingpaperRequest createMemberRollingpaperRequest) {
        return post(tokenResponseDto, createMemberRollingpaperRequest, "/api/v1/teams/" + teamId + "/rollingpapers");
    }

    public static ExtractableResponse<Response> 모임_롤링페이퍼_생성(final TokenResponseDto tokenResponseDto,
                                                            final Long teamId,
                                                            final CreateTeamRollingpaperRequest createTeamRollingpaperRequest) {
        return post(tokenResponseDto, createTeamRollingpaperRequest, "/api/v1/teams/" + teamId + "/team-rollingpapers");
    }

    public static ExtractableResponse<Response> 나의_롤링페이퍼_조회(
            final TokenResponseDto tokenResponseDto, final int page, final int count) {
        return get_search(tokenResponseDto, "/api/v1/members/me/rollingpapers/received", "", page, count);
    }

    public static ExtractableResponse<Response> 롤링페이퍼_특정_조회(final TokenResponseDto tokenResponseDto,
                                                            final Long teamId, final Long rollingpaperId) {
        return get(tokenResponseDto, "/api/v1/teams/" + teamId + "/rollingpapers/" + rollingpaperId);
    }

    public static ExtractableResponse<Response> 모임_모든_회원들_롤링페이퍼_조회(final TokenResponseDto tokenResponseDto,
                                                                   final Long teamId) {
        return get(tokenResponseDto, "/api/v1/teams/" + teamId + "/rollingpapers");
    }

    public static ExtractableResponse<Response> 롤링페이퍼_제목_수정(final TokenResponseDto tokenResponseDto, final Long teamId,
                                                            final Long rollingpaperId,
                                                            final RollingpaperUpdateRequest updateRequest) {
        return put(tokenResponseDto, updateRequest, "/api/v1/teams/" + teamId + "/rollingpapers/" + rollingpaperId);
    }

    public static ExtractableResponse<Response> 메시지_작성(final TokenResponseDto tokenResponseDto,
                                                       final Long rollingpaperId,
                                                       final MessageRequest messageRequest) {
        return post(tokenResponseDto, messageRequest, "/api/v1/rollingpapers/" + rollingpaperId + "/messages");
    }

    public static ExtractableResponse<Response> 메시지_수정(final TokenResponseDto tokenResponseDto,
                                                       final Long rollingpaperId,
                                                       final Long messageId,
                                                       final MessageUpdateRequest messageUpdateRequest) {
        return put(tokenResponseDto, messageUpdateRequest,
                "/api/v1/rollingpapers/" + rollingpaperId + "/messages/" + messageId);
    }

    public static ExtractableResponse<Response> 메시지_삭제(final TokenResponseDto tokenResponseDto,
                                                       final Long rollingpaperId,
                                                       final Long messageId) {
        return delete(tokenResponseDto, "/api/v1/rollingpapers/" + rollingpaperId + "/messages/" + messageId);
    }

    public static ExtractableResponse<Response> 메시지_조회(final TokenResponseDto tokenResponseDto,
                                                       final Long rollingpaperId,
                                                       final Long messageId) {
        return get(tokenResponseDto, "/api/v1/rollingpapers/" + rollingpaperId + "/messages/" + messageId);
    }

    public static ExtractableResponse<Response> 나의_메시지_조회(
            final TokenResponseDto tokenResponseDto, final int page, final int count) {
        return get_search(tokenResponseDto, "/api/v1/members/me/messages/written", "", page, count);
    }

    public static ExtractableResponse<Response> 초대_토큰_생성(
            final TokenResponseDto tokenResponseDto, final Long teamId) {
        return post(tokenResponseDto, "", "/api/v1/teams/" + teamId + "/invite");
    }

    public static ExtractableResponse<Response> 초대_토큰으로_팀_상세_조회(
            final TokenResponseDto tokenResponseDto, final String inviteToken) {
        return get(tokenResponseDto, "/api/v1/teams/invite?inviteToken=" + inviteToken);
    }
}
