package com.woowacourse.naepyeon.acceptance;

import com.woowacourse.naepyeon.controller.dto.CreateMemberRollingpaperRequest;
import com.woowacourse.naepyeon.controller.dto.CreateResponse;
import com.woowacourse.naepyeon.controller.dto.CreateTeamRollingpaperRequest;
import com.woowacourse.naepyeon.controller.dto.JoinTeamMemberRequest;
import com.woowacourse.naepyeon.controller.dto.RollingpaperUpdateRequest;
import com.woowacourse.naepyeon.controller.dto.TeamRequest;
import com.woowacourse.naepyeon.service.dto.ReceivedRollingpaperResponseDto;
import com.woowacourse.naepyeon.service.dto.ReceivedRollingpapersResponseDto;
import com.woowacourse.naepyeon.service.dto.RollingpaperPreviewResponseDto;
import com.woowacourse.naepyeon.service.dto.RollingpaperResponseDto;
import com.woowacourse.naepyeon.service.dto.RollingpapersResponseDto;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;

import java.util.List;
import java.util.stream.Collectors;

import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.나의_롤링페이퍼_조회;
import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.롤링페이퍼_제목_수정;
import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.롤링페이퍼_특정_조회;
import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.모임_가입;
import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.모임_롤링페이퍼_생성;
import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.모임_모든_회원들_롤링페이퍼_조회;
import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.모임_추가;
import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.회원_롤링페이퍼_생성;
import static org.assertj.core.api.Assertions.assertThat;

class RollingpaperAcceptanceTest extends AcceptanceTest {

    private final TeamRequest teamRequest = new TeamRequest(
            "woowacourse", "테스트 모임입니다.", "testEmoji", "#123456", "나는야모임장"
    );

    @Test
    @DisplayName("특정 회원에게 롤링페이퍼를 생성하고 조회한다.")
    void createRollingpaperToMember() {
        final Long teamId = 모임_추가(alex, teamRequest).as(CreateResponse.class)
                .getId();
        모임_가입(seungpang, teamId, new JoinTeamMemberRequest("영환이형도좋아요"));

        // when: seungpang이 yxxnghwan에게 롤링페이퍼 작성
        final CreateMemberRollingpaperRequest rollingpaperCreateRequest =
                new CreateMemberRollingpaperRequest("하이알렉스", alex.getId());
        final Long rollingpaperId = 회원_롤링페이퍼_생성(seungpang, teamId, rollingpaperCreateRequest)
                .as(CreateResponse.class)
                .getId();

        // then: yxxnghwan이 받은 롤링페이퍼 조회
        Long actual = 롤링페이퍼_특정_조회(alex, teamId, rollingpaperId)
                .as(RollingpaperResponseDto.class)
                .getId();

        assertThat(actual).isEqualTo(rollingpaperId);
    }

    @Test
    @DisplayName("특정 모임에게 롤링페이퍼를 생성하고 조회한다.")
    void createRollingpaperToTeam() {
        final Long teamId = 모임_추가(alex, teamRequest).as(CreateResponse.class)
                .getId();
        모임_가입(zero, teamId, new JoinTeamMemberRequest("닉네임"));

        // when: zero가 모임에게 롤링페이퍼 작성
        final CreateTeamRollingpaperRequest rollingpaperCreateRequest =
                new CreateTeamRollingpaperRequest("알사모에 대한 글");
        final Long rollingpaperId = 모임_롤링페이퍼_생성(zero, teamId, rollingpaperCreateRequest)
                .as(CreateResponse.class)
                .getId();

        // then: 모임 롤링페이퍼 조회
        Long actual = 롤링페이퍼_특정_조회(alex, teamId, rollingpaperId)
                .as(RollingpaperResponseDto.class)
                .getId();

        assertThat(actual).isEqualTo(rollingpaperId);
    }

    @Test
    @DisplayName("존재하지 않는 회원에게 롤링페이퍼를 생성하는 경우 예외를 발생시킨다.")
    void createRollingpaperWithNotFoundMember() {
        final Long teamId = 모임_추가(kei, teamRequest).as(CreateResponse.class)
                .getId();

        final CreateMemberRollingpaperRequest createMemberRollingpaperRequest =
                new CreateMemberRollingpaperRequest("하이알렉스", alex.getId());
        final ExtractableResponse<Response> response = 회원_롤링페이퍼_생성(kei, teamId, createMemberRollingpaperRequest);

        assertThat(response.statusCode()).isEqualTo(HttpStatus.NOT_FOUND.value());
    }

    @Test
    @DisplayName("존재하지 않는 모임에게 롤링페이퍼를 생성하는 경우 예외를 발생시킨다.")
    void createRollingpaperWithNotFoundTeam() {
        final CreateTeamRollingpaperRequest rollingpaperCreateRequest =
                new CreateTeamRollingpaperRequest("알사모에 대한 글");

        ExtractableResponse<Response> response = 모임_롤링페이퍼_생성(zero, 123456L, rollingpaperCreateRequest);

        assertThat(response.statusCode()).isEqualTo(HttpStatus.NOT_FOUND.value());
    }

    @Test
    @DisplayName("모임에 속하지 않은 사람이 모임의 멤버에게 롤링페이퍼를 생성하는 경우 예외를 발생시킨다.")
    void createMemberRollingpaperWithAnonymous() {
        final Long teamId = 모임_추가(alex, teamRequest).as(CreateResponse.class)
                .getId();

        final CreateMemberRollingpaperRequest createMemberRollingpaperRequest =
                new CreateMemberRollingpaperRequest("하이승팡", alex.getId());
        final ExtractableResponse<Response> response = 회원_롤링페이퍼_생성(zero, teamId, createMemberRollingpaperRequest);

        assertThat(response.statusCode()).isEqualTo(HttpStatus.FORBIDDEN.value());
    }

    @Test
    @DisplayName("모임에 속하지 않은 사람이 모임 롤링페이퍼를 생성하는 경우 예외를 발생시킨다.")
    void createTeamRollingpaperWithAnonymous() {
        final Long teamId = 모임_추가(alex, teamRequest).as(CreateResponse.class)
                .getId();

        final CreateTeamRollingpaperRequest rollingpaperCreateRequest =
                new CreateTeamRollingpaperRequest("알사모에 대한 글");
        final ExtractableResponse<Response> response = 모임_롤링페이퍼_생성(zero, teamId, rollingpaperCreateRequest);

        assertThat(response.statusCode()).isEqualTo(HttpStatus.FORBIDDEN.value());
    }

    @Test
    @DisplayName("특정 모임의 회원들 전체가 받은 롤링페이퍼 목록을 조회한다.")
    void findRollingpapersWithTeam() {
        final Long teamId = 모임_추가(alex, teamRequest).as(CreateResponse.class)
                .getId();

        모임_가입(seungpang, teamId, new JoinTeamMemberRequest("영환이형도좋아요"));
        모임_가입(kei, teamId, new JoinTeamMemberRequest("알고리즘이좋아요"));

        // when: seungpang이 yxxnghwan, kth990303에게 각각 롤링페이퍼 작성
        final CreateMemberRollingpaperRequest createMemberRollingpaperRequest1 =
                new CreateMemberRollingpaperRequest("하이알렉스", alex.getId());
        final Long rollingpaperId1 = 회원_롤링페이퍼_생성(seungpang, teamId, createMemberRollingpaperRequest1)
                .as(CreateResponse.class)
                .getId();
        final CreateMemberRollingpaperRequest createMemberRollingpaperRequest2 =
                new CreateMemberRollingpaperRequest("알고리즘좀그만해!", kei.getId());
        final Long rollingpaperId2 = 회원_롤링페이퍼_생성(seungpang, teamId, createMemberRollingpaperRequest2)
                .as(CreateResponse.class)
                .getId();

        // then
        final List<Long> actual = 모임_모든_회원들_롤링페이퍼_조회(seungpang, teamId).as(RollingpapersResponseDto.class)
                .getRollingpapers()
                .stream()
                .map(RollingpaperPreviewResponseDto::getId)
                .collect(Collectors.toUnmodifiableList());

        assertThat(actual).contains(rollingpaperId1, rollingpaperId2);
    }

    @Test
    @DisplayName("모임에 속하지 않은 회원이 롤링페이퍼를 조회할 경우 예외를 발생시킨다.")
    void findRollingpaperWithAnonymous() {
        final Long teamId = 모임_추가(seungpang, teamRequest).as(CreateResponse.class)
                .getId();

        모임_가입(kei, teamId, new JoinTeamMemberRequest("영환이형도좋아요"));

        final CreateMemberRollingpaperRequest createMemberRollingpaperRequest =
                new CreateMemberRollingpaperRequest("하이케이", kei.getId());
        final Long rollingpaperId = 회원_롤링페이퍼_생성(seungpang, teamId, createMemberRollingpaperRequest)
                .as(CreateResponse.class)
                .getId();

        final ExtractableResponse<Response> response = 롤링페이퍼_특정_조회(alex, teamId, rollingpaperId);

        assertThat(response.statusCode()).isEqualTo(HttpStatus.FORBIDDEN.value());
    }

    @Test
    @DisplayName("롤링페이퍼 이름을 수정한다.")
    void updateRollingpaperTitle() {
        final Long teamId = 모임_추가(seungpang, teamRequest).as(CreateResponse.class)
                .getId();

        모임_가입(alex, teamId, new JoinTeamMemberRequest("영환이형도좋아요"));

        final CreateMemberRollingpaperRequest createMemberRollingpaperRequest =
                new CreateMemberRollingpaperRequest("하이알렉스", alex.getId());
        final Long rollingpaperId = 회원_롤링페이퍼_생성(seungpang, teamId, createMemberRollingpaperRequest)
                .as(CreateResponse.class)
                .getId();

        final String expected = "알고리즘좀그만해!";
        final RollingpaperUpdateRequest rollingpaperUpdateRequest = new RollingpaperUpdateRequest("알고리즘좀그만해!");
        롤링페이퍼_제목_수정(seungpang, teamId, rollingpaperId, rollingpaperUpdateRequest);

        final String actual = 롤링페이퍼_특정_조회(seungpang, teamId, rollingpaperId).as(RollingpaperResponseDto.class)
                .getTitle();
        assertThat(actual).isEqualTo(expected);
    }

    @Test
    @DisplayName("롤링페이퍼 이름을 20자 초과하여 수정할 경우 예외를 발생시킨다.")
    void updateRollingpaperTitleWithExceedTitleLength() {
        final Long teamId = 모임_추가(seungpang, teamRequest).as(CreateResponse.class)
                .getId();

        모임_가입(alex, teamId, new JoinTeamMemberRequest("영환이형도좋아요"));

        final CreateMemberRollingpaperRequest createMemberRollingpaperRequest =
                new CreateMemberRollingpaperRequest("하이알렉스", alex.getId());
        final Long rollingpaperId = 회원_롤링페이퍼_생성(seungpang, teamId, createMemberRollingpaperRequest)
                .as(CreateResponse.class)
                .getId();

        final RollingpaperUpdateRequest rollingpaperUpdateRequest =
                new RollingpaperUpdateRequest("알렉스. 사실은 나도 케이만큼 알고리즘 좋아하는데 숨기는 거였어...");
        final ExtractableResponse<Response> response =
                롤링페이퍼_제목_수정(seungpang, teamId, rollingpaperId, rollingpaperUpdateRequest);

        assertThat(response.statusCode()).isEqualTo(HttpStatus.BAD_REQUEST.value());
    }

    @Test
    @DisplayName("모임에 속하지 않은 회원이 롤링페이퍼를 이름을 수정할 경우 예외를 발생시킨다.")
    void updateRollingpaperTitleWithAnonymous() {
        final Long teamId = 모임_추가(seungpang, teamRequest).as(CreateResponse.class)
                .getId();
        모임_가입(alex, teamId, new JoinTeamMemberRequest("영환이형도좋아요"));

        final CreateMemberRollingpaperRequest createMemberRollingpaperRequest =
                new CreateMemberRollingpaperRequest("하이알렉스", alex.getId());
        final Long rollingpaperId = 회원_롤링페이퍼_생성(seungpang, teamId, createMemberRollingpaperRequest)
                .as(CreateResponse.class)
                .getId();

        final RollingpaperUpdateRequest rollingpaperUpdateRequest = new RollingpaperUpdateRequest("알고리즘좀그만해!");
        final ExtractableResponse<Response> response = 롤링페이퍼_제목_수정(zero, teamId, rollingpaperId,
                rollingpaperUpdateRequest);

        assertThat(response.statusCode()).isEqualTo(HttpStatus.FORBIDDEN.value());
    }
}

