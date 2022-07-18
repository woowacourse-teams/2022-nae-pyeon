package com.woowacourse.naepyeon.acceptance;

import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.롤링페이퍼_내꺼_조회;
import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.롤링페이퍼_제목_수정;
import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.롤링페이퍼_특정_조회;
import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.모임_가입;
import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.모임_모든_회원들_롤링페이퍼_조회;
import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.모임_추가;
import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.회원_롤링페이퍼_생성;
import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.회원가입_후_로그인;
import static org.assertj.core.api.Assertions.assertThat;

import com.woowacourse.naepyeon.controller.dto.CreateResponse;
import com.woowacourse.naepyeon.controller.dto.JoinTeamMemberRequest;
import com.woowacourse.naepyeon.controller.dto.MemberRegisterRequest;
import com.woowacourse.naepyeon.controller.dto.RollingpaperCreateRequest;
import com.woowacourse.naepyeon.controller.dto.RollingpaperUpdateRequest;
import com.woowacourse.naepyeon.controller.dto.TeamRequest;
import com.woowacourse.naepyeon.service.dto.RollingpaperPreviewResponseDto;
import com.woowacourse.naepyeon.service.dto.RollingpaperResponseDto;
import com.woowacourse.naepyeon.service.dto.RollingpapersResponseDto;
import com.woowacourse.naepyeon.service.dto.TokenResponseDto;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import java.util.List;
import java.util.stream.Collectors;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;

public class RollingpaperAcceptanceTest extends AcceptanceTest {

    private final TeamRequest teamRequest = new TeamRequest(
            "woowacourse", "테스트 모임입니다.", "testEmoji", "#123456"
    );
    private final MemberRegisterRequest member1 =
            new MemberRegisterRequest("seungpang", "email@email.com", "12345678aA!");
    private final MemberRegisterRequest member2 =
            new MemberRegisterRequest("yxxnghwan", "yxxnghwan@email.com", "12345678aA!");
    private final MemberRegisterRequest member3 =
            new MemberRegisterRequest("kth990303", "kth990303@email.com", "12345678aA!");

    @Test
    @DisplayName("특정 회원에게 롤링페이퍼를 생성하고 조회한다.")
    void createRollingpaperToMember() {
        final TokenResponseDto tokenResponseDto1 = 회원가입_후_로그인(member1);
        final Long teamId = 모임_추가(tokenResponseDto1, teamRequest).as(CreateResponse.class).getId();

        final TokenResponseDto tokenResponseDto2 = 회원가입_후_로그인(member2);
        모임_가입(tokenResponseDto2, teamId, new JoinTeamMemberRequest("영환이형도좋아요"));

        // when: seungpang이 yxxnghwan에게 롤링페이퍼 작성
        final RollingpaperCreateRequest rollingpaperCreateRequest = new RollingpaperCreateRequest("하이케이", 2L);
        final Long rollingpaperId = 회원_롤링페이퍼_생성(tokenResponseDto1, teamId, rollingpaperCreateRequest)
                .as(CreateResponse.class)
                .getId();

        // then: yxxnghwan이 받은 롤링페이퍼 조회
        final List<Long> actual = 롤링페이퍼_내꺼_조회(tokenResponseDto2, teamId).as(RollingpapersResponseDto.class)
                .getRollingpapers()
                .stream()
                .map(RollingpaperPreviewResponseDto::getId)
                .collect(Collectors.toUnmodifiableList());

        assertThat(actual).contains(rollingpaperId);
    }

    @Test
    @DisplayName("특정 회원에게 롤링페이퍼를 여러 번 생성할 수 있다.")
    void createRollingpapersToMember() {
        final TokenResponseDto tokenResponseDto1 = 회원가입_후_로그인(member1);
        final Long teamId = 모임_추가(tokenResponseDto1, teamRequest).as(CreateResponse.class).getId();

        final TokenResponseDto tokenResponseDto2 = 회원가입_후_로그인(member2);
        모임_가입(tokenResponseDto2, teamId, new JoinTeamMemberRequest("영환이형도좋아요"));

        // when: seungpang이 yxxnghwan에게 롤링페이퍼 2개 작성
        final RollingpaperCreateRequest rollingpaperCreateRequest1 = new RollingpaperCreateRequest("하이알렉스", 2L);
        final Long rollingpaperId1 = 회원_롤링페이퍼_생성(tokenResponseDto1, teamId, rollingpaperCreateRequest1)
                .as(CreateResponse.class)
                .getId();
        final RollingpaperCreateRequest rollingpaperCreateRequest2 = new RollingpaperCreateRequest("반가워", 2L);
        final Long rollingpaperId2 = 회원_롤링페이퍼_생성(tokenResponseDto1, teamId, rollingpaperCreateRequest2)
                .as(CreateResponse.class)
                .getId();

        // then: yxxnghwan이 받은 롤링페이퍼 조회
        final List<Long> actual = 롤링페이퍼_내꺼_조회(tokenResponseDto2, teamId).as(RollingpapersResponseDto.class)
                .getRollingpapers()
                .stream()
                .map(RollingpaperPreviewResponseDto::getId)
                .collect(Collectors.toUnmodifiableList());

        assertThat(actual).contains(rollingpaperId1, rollingpaperId2);
    }

    @Test
    @DisplayName("존재하지 않는 회원에게 롤링페이퍼를 생성하는 경우 예외를 발생시킨다.")
    void createRollingpaperWithNotFoundMember() {
        final TokenResponseDto tokenResponseDto1 = 회원가입_후_로그인(member1);
        final Long teamId = 모임_추가(tokenResponseDto1, teamRequest).as(CreateResponse.class).getId();

        final RollingpaperCreateRequest rollingpaperCreateRequest = new RollingpaperCreateRequest("하이알렉스", 2L);
        final ExtractableResponse<Response> response = 회원_롤링페이퍼_생성(tokenResponseDto1, teamId,
                rollingpaperCreateRequest);

        assertThat(response.statusCode()).isEqualTo(HttpStatus.NOT_FOUND.value());
    }

    @Test
    @DisplayName("특정 모임의 회원들 전체가 받은 롤링페이퍼 목록을 조회한다.")
    void findRollingpapersWithTeam() {
        final TokenResponseDto tokenResponseDto1 = 회원가입_후_로그인(member1);
        final Long teamId = 모임_추가(tokenResponseDto1, teamRequest).as(CreateResponse.class).getId();

        final TokenResponseDto tokenResponseDto2 = 회원가입_후_로그인(member2);
        모임_가입(tokenResponseDto2, teamId, new JoinTeamMemberRequest("영환이형도좋아요"));

        final TokenResponseDto tokenResponseDto3 = 회원가입_후_로그인(member3);
        모임_가입(tokenResponseDto3, teamId, new JoinTeamMemberRequest("알고리즘이좋아요"));

        // when: seungpang이 yxxnghwan, kth990303에게 각각 롤링페이퍼 작성
        final RollingpaperCreateRequest rollingpaperCreateRequest1 = new RollingpaperCreateRequest("하이알렉스", 2L);
        final Long rollingpaperId1 = 회원_롤링페이퍼_생성(tokenResponseDto1, teamId, rollingpaperCreateRequest1)
                .as(CreateResponse.class)
                .getId();
        final RollingpaperCreateRequest rollingpaperCreateRequest2 = new RollingpaperCreateRequest("알고리즘좀그만해!", 3L);
        final Long rollingpaperId2 = 회원_롤링페이퍼_생성(tokenResponseDto1, teamId, rollingpaperCreateRequest2)
                .as(CreateResponse.class)
                .getId();

        // then
        final List<Long> actual = 모임_모든_회원들_롤링페이퍼_조회(tokenResponseDto2, teamId).as(RollingpapersResponseDto.class)
                .getRollingpapers()
                .stream()
                .map(RollingpaperPreviewResponseDto::getId)
                .collect(Collectors.toUnmodifiableList());

        assertThat(actual).contains(rollingpaperId1, rollingpaperId2);
    }

    @Test
    @DisplayName("모임에 속하지 않은 회원이 롤링페이퍼를 조회할 경우 예외를 발생시킨다.")
    void findRollingpaperWithAnonymous() {
        final TokenResponseDto tokenResponseDto1 = 회원가입_후_로그인(member1);
        final Long teamId = 모임_추가(tokenResponseDto1, teamRequest).as(CreateResponse.class).getId();

        final TokenResponseDto tokenResponseDto2 = 회원가입_후_로그인(member2);
        모임_가입(tokenResponseDto2, teamId, new JoinTeamMemberRequest("영환이형도좋아요"));

        // 모임에 가입하지는 않음
        final TokenResponseDto tokenResponseDto3 = 회원가입_후_로그인(member3);

        final RollingpaperCreateRequest rollingpaperCreateRequest = new RollingpaperCreateRequest("하이케이", 2L);
        final Long rollingpaperId = 회원_롤링페이퍼_생성(tokenResponseDto1, teamId, rollingpaperCreateRequest)
                .as(CreateResponse.class)
                .getId();

        final ExtractableResponse<Response> response = 롤링페이퍼_특정_조회(tokenResponseDto3, teamId, rollingpaperId);

        assertThat(response.statusCode()).isEqualTo(HttpStatus.FORBIDDEN.value());
    }

    @Test
    @DisplayName("롤링페이퍼 이름을 수정한다.")
    void updateRollingpaperTitle() {
        final TokenResponseDto tokenResponseDto1 = 회원가입_후_로그인(member1);
        final Long teamId = 모임_추가(tokenResponseDto1, teamRequest).as(CreateResponse.class).getId();

        final TokenResponseDto tokenResponseDto2 = 회원가입_후_로그인(member2);
        모임_가입(tokenResponseDto2, teamId, new JoinTeamMemberRequest("영환이형도좋아요"));

        final RollingpaperCreateRequest rollingpaperCreateRequest = new RollingpaperCreateRequest("하이케이", 2L);
        final Long rollingpaperId = 회원_롤링페이퍼_생성(tokenResponseDto1, teamId, rollingpaperCreateRequest)
                .as(CreateResponse.class)
                .getId();

        final String expected = "알고리즘좀그만해!";
        final RollingpaperUpdateRequest rollingpaperUpdateRequest = new RollingpaperUpdateRequest("알고리즘좀그만해!");
        final ExtractableResponse<Response> response = 롤링페이퍼_제목_수정(tokenResponseDto1, teamId, rollingpaperId,
                rollingpaperUpdateRequest);

        final String actual = 롤링페이퍼_특정_조회(tokenResponseDto1, teamId, rollingpaperId).as(RollingpaperResponseDto.class)
                .getTitle();
        assertThat(actual).isEqualTo(expected);
    }

    @Test
    @DisplayName("롤링페이퍼 이름을 20자 초과하여 수정할 경우 예외를 발생시킨다.")
    void updateRollingpaperTitleWithExceedTitleLength() {
        final TokenResponseDto tokenResponseDto1 = 회원가입_후_로그인(member1);
        final Long teamId = 모임_추가(tokenResponseDto1, teamRequest).as(CreateResponse.class).getId();

        final TokenResponseDto tokenResponseDto2 = 회원가입_후_로그인(member2);
        모임_가입(tokenResponseDto2, teamId, new JoinTeamMemberRequest("영환이형도좋아요"));

        final RollingpaperCreateRequest rollingpaperCreateRequest = new RollingpaperCreateRequest("하이케이", 2L);
        final Long rollingpaperId = 회원_롤링페이퍼_생성(tokenResponseDto1, teamId, rollingpaperCreateRequest)
                .as(CreateResponse.class)
                .getId();

        final RollingpaperUpdateRequest rollingpaperUpdateRequest =
                new RollingpaperUpdateRequest("케이. 사실은 나도 알고리즘 좋아하는데 숨기는 거였어...");
        final ExtractableResponse<Response> response = 롤링페이퍼_제목_수정(tokenResponseDto1, teamId, rollingpaperId,
                rollingpaperUpdateRequest);

        assertThat(response.statusCode()).isEqualTo(HttpStatus.BAD_REQUEST.value());
    }

    @Test
    @DisplayName("모임에 속하지 않은 회원이 롤링페이퍼를 이름을 수정할 경우 예외를 발생시킨다.")
    void updateRollingpaperTitleWithAnonymous() {
        final TokenResponseDto tokenResponseDto1 = 회원가입_후_로그인(member1);
        final Long teamId = 모임_추가(tokenResponseDto1, teamRequest).as(CreateResponse.class).getId();

        final TokenResponseDto tokenResponseDto2 = 회원가입_후_로그인(member2);
        모임_가입(tokenResponseDto2, teamId, new JoinTeamMemberRequest("영환이형도좋아요"));

        // 모임에 가입하지는 않음
        final TokenResponseDto tokenResponseDto3 = 회원가입_후_로그인(member3);

        final RollingpaperCreateRequest rollingpaperCreateRequest = new RollingpaperCreateRequest("하이케이", 2L);
        final Long rollingpaperId = 회원_롤링페이퍼_생성(tokenResponseDto1, teamId, rollingpaperCreateRequest)
                .as(CreateResponse.class)
                .getId();

        final String expected = "알고리즘좀그만해!";
        final RollingpaperUpdateRequest rollingpaperUpdateRequest = new RollingpaperUpdateRequest("알고리즘좀그만해!");
        final ExtractableResponse<Response> response = 롤링페이퍼_제목_수정(tokenResponseDto3, teamId, rollingpaperId,
                rollingpaperUpdateRequest);

        assertThat(response.statusCode()).isEqualTo(HttpStatus.FORBIDDEN.value());
    }
}

