package com.woowacourse.naepyeon.acceptance;

import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.롤링페이퍼_특정_조회;
import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.메세지_좋아요;
import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.메세지_좋아요_취소;
import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.메시지_삭제;
import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.메시지_수정;
import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.메시지_작성;
import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.메시지_조회;
import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.모임_가입;
import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.모임_롤링페이퍼_생성;
import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.모임_추가;
import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.회원_롤링페이퍼_생성;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import com.woowacourse.naepyeon.controller.dto.CreateMemberRollingpaperRequest;
import com.woowacourse.naepyeon.controller.dto.CreateResponse;
import com.woowacourse.naepyeon.controller.dto.CreateTeamRollingpaperRequest;
import com.woowacourse.naepyeon.controller.dto.JoinTeamMemberRequest;
import com.woowacourse.naepyeon.controller.dto.MessageRequest;
import com.woowacourse.naepyeon.controller.dto.MessageUpdateRequest;
import com.woowacourse.naepyeon.controller.dto.TeamRequest;
import com.woowacourse.naepyeon.service.dto.MessageResponseDto;
import com.woowacourse.naepyeon.service.dto.RollingpaperResponseDto;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;

class MessageAcceptanceTest extends AcceptanceTest {

    private final TeamRequest teamRequest = new TeamRequest(
            "woowacourse", "테스트 모임입니다.", "testEmoji", "#123456", "마스터다", false
    );

    @Test
    @DisplayName("특정 롤링페이퍼에서 메시지를 작성한다.")
    void createMessageToRollingpaper() {
        final Long teamId = 모임_추가(zero, teamRequest)
                .as(CreateResponse.class)
                .getId();

        모임_가입(alex, teamId, new JoinTeamMemberRequest("알렉스당"));

        final CreateMemberRollingpaperRequest createMemberRollingpaperRequest =
                new CreateMemberRollingpaperRequest("하이알렉스", alex.getId());
        final Long rollingpaperId = 회원_롤링페이퍼_생성(zero, teamId, createMemberRollingpaperRequest).as(CreateResponse.class)
                .getId();

        final ExtractableResponse<Response> response = 메시지_작성(
                zero,
                rollingpaperId,
                new MessageRequest("환영해 알렉스!!!🤗", "green", false, false)
        );

        assertThat(response.statusCode()).isEqualTo(HttpStatus.CREATED.value());
    }

    @Test
    @DisplayName("특정 롤링페이퍼 내에서 동일한 사람이 동일한 메시지를 여러 개 생성할 수 있다.")
    void createMessagesToRollingpaperWithSameMember() {
        final Long teamId = 모임_추가(kei, teamRequest).as(CreateResponse.class)
                .getId();
        모임_가입(alex, teamId, new JoinTeamMemberRequest("알렉스당"));

        final CreateMemberRollingpaperRequest createMemberRollingpaperRequest =
                new CreateMemberRollingpaperRequest("하이알렉스", alex.getId());
        final Long rollingpaperId = 회원_롤링페이퍼_생성(kei, teamId, createMemberRollingpaperRequest)
                .as(CreateResponse.class)
                .getId();

        메시지_작성(kei, rollingpaperId, new MessageRequest("환영해 알렉스!!!", "green", false, false));
        메시지_작성(kei, rollingpaperId, new MessageRequest("알렉스 점심 뭐 먹어?", "green", false, false));
        메시지_작성(kei, rollingpaperId, new MessageRequest("생일축하해!", "green", false, false));

        final RollingpaperResponseDto response = 롤링페이퍼_특정_조회(alex, teamId, rollingpaperId)
                .as(RollingpaperResponseDto.class);

        assertThat(response.getMessages()).hasSize(3);
    }

    @Test
    @DisplayName("모임에게 비밀 메시지로 작성하려 할 경우 예외를 발생시킨다.")
    void saveMessageWithSecretToTeam() {
        final Long teamId = 모임_추가(kei, teamRequest).as(CreateResponse.class)
                .getId();
        모임_가입(alex, teamId, new JoinTeamMemberRequest("볼빨간사춘기가좋아요"));

        final CreateTeamRollingpaperRequest teamRollingpaperRequest = new CreateTeamRollingpaperRequest("우주를줄게");
        final Long rollingpaperId = 모임_롤링페이퍼_생성(kei, teamId, teamRollingpaperRequest)
                .as(CreateResponse.class)
                .getId();

        final ExtractableResponse<Response> response =
                메시지_작성(kei, rollingpaperId, new MessageRequest("심장이막두근대고", "green", false, true));

        assertThat(response.statusCode()).isEqualTo(HttpStatus.BAD_REQUEST.value());
    }

    @Test
    @DisplayName("작성한 메시지의 내용과 색상을 수정한다.")
    void updateMessageContent() {
        final Long teamId = 모임_추가(seungpang, teamRequest).as(CreateResponse.class)
                .getId();
        모임_가입(alex, teamId, new JoinTeamMemberRequest("알렉스당"));

        final CreateMemberRollingpaperRequest createMemberRollingpaperRequest =
                new CreateMemberRollingpaperRequest("하이알렉스", alex.getId());
        final Long rollingpaperId = 회원_롤링페이퍼_생성(seungpang, teamId, createMemberRollingpaperRequest)
                .as(CreateResponse.class)
                .getId();

        final Long messageId =
                메시지_작성(seungpang, rollingpaperId, new MessageRequest("환영해 알렉스!!!", "green", false, false))
                        .as(CreateResponse.class)
                        .getId();

        final ExtractableResponse<Response> response = 메시지_수정(seungpang, rollingpaperId, messageId,
                new MessageUpdateRequest("오늘 뭐해??", "red", false, false));

        final MessageResponseDto actual = 메시지_조회(seungpang, rollingpaperId, messageId)
                .as(MessageResponseDto.class);
        final MessageResponseDto expected = new MessageResponseDto(actual.getId(), "오늘 뭐해??", actual.getFrom(),
                actual.getAuthorId(), "red", false, false, true, true,
                actual.getLikes(),
                false);

        assertAll(
                () -> assertThat(response.statusCode()).isEqualTo(HttpStatus.NO_CONTENT.value()),
                () -> assertThat(actual)
                        .usingRecursiveComparison()
                        .isEqualTo(expected)
        );
    }

    @Test
    @DisplayName("작성한 메시지의 익명옵션을 수정한다.")
    void updateMessageAnonymous() {
        final Long teamId = 모임_추가(seungpang, teamRequest).as(CreateResponse.class)
                .getId();
        모임_가입(alex, teamId, new JoinTeamMemberRequest("알렉스당"));

        final CreateMemberRollingpaperRequest createMemberRollingpaperRequest =
                new CreateMemberRollingpaperRequest("하이알렉스", alex.getId());
        final Long rollingpaperId = 회원_롤링페이퍼_생성(seungpang, teamId, createMemberRollingpaperRequest)
                .as(CreateResponse.class)
                .getId();

        final MessageRequest messageRequest = new MessageRequest("환영해 알렉스!!!", "green", false, false);
        final Long messageId =
                메시지_작성(seungpang, rollingpaperId, messageRequest)
                        .as(CreateResponse.class)
                        .getId();

        final ExtractableResponse<Response> response = 메시지_수정(seungpang, rollingpaperId, messageId,
                new MessageUpdateRequest(messageRequest.getContent(), messageRequest.getColor(), true, false));

        final MessageResponseDto actual = 메시지_조회(seungpang, rollingpaperId, messageId)
                .as(MessageResponseDto.class);
        final MessageResponseDto expected = new MessageResponseDto(actual.getId(), messageRequest.getContent(),
                actual.getFrom(),
                actual.getAuthorId(), messageRequest.getColor(), true, false, true, true,
                actual.getLikes(),
                false);

        assertAll(
                () -> assertThat(response.statusCode()).isEqualTo(HttpStatus.NO_CONTENT.value()),
                () -> assertThat(actual)
                        .usingRecursiveComparison()
                        .isEqualTo(expected)
        );
    }

    @Test
    @DisplayName("작성한 메시지의 비밀글 옵션을 수정한다.")
    void updateMessageSecret() {
        final Long teamId = 모임_추가(seungpang, teamRequest).as(CreateResponse.class)
                .getId();
        모임_가입(alex, teamId, new JoinTeamMemberRequest("알렉스당"));

        final CreateMemberRollingpaperRequest createMemberRollingpaperRequest =
                new CreateMemberRollingpaperRequest("하이알렉스", alex.getId());
        final Long rollingpaperId = 회원_롤링페이퍼_생성(seungpang, teamId, createMemberRollingpaperRequest)
                .as(CreateResponse.class)
                .getId();

        final MessageRequest messageRequest = new MessageRequest("환영해 알렉스!!!", "green", false, false);
        final Long messageId =
                메시지_작성(seungpang, rollingpaperId, messageRequest)
                        .as(CreateResponse.class)
                        .getId();

        final ExtractableResponse<Response> response = 메시지_수정(seungpang, rollingpaperId, messageId,
                new MessageUpdateRequest(messageRequest.getContent(), messageRequest.getColor(), false, true));

        final MessageResponseDto actual = 메시지_조회(seungpang, rollingpaperId, messageId)
                .as(MessageResponseDto.class);
        final MessageResponseDto expected =
                new MessageResponseDto(
                        actual.getId(),
                        messageRequest.getContent(),
                        actual.getFrom(),
                        actual.getAuthorId(),
                        messageRequest.getColor(),
                        false,
                        true,
                        true,
                        true,
                        actual.getLikes(),
                        false
                );

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
        final Long teamId = 모임_추가(zero, teamRequest).as(CreateResponse.class)
                .getId();

        모임_가입(alex, teamId, new JoinTeamMemberRequest("알렉스당"));

        final CreateMemberRollingpaperRequest createMemberRollingpaperRequest =
                new CreateMemberRollingpaperRequest("하이알렉스", alex.getId());
        final Long rollingpaperId = 회원_롤링페이퍼_생성(zero, teamId, createMemberRollingpaperRequest).as(CreateResponse.class)
                .getId();

        final Long messageId =
                메시지_작성(zero, rollingpaperId, new MessageRequest("환영해 알렉스!!!", "green", false, false))
                        .as(CreateResponse.class)
                        .getId();

        final ExtractableResponse<Response> response =
                메시지_수정(zero, rollingpaperId, messageId,
                        new MessageUpdateRequest("a".repeat(501), "green", false, false));

        assertThat(response.statusCode()).isEqualTo(HttpStatus.BAD_REQUEST.value());
    }

    @Test
    @DisplayName("롤링페이퍼에 본인이 작성하지 않은 메시지를 수정할 경우 예외 발생")
    void updateMessageFromOthersMessage() {
        final Long teamId = 모임_추가(seungpang, teamRequest).as(CreateResponse.class)
                .getId();
        모임_가입(alex, teamId, new JoinTeamMemberRequest("알렉스당"));

        final CreateMemberRollingpaperRequest createMemberRollingpaperRequest =
                new CreateMemberRollingpaperRequest("하이알렉스", alex.getId());
        final Long rollingpaperId = 회원_롤링페이퍼_생성(seungpang, teamId, createMemberRollingpaperRequest)
                .as(CreateResponse.class)
                .getId();

        final Long messageId =
                메시지_작성(alex, rollingpaperId, new MessageRequest("테스트 메시지2", "green", false, false))
                        .as(CreateResponse.class)
                        .getId();

        final ExtractableResponse<Response> response = 메시지_수정(seungpang, rollingpaperId, messageId,
                new MessageUpdateRequest("수정할 때 예외 발생", "green", false, false));

        assertThat(response.statusCode()).isEqualTo(HttpStatus.FORBIDDEN.value());
    }

    @Test
    @DisplayName("존재하지 않는 롤링페이퍼에 메시지를 작성할 경우 예외 발생")
    void createMessageWithNRollingpaperNotExist() {
        모임_추가(zero, teamRequest).as(CreateResponse.class);

        final Long invalidMessageId = 9999L;
        final ExtractableResponse<Response> response =
                메시지_작성(zero, invalidMessageId, new MessageRequest("환영해 알렉스!!!", "green", false, false));

        assertThat(response.statusCode()).isEqualTo(HttpStatus.NOT_FOUND.value());
    }

    @Test
    @DisplayName("롤링페이퍼에 본인이 작성한 메시지를 삭제한다.")
    void deleteMessage() {
        final Long teamId = 모임_추가(kei, teamRequest).as(CreateResponse.class)
                .getId();
        모임_가입(alex, teamId, new JoinTeamMemberRequest("알렉스당"));

        final CreateMemberRollingpaperRequest createMemberRollingpaperRequest =
                new CreateMemberRollingpaperRequest("하이알렉스", alex.getId());
        final Long rollingpaperId = 회원_롤링페이퍼_생성(kei, teamId, createMemberRollingpaperRequest)
                .as(CreateResponse.class)
                .getId();

        final Long messageId = 메시지_작성(kei, rollingpaperId, new MessageRequest("곧 삭제될 메시지", "green", false, false))
                .as(CreateResponse.class)
                .getId();

        final ExtractableResponse<Response> response = 메시지_삭제(kei, rollingpaperId, messageId);

        assertThat(response.statusCode()).isEqualTo(HttpStatus.NO_CONTENT.value());
    }

    @Test
    @DisplayName("롤링페이퍼에서 존재하지 않는 메시지를 삭제할 경우 예외 발생")
    void deleteMessageWithRollingpaperNotExist() {
        final Long teamId = 모임_추가(seungpang, teamRequest).as(CreateResponse.class)
                .getId();
        모임_가입(alex, teamId, new JoinTeamMemberRequest("알렉스당"));

        final CreateMemberRollingpaperRequest createMemberRollingpaperRequest =
                new CreateMemberRollingpaperRequest("하이알렉스", alex.getId());
        final Long rollingpaperId = 회원_롤링페이퍼_생성(seungpang, teamId, createMemberRollingpaperRequest)
                .as(CreateResponse.class)
                .getId();

        메시지_작성(seungpang, rollingpaperId, new MessageRequest("테스트 메시지", "green", false, false));

        final Long invalidMessageId = 9999L;
        final ExtractableResponse<Response> response = 메시지_삭제(seungpang, rollingpaperId, invalidMessageId);

        assertThat(response.statusCode()).isEqualTo(HttpStatus.NOT_FOUND.value());
    }

    @Test
    @DisplayName("롤링페이퍼에 본인이 작성하지 않은 메시지를 삭제할 경우 예외 발생")
    void deleteMessageFromOthersMessage() {
        final Long teamId = 모임_추가(kei, teamRequest).as(CreateResponse.class)
                .getId();
        모임_가입(alex, teamId, new JoinTeamMemberRequest("알렉스당"));

        final CreateMemberRollingpaperRequest createMemberRollingpaperRequest =
                new CreateMemberRollingpaperRequest("하이알렉스", alex.getId());
        final Long rollingpaperId = 회원_롤링페이퍼_생성(kei, teamId, createMemberRollingpaperRequest)
                .as(CreateResponse.class)
                .getId();

        메시지_작성(kei, rollingpaperId, new MessageRequest("테스트 메시지1", "green", false, false));
        final Long messageId = 메시지_작성(alex, rollingpaperId, new MessageRequest("테스트 메시지2", "green", false, false))
                .as(CreateResponse.class)
                .getId();

        final ExtractableResponse<Response> response = 메시지_삭제(kei, rollingpaperId, messageId);

        assertThat(response.statusCode()).isEqualTo(HttpStatus.FORBIDDEN.value());
    }

    @Test
    @DisplayName("롤링페이퍼에 작성된 메시지를 상세 조회한다.")
    void findDetailMessageWithRollingpaper() {
        final Long teamId = 모임_추가(seungpang, teamRequest).as(CreateResponse.class)
                .getId();

        final String nickname = "알렉스당";
        모임_가입(alex, teamId, new JoinTeamMemberRequest(nickname));

        final CreateMemberRollingpaperRequest createMemberRollingpaperRequest =
                new CreateMemberRollingpaperRequest("하이 승팡", seungpang.getId());
        final Long rollingpaperId = 회원_롤링페이퍼_생성(alex, teamId, createMemberRollingpaperRequest)
                .as(CreateResponse.class)
                .getId();

        final String content = "상세조회용 메시지 입니다.";
        final String color = "green";
        final Long messageId = 메시지_작성(alex, rollingpaperId, new MessageRequest(content, color, false, false))
                .as(CreateResponse.class)
                .getId();

        final ExtractableResponse<Response> response = 메시지_조회(alex, rollingpaperId, messageId);
        final MessageResponseDto messageResponseDto = response.as(MessageResponseDto.class);

        assertAll(
                () -> assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value()),
                () -> assertThat(messageResponseDto)
                        .extracting("id", "content", "color", "from", "authorId")
                        .containsExactly(messageId, content, color, nickname, alex.getId())
        );
    }

    @Test
    @DisplayName("롤링페이퍼에 작성된 메시지에 좋아요를 누르고 취소할 수 있다.")
    void cancelLikeMessageWithRollingpaper() {
        // 알렉스 롤링페이퍼 생성
        final Long teamId = 모임_추가(zero, teamRequest).as(CreateResponse.class)
                .getId();
        모임_가입(alex, teamId, new JoinTeamMemberRequest("알렉스당"));
        final CreateMemberRollingpaperRequest createMemberRollingpaperRequest =
                new CreateMemberRollingpaperRequest("하이알렉스", alex.getId());
        final Long rollingpaperId = 회원_롤링페이퍼_생성(zero, teamId, createMemberRollingpaperRequest).as(CreateResponse.class)
                .getId();

        // 제로가 알렉스에게 메시지 작성
        final Long messageId1 =
                메시지_작성(zero, rollingpaperId, new MessageRequest("제로가 알렉스에게", "green", false, false))
                        .as(CreateResponse.class)
                        .getId();

        // 제로가 messageId1에 좋아요 누름
        메세지_좋아요(zero, rollingpaperId, messageId1);
        메세지_좋아요_취소(zero, rollingpaperId, messageId1);

        // 메시지 조회
        MessageResponseDto messageResponse1 = 메시지_조회(zero, rollingpaperId, messageId1)
                .as(MessageResponseDto.class);

        // then
        assertThat(messageResponse1)
                .extracting("likes", "liked")
                .containsExactly(0L, false);
    }

    @Test
    @DisplayName("롤링페이퍼에 작성된 메시지에 좋아요를 누른다.")
    void likeMessageWithRollingpaper() {
        // 알렉스 롤링페이퍼 생성
        final Long teamId = 모임_추가(zero, teamRequest).as(CreateResponse.class)
                .getId();
        모임_가입(alex, teamId, new JoinTeamMemberRequest("알렉스당"));
        final CreateMemberRollingpaperRequest createMemberRollingpaperRequest =
                new CreateMemberRollingpaperRequest("하이알렉스", alex.getId());
        final Long rollingpaperId = 회원_롤링페이퍼_생성(zero, teamId, createMemberRollingpaperRequest).as(CreateResponse.class)
                .getId();

        // 제로가 알렉스에게 메시지 작성
        final Long messageId1 =
                메시지_작성(zero, rollingpaperId, new MessageRequest("제로가 알렉스에게", "green", false, false))
                        .as(CreateResponse.class)
                        .getId();
        // 알렉스가 알렉스에게 메시지 작성
        final Long messageId2 =
                메시지_작성(alex, rollingpaperId, new MessageRequest("알렉스가 알렉스에게", "green", false, false))
                        .as(CreateResponse.class)
                        .getId();

        // 제로가 messageId1에 좋아요 누름
        메세지_좋아요(zero, rollingpaperId, messageId1);
        // 제로가 messageId2에 좋아요 누름
        메세지_좋아요(zero, rollingpaperId, messageId2);
        // 알렉스가 messageId1에 좋아요 누름
        메세지_좋아요(alex, rollingpaperId, messageId1);

        // 메시지를 회원마다 조회한다
        MessageResponseDto messageResponse1 = 메시지_조회(zero, rollingpaperId, messageId1)
                .as(MessageResponseDto.class);
        MessageResponseDto messageResponse2 = 메시지_조회(alex, rollingpaperId, messageId2)
                .as(MessageResponseDto.class);

        // then
        assertThat(messageResponse1)
                .extracting("likes", "liked")
                .containsExactly(2L, true);
        assertThat(messageResponse2)
                .extracting("likes", "liked")
                .containsExactly(1L, false);
    }
}
