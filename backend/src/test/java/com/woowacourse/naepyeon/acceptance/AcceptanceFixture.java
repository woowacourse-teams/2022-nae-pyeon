package com.woowacourse.naepyeon.acceptance;

import com.woowacourse.naepyeon.controller.dto.CreateResponse;
import com.woowacourse.naepyeon.controller.dto.JoinTeamMemberRequest;
import com.woowacourse.naepyeon.controller.dto.MemberRegisterRequest;
import com.woowacourse.naepyeon.controller.dto.MemberUpdateRequest;
import com.woowacourse.naepyeon.controller.dto.MessageRequest;
import com.woowacourse.naepyeon.controller.dto.MessageUpdateContentRequest;
import com.woowacourse.naepyeon.controller.dto.RollingpaperCreateRequest;
import com.woowacourse.naepyeon.controller.dto.RollingpaperUpdateRequest;
import com.woowacourse.naepyeon.controller.dto.TeamRequest;
import com.woowacourse.naepyeon.controller.dto.TokenRequest;
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

    public static TokenResponseDto ????????????_???_?????????(final MemberRegisterRequest member) {
        ??????_??????(member);
        return ?????????_??????(new TokenRequest(member.getEmail(), member.getPassword()))
                .as(TokenResponseDto.class);
    }

    public static Long ??????_??????(final TokenResponseDto tokenResponseDto) {
        final TeamRequest teamRequest = new TeamRequest(
                "woowacourse-4th",
                "????????? ???????????????.",
                "testEmoji",
                "#123456",
                "??????????????????"
        );
        return ??????_??????(tokenResponseDto, teamRequest).as(CreateResponse.class)
                .getId();
    }

    public static ExtractableResponse<Response> ??????_??????(final MemberRegisterRequest member) {
        return member_post(member, "/api/v1/members");
    }

    public static ExtractableResponse<Response> ??????_??????(final TokenResponseDto tokenResponseDto) {
        return get(tokenResponseDto, "/api/v1/members/me");
    }

    public static ExtractableResponse<Response> ??????_????????????_??????(final TokenResponseDto tokenResponseDto,
                                                           final MemberUpdateRequest memberUpdateRequest) {
        return put(tokenResponseDto, memberUpdateRequest, "/api/v1/members/me");
    }

    public static ExtractableResponse<Response> ??????_??????(final TokenResponseDto tokenResponseDto) {
        return delete(tokenResponseDto, "/api/v1/members/me");
    }

    public static ExtractableResponse<Response> ??????_??????(final TokenResponseDto tokenResponseDto,
                                                      final TeamRequest teamRequest) {
        return post(tokenResponseDto, teamRequest, "/api/v1/teams");
    }

    public static ExtractableResponse<Response> ??????_??????_??????(final TokenResponseDto tokenResponseDto,
                                                         final Long id, final TeamRequest teamRequest) {
        return put(tokenResponseDto, teamRequest, "/api/v1/teams/" + id);
    }

    public static ExtractableResponse<Response> ??????_??????(final TokenResponseDto tokenResponseDto, final Long id) {
        return delete(tokenResponseDto, "/api/v1/teams/" + id);
    }

    public static ExtractableResponse<Response> ?????????_??????(final TokenRequest tokenRequest) {
        return member_post(tokenRequest, "/api/v1/login");
    }

    public static ExtractableResponse<Response> ??????_??????(final TokenResponseDto tokenResponseDto,
                                                      final Long teamId,
                                                      final JoinTeamMemberRequest joinTeamMemberRequest) {
        return post(tokenResponseDto, joinTeamMemberRequest, "/api/v1/teams/" + teamId);
    }

    public static ExtractableResponse<Response> ??????_??????_??????(final TokenResponseDto tokenResponseDto,
                                                         final Long teamId) {
        return get(tokenResponseDto, "/api/v1/teams/" + teamId);
    }

    public static ExtractableResponse<Response> ??????_??????_??????(final TokenResponseDto tokenResponseDto) {
        return get(tokenResponseDto, "/api/v1/teams");
    }

    public static ExtractableResponse<Response> ?????????_??????_??????(final TokenResponseDto tokenResponseDto) {
        return get(tokenResponseDto, "/api/v1/teams/me");
    }

    public static ExtractableResponse<Response> ?????????_?????????_??????_??????(final TokenResponseDto tokenResponseDto,
                                                              final Long teamId) {
        return get(tokenResponseDto, "/api/v1/teams/" + teamId + "/members");
    }

    public static ExtractableResponse<Response> ??????_???????????????_??????(final TokenResponseDto tokenResponseDto,
                                                            final Long teamId,
                                                            final RollingpaperCreateRequest rollingpaperCreateRequest) {
        return post(tokenResponseDto, rollingpaperCreateRequest, "/api/v1/teams/" + teamId + "/rollingpapers");
    }

    public static ExtractableResponse<Response> ??????_???????????????_??????(final TokenResponseDto tokenResponseDto,
                                                            final Long teamId) {
        return get(tokenResponseDto, "/api/v1/teams/" + teamId + "/rollingpapers/me");
    }

    public static ExtractableResponse<Response> ???????????????_??????_??????(final TokenResponseDto tokenResponseDto,
                                                            final Long teamId, final Long rollingpaperId) {
        return get(tokenResponseDto, "/api/v1/teams/" + teamId + "/rollingpapers/" + rollingpaperId);
    }

    public static ExtractableResponse<Response> ??????_??????_?????????_???????????????_??????(final TokenResponseDto tokenResponseDto,
                                                                   final Long teamId) {
        return get(tokenResponseDto, "/api/v1/teams/" + teamId + "/rollingpapers");
    }

    public static ExtractableResponse<Response> ???????????????_??????_??????(final TokenResponseDto tokenResponseDto, final Long teamId,
                                                            final Long rollingpaperId,
                                                            final RollingpaperUpdateRequest updateRequest) {
        return put(tokenResponseDto, updateRequest, "/api/v1/teams/" + teamId + "/rollingpapers/" + rollingpaperId);
    }

    public static ExtractableResponse<Response> ?????????_??????(final TokenResponseDto tokenResponseDto,
                                                       final Long rollingpaperId,
                                                       final MessageRequest messageRequest) {
        return post(tokenResponseDto, messageRequest, "/api/v1/rollingpapers/" + rollingpaperId + "/messages");
    }

    public static ExtractableResponse<Response> ?????????_??????(final TokenResponseDto tokenResponseDto,
                                                       final Long rollingpaperId,
                                                       final Long messageId,
                                                       final MessageUpdateContentRequest messageUpdateContentRequest) {
        return put(tokenResponseDto, messageUpdateContentRequest,
                "/api/v1/rollingpapers/" + rollingpaperId + "/messages/" + messageId);
    }

    public static ExtractableResponse<Response> ?????????_??????(final TokenResponseDto tokenResponseDto,
                                                       final Long rollingpaperId,
                                                       final Long messageId) {
        return delete(tokenResponseDto, "/api/v1/rollingpapers/" + rollingpaperId + "/messages/" + messageId);
    }

    public static ExtractableResponse<Response> ?????????_??????(final TokenResponseDto tokenResponseDto,
                                                final Long rollingpaperId,
                                                final Long messageId) {
        return get(tokenResponseDto, "/api/v1/rollingpapers/" + rollingpaperId + "/messages/" + messageId);
    }
}
