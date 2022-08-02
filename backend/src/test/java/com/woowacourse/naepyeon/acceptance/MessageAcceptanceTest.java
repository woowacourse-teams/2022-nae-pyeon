package com.woowacourse.naepyeon.acceptance;

import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.로그인_응답;
import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.롤링페이퍼_특정_조회;
import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.메시지_삭제;
import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.메시지_수정;
import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.메시지_작성;
import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.메시지_조회;
import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.모임_가입;
import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.모임_추가;
import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.회원_롤링페이퍼_생성;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import com.woowacourse.naepyeon.controller.dto.CreateResponse;
import com.woowacourse.naepyeon.controller.dto.JoinTeamMemberRequest;
import com.woowacourse.naepyeon.controller.dto.MessageRequest;
import com.woowacourse.naepyeon.controller.dto.MessageUpdateContentRequest;
import com.woowacourse.naepyeon.controller.dto.RollingpaperCreateRequest;
import com.woowacourse.naepyeon.controller.dto.TeamRequest;
import com.woowacourse.naepyeon.controller.dto.TokenRequest;
import com.woowacourse.naepyeon.service.dto.MessageResponseDto;
import com.woowacourse.naepyeon.service.dto.RollingpaperResponseDto;
import com.woowacourse.naepyeon.service.dto.TokenResponseDto;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;

class MessageAcceptanceTest extends AcceptanceTest {

    private final TeamRequest teamRequest = new TeamRequest(
            "woowacourse", "테스트 모임입니다.", "testEmoji", "#123456", "마스터다"
    );

    @Test
    @DisplayName("특정 롤링페이퍼에서 메시지를 작성한다.")
    void createMessageToRollingpaper() {
        //회원 추가 및 토큰
        final TokenRequest tokenRequest1 =
                new TokenRequest("KAKAO", "1", "email@email.com", "알렉스", "이미지경로");

        final TokenResponseDto tokenResponseDto1 = 로그인_응답(tokenRequest1)
                .as(TokenResponseDto.class);
        final Long teamId = 모임_추가(tokenResponseDto1, teamRequest).as(CreateResponse.class)
                .getId();

        //회원 추가 및 토큰2
        final TokenRequest tokenRequest2 =
                new TokenRequest("KAKAO", "2", "email2@email.com", "알렉스2", "이미지경로2");

        final TokenResponseDto tokenResponseDto2 = 로그인_응답(tokenRequest2)
                .as(TokenResponseDto.class);

        모임_가입(tokenResponseDto2, teamId, new JoinTeamMemberRequest("알렉스당"));

        final RollingpaperCreateRequest rollingpaperCreateRequest = new RollingpaperCreateRequest("하이알렉스", 2L);
        final Long rollingpaperId = 회원_롤링페이퍼_생성(tokenResponseDto1, teamId, rollingpaperCreateRequest)
                .as(CreateResponse.class)
                .getId();

        final ExtractableResponse<Response> response = 메시지_작성(tokenResponseDto1, rollingpaperId,
                new MessageRequest("환영해 알렉스!!!🤗", "green"));

        assertThat(response.statusCode()).isEqualTo(HttpStatus.CREATED.value());
    }

    @Test
    @DisplayName("특정 롤링페이퍼 내에서 동일한 사람이 동일한 메시지를 여러 개 생성할 수 있다.")
    void createMessagesToRollingpaperWithSameMember() {
        //회원 추가 및 토큰
        final TokenRequest tokenRequest1 =
                new TokenRequest("KAKAO", "1", "email@email.com", "알렉스", "이미지경로");

        final TokenResponseDto tokenResponseDto1 = 로그인_응답(tokenRequest1)
                .as(TokenResponseDto.class);
        final Long teamId = 모임_추가(tokenResponseDto1, teamRequest).as(CreateResponse.class)
                .getId();

        //회원 추가 및 토큰2
        final TokenRequest tokenRequest2 =
                new TokenRequest("KAKAO", "2", "email2@email.com", "알렉스2", "이미지경로2");

        final TokenResponseDto tokenResponseDto2 = 로그인_응답(tokenRequest2)
                .as(TokenResponseDto.class);
        모임_가입(tokenResponseDto2, teamId, new JoinTeamMemberRequest("알렉스당"));

        final RollingpaperCreateRequest rollingpaperCreateRequest = new RollingpaperCreateRequest("하이알렉스", 2L);
        final Long rollingpaperId = 회원_롤링페이퍼_생성(tokenResponseDto1, teamId, rollingpaperCreateRequest)
                .as(CreateResponse.class)
                .getId();

        메시지_작성(tokenResponseDto1, rollingpaperId, new MessageRequest("환영해 알렉스!!!", "green"));
        메시지_작성(tokenResponseDto1, rollingpaperId, new MessageRequest("알렉스 점심 뭐 먹어?", "green"));
        메시지_작성(tokenResponseDto1, rollingpaperId, new MessageRequest("생일축하해!", "green"));

        final RollingpaperResponseDto response = 롤링페이퍼_특정_조회(tokenResponseDto2, teamId, rollingpaperId)
                .as(RollingpaperResponseDto.class);

        assertThat(response.getMessages()).hasSize(3);
    }

    @Test
    @DisplayName("작성한 메시지의 내용과 색상을 수정한다.")
    void updateMessageContent() {
        //회원 추가 및 토큰
        final TokenRequest tokenRequest1 =
                new TokenRequest("KAKAO", "1", "email@email.com", "알렉스", "이미지경로");

        final TokenResponseDto tokenResponseDto1 = 로그인_응답(tokenRequest1)
                .as(TokenResponseDto.class);
        final Long teamId = 모임_추가(tokenResponseDto1, teamRequest).as(CreateResponse.class)
                .getId();

        //회원 추가 및 토큰2
        final TokenRequest tokenRequest2 =
                new TokenRequest("KAKAO", "2", "email2@email.com", "알렉스2", "이미지경로2");

        final TokenResponseDto tokenResponseDto2 = 로그인_응답(tokenRequest2)
                .as(TokenResponseDto.class);
        모임_가입(tokenResponseDto2, teamId, new JoinTeamMemberRequest("알렉스당"));

        final RollingpaperCreateRequest rollingpaperCreateRequest = new RollingpaperCreateRequest("하이알렉스", 2L);
        final Long rollingpaperId = 회원_롤링페이퍼_생성(tokenResponseDto1, teamId, rollingpaperCreateRequest)
                .as(CreateResponse.class)
                .getId();

        final Long messageId = 메시지_작성(tokenResponseDto1, rollingpaperId, new MessageRequest("환영해 알렉스!!!", "green"))
                .as(CreateResponse.class)
                .getId();

        final ExtractableResponse<Response> response = 메시지_수정(tokenResponseDto1, rollingpaperId, messageId,
                new MessageUpdateContentRequest("오늘 뭐해??", "red"));

        final MessageResponseDto actual = 메시지_조회(tokenResponseDto1, rollingpaperId, messageId)
                .as(MessageResponseDto.class);
        final MessageResponseDto expected =
                new MessageResponseDto(actual.getId(), "오늘 뭐해??", "red", actual.getFrom(), actual.getAuthorId());

        assertAll(
                () -> assertThat(response.statusCode()).isEqualTo(HttpStatus.NO_CONTENT.value()),
                () -> assertThat(actual)
                        .usingRecursiveComparison()
                        .isEqualTo(expected)
        );
    }

    @Test
    @DisplayName("작성한 메시지를 수정할 때 500자를 초과할 경우 예외 발생")
    void updateMessageContentWithExceedContentLength() {
        //회원 추가 및 토큰
        final TokenRequest tokenRequest1 =
                new TokenRequest("KAKAO", "1", "email@email.com", "알렉스", "이미지경로");

        final TokenResponseDto tokenResponseDto1 = 로그인_응답(tokenRequest1)
                .as(TokenResponseDto.class);
        final Long teamId = 모임_추가(tokenResponseDto1, teamRequest).as(CreateResponse.class)
                .getId();

        //회원 추가 및 토큰2
        final TokenRequest tokenRequest2 =
                new TokenRequest("KAKAO", "2", "email2@email.com", "알렉스2", "이미지경로2");

        final TokenResponseDto tokenResponseDto2 = 로그인_응답(tokenRequest2)
                .as(TokenResponseDto.class);
        모임_가입(tokenResponseDto2, teamId, new JoinTeamMemberRequest("알렉스당"));

        final RollingpaperCreateRequest rollingpaperCreateRequest = new RollingpaperCreateRequest("하이알렉스", 2L);
        final Long rollingpaperId = 회원_롤링페이퍼_생성(tokenResponseDto1, teamId, rollingpaperCreateRequest)
                .as(CreateResponse.class)
                .getId();

        final Long messageId = 메시지_작성(tokenResponseDto1, rollingpaperId, new MessageRequest("환영해 알렉스!!!", "green"))
                .as(CreateResponse.class)
                .getId();

        final ExtractableResponse<Response> response = 메시지_수정(tokenResponseDto1, rollingpaperId, messageId,
                new MessageUpdateContentRequest("a".repeat(501), "green"));

        assertThat(response.statusCode()).isEqualTo(HttpStatus.BAD_REQUEST.value());
    }

    @Test
    @DisplayName("롤링페이퍼에 본인이 작성하지 않은 메시지를 수정할 경우 예외 발생")
    void updateMessageFromOthersMessage() {
        //회원 추가 및 토큰
        final TokenRequest tokenRequest1 =
                new TokenRequest("KAKAO", "1", "email@email.com", "알렉스", "이미지경로");

        final TokenResponseDto tokenResponseDto1 = 로그인_응답(tokenRequest1)
                .as(TokenResponseDto.class);
        final Long teamId = 모임_추가(tokenResponseDto1, teamRequest).as(CreateResponse.class)
                .getId();

        //회원 추가 및 토큰2
        final TokenRequest tokenRequest2 =
                new TokenRequest("KAKAO", "2", "email2@email.com", "알렉스2", "이미지경로2");

        final TokenResponseDto tokenResponseDto2 = 로그인_응답(tokenRequest2)
                .as(TokenResponseDto.class);
        모임_가입(tokenResponseDto2, teamId, new JoinTeamMemberRequest("알렉스당"));

        final RollingpaperCreateRequest rollingpaperCreateRequest = new RollingpaperCreateRequest("하이알렉스", 2L);
        final Long rollingpaperId = 회원_롤링페이퍼_생성(tokenResponseDto1, teamId, rollingpaperCreateRequest)
                .as(CreateResponse.class)
                .getId();

        final Long messageId = 메시지_작성(tokenResponseDto2, rollingpaperId, new MessageRequest("테스트 메시지2", "green"))
                .as(CreateResponse.class)
                .getId();

        final ExtractableResponse<Response> response = 메시지_수정(tokenResponseDto1, rollingpaperId, messageId,
                new MessageUpdateContentRequest("수정할 때 예외 발생", "green"));

        assertThat(response.statusCode()).isEqualTo(HttpStatus.FORBIDDEN.value());
    }

    @Test
    @DisplayName("존재하지 않는 롤링페이퍼에 메시지를 작성할 경우 예외 발생")
    void createMessageWithNRollingpaperNotExist() {
        //회원 추가 및 토큰
        final TokenRequest tokenRequest1 =
                new TokenRequest("KAKAO", "1", "email@email.com", "알렉스", "이미지경로");

        final TokenResponseDto tokenResponseDto1 = 로그인_응답(tokenRequest1)
                .as(TokenResponseDto.class);
        모임_추가(tokenResponseDto1, teamRequest).as(CreateResponse.class);

        final Long invalidMessageId = 9999L;
        final ExtractableResponse<Response> response = 메시지_작성(tokenResponseDto1, invalidMessageId,
                new MessageRequest("환영해 알렉스!!!", "green"));

        assertThat(response.statusCode()).isEqualTo(HttpStatus.NOT_FOUND.value());
    }

    @Test
    @DisplayName("롤링페이퍼에 본인이 작성한 메시지를 삭제한다.")
    void deleteMessage() {
        //회원 추가 및 토큰
        final TokenRequest tokenRequest1 =
                new TokenRequest("KAKAO", "1", "email@email.com", "알렉스", "이미지경로");

        final TokenResponseDto tokenResponseDto1 = 로그인_응답(tokenRequest1)
                .as(TokenResponseDto.class);
        final Long teamId = 모임_추가(tokenResponseDto1, teamRequest).as(CreateResponse.class)
                .getId();

        //회원 추가 및 토큰2
        final TokenRequest tokenRequest2 =
                new TokenRequest("KAKAO", "2", "email2@email.com", "알렉스2", "이미지경로2");

        final TokenResponseDto tokenResponseDto2 = 로그인_응답(tokenRequest2)
                .as(TokenResponseDto.class);
        모임_가입(tokenResponseDto2, teamId, new JoinTeamMemberRequest("알렉스당"));

        final RollingpaperCreateRequest rollingpaperCreateRequest = new RollingpaperCreateRequest("하이알렉스", 2L);
        final Long rollingpaperId = 회원_롤링페이퍼_생성(tokenResponseDto1, teamId, rollingpaperCreateRequest)
                .as(CreateResponse.class)
                .getId();

        final Long messageId = 메시지_작성(tokenResponseDto1, rollingpaperId, new MessageRequest("곧 삭제될 메시지", "green"))
                .as(CreateResponse.class)
                .getId();

        final ExtractableResponse<Response> response = 메시지_삭제(tokenResponseDto1, rollingpaperId, messageId);

        assertThat(response.statusCode()).isEqualTo(HttpStatus.NO_CONTENT.value());
    }

    @Test
    @DisplayName("롤링페이퍼에서 존재하지 않는 메시지를 삭제할 경우 예외 발생")
    void deleteMessageWithRollingpaperNotExist() {
        //회원 추가 및 토큰
        final TokenRequest tokenRequest1 =
                new TokenRequest("KAKAO", "1", "email@email.com", "알렉스", "이미지경로");

        final TokenResponseDto tokenResponseDto1 = 로그인_응답(tokenRequest1)
                .as(TokenResponseDto.class);
        final Long teamId = 모임_추가(tokenResponseDto1, teamRequest).as(CreateResponse.class)
                .getId();

        //회원 추가 및 토큰2
        final TokenRequest tokenRequest2 =
                new TokenRequest("KAKAO", "2", "email2@email.com", "알렉스2", "이미지경로2");

        final TokenResponseDto tokenResponseDto2 = 로그인_응답(tokenRequest2)
                .as(TokenResponseDto.class);
        모임_가입(tokenResponseDto2, teamId, new JoinTeamMemberRequest("알렉스당"));

        final RollingpaperCreateRequest rollingpaperCreateRequest = new RollingpaperCreateRequest("하이알렉스", 2L);
        final Long rollingpaperId = 회원_롤링페이퍼_생성(tokenResponseDto1, teamId, rollingpaperCreateRequest)
                .as(CreateResponse.class)
                .getId();

        메시지_작성(tokenResponseDto1, rollingpaperId, new MessageRequest("테스트 메시지", "green"));

        final Long invalidMessageId = 9999L;
        final ExtractableResponse<Response> response = 메시지_삭제(tokenResponseDto1, rollingpaperId, invalidMessageId);

        assertThat(response.statusCode()).isEqualTo(HttpStatus.NOT_FOUND.value());
    }

    @Test
    @DisplayName("롤링페이퍼에 본인이 작성하지 않은 메시지를 삭제할 경우 예외 발생")
    void deleteMessageFromOthersMessage() {
        //회원 추가 및 토큰
        final TokenRequest tokenRequest1 =
                new TokenRequest("KAKAO", "1", "email@email.com", "알렉스", "이미지경로");

        final TokenResponseDto tokenResponseDto1 = 로그인_응답(tokenRequest1)
                .as(TokenResponseDto.class);
        final Long teamId = 모임_추가(tokenResponseDto1, teamRequest).as(CreateResponse.class)
                .getId();

        //회원 추가 및 토큰2
        final TokenRequest tokenRequest2 =
                new TokenRequest("KAKAO", "2", "email2@email.com", "알렉스2", "이미지경로2");

        final TokenResponseDto tokenResponseDto2 = 로그인_응답(tokenRequest2)
                .as(TokenResponseDto.class);
        모임_가입(tokenResponseDto2, teamId, new JoinTeamMemberRequest("알렉스당"));

        final RollingpaperCreateRequest rollingpaperCreateRequest = new RollingpaperCreateRequest("하이알렉스", 2L);
        final Long rollingpaperId = 회원_롤링페이퍼_생성(tokenResponseDto1, teamId, rollingpaperCreateRequest)
                .as(CreateResponse.class)
                .getId();

        메시지_작성(tokenResponseDto1, rollingpaperId, new MessageRequest("테스트 메시지1", "green"));
        final Long messageId = 메시지_작성(tokenResponseDto2, rollingpaperId, new MessageRequest("테스트 메시지2", "green"))
                .as(CreateResponse.class)
                .getId();

        final ExtractableResponse<Response> response = 메시지_삭제(tokenResponseDto1, rollingpaperId, messageId);

        assertThat(response.statusCode()).isEqualTo(HttpStatus.FORBIDDEN.value());
    }

    @Test
    @DisplayName("롤링페이퍼에 작성된 메시지를 상세 조회한다.")
    void findDetailMessageWithRollingpaper() {
        //회원 추가 및 토큰
        final TokenRequest tokenRequest1 =
                new TokenRequest("KAKAO", "1", "email@email.com", "알렉스", "이미지경로");

        final TokenResponseDto tokenResponseDto1 = 로그인_응답(tokenRequest1)
                .as(TokenResponseDto.class);
        final Long teamId = 모임_추가(tokenResponseDto1, teamRequest).as(CreateResponse.class)
                .getId();

        //회원 추가 및 토큰2
        final TokenRequest tokenRequest2 =
                new TokenRequest("KAKAO", "2", "email2@email.com", "알렉스2", "이미지경로2");

        final TokenResponseDto tokenResponseDto2 = 로그인_응답(tokenRequest2)
                .as(TokenResponseDto.class);
        final String nickname = "알렉스당";
        모임_가입(tokenResponseDto2, teamId, new JoinTeamMemberRequest(nickname));

        final RollingpaperCreateRequest rollingpaperCreateRequest = new RollingpaperCreateRequest("하이 승팡", 1L);
        final Long rollingpaperId = 회원_롤링페이퍼_생성(tokenResponseDto2, teamId, rollingpaperCreateRequest)
                .as(CreateResponse.class)
                .getId();

        final String content = "상세조회용 메시지 입니다.";
        final String color = "green";
        final Long messageId = 메시지_작성(tokenResponseDto2, rollingpaperId, new MessageRequest(content, color))
                .as(CreateResponse.class)
                .getId();

        final ExtractableResponse<Response> response = 메시지_조회(tokenResponseDto2, rollingpaperId, messageId);
        final MessageResponseDto messageResponseDto = response.as(MessageResponseDto.class);

        assertAll(
                () -> assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value()),
                () -> assertThat(messageResponseDto)
                        .extracting("id", "content", "color", "from", "authorId")
                        .containsExactly(messageId, content, color, nickname, 2L)
        );
    }
}
