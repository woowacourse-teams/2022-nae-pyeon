package com.woowacourse.naepyeon.acceptance;

import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.나의_롤링페이퍼_조회;
import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.나의_메시지_조회;
import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.메시지_작성;
import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.모임_가입;
import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.모임_생성;
import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.회원_롤링페이퍼_생성;
import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.회원_삭제;
import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.회원_유저네임_수정;
import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.회원_조회;
import static org.assertj.core.api.Assertions.assertThat;

import com.woowacourse.naepyeon.controller.dto.CreateMemberRollingpaperRequest;
import com.woowacourse.naepyeon.controller.dto.CreateResponse;
import com.woowacourse.naepyeon.controller.dto.JoinTeamMemberRequest;
import com.woowacourse.naepyeon.controller.dto.MemberUpdateRequest;
import com.woowacourse.naepyeon.controller.dto.MessageRequest;
import com.woowacourse.naepyeon.service.dto.MemberResponseDto;
import com.woowacourse.naepyeon.service.dto.ReceivedRollingpaperResponseDto;
import com.woowacourse.naepyeon.service.dto.ReceivedRollingpapersResponseDto;
import com.woowacourse.naepyeon.service.dto.TokenResponseDto;
import com.woowacourse.naepyeon.service.dto.WrittenMessageResponseDto;
import com.woowacourse.naepyeon.service.dto.WrittenMessagesResponseDto;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;

class MemberAcceptanceTest extends AcceptanceTest {

    @Test
    @DisplayName("회원을 조회한다.")
    void findMember() {
        final MemberResponseDto findMember = 회원_조회(alex)
                .as(MemberResponseDto.class);
        assertThat(findMember.getId()).isEqualTo(alex.getId());
    }

    @Test
    @DisplayName("올바르지 않은 토큰으로 마이페이지를 조회할 경우 예외를 발생시킨다.")
    void loginInvalidToken() {
        final ExtractableResponse<Response> response = 회원_조회(new TokenResponseDto("invalidToken", 9999L));

        assertThat(response.statusCode()).isEqualTo(HttpStatus.UNAUTHORIZED.value());
    }

    @Test
    @DisplayName("존재하지 않는 id로 회원 조회를 하려 하는 경우 예외를 발생시킨다.")
    void loginInvalidId() {
        회원_삭제(alex);
        final ExtractableResponse<Response> response = 회원_조회(alex);

        //회원조회 실패
        assertThat(response.statusCode()).isEqualTo(HttpStatus.NOT_FOUND.value());
    }

    @Test
    @DisplayName("내가 받은 롤링페이퍼 목록을 조회한다.")
    void findReceivedRollingpapers() {
        // 모임 생성 및 가입시키기
        final Long teamId = 모임_생성(alex);
        모임_가입(zero, teamId, new JoinTeamMemberRequest("알고리즘이좋아요"));

        final String rollingpaperTitle1 = "알렉스가좋아요";
        final Long rollingpaperId1 = 회원_롤링페이퍼_생성(zero, teamId,
                new CreateMemberRollingpaperRequest(rollingpaperTitle1, alex.getId()))
                .as(CreateResponse.class)
                .getId();
        final String rollingpaperTitle2 = "영환이형도좋아요";
        final Long rollingpaperId2 = 회원_롤링페이퍼_생성(zero, teamId,
                new CreateMemberRollingpaperRequest(rollingpaperTitle2, alex.getId()))
                .as(CreateResponse.class)
                .getId();

        //나의 롤링페이퍼 조회
        final ReceivedRollingpapersResponseDto receivedRollingpapersResponseDto = 나의_롤링페이퍼_조회(alex, 0, 5)
                .as(ReceivedRollingpapersResponseDto.class);
        final List<ReceivedRollingpaperResponseDto> actual = receivedRollingpapersResponseDto.getRollingpapers();
        final String teamName = "woowacourse-4th";
        final List<ReceivedRollingpaperResponseDto> expected = List.of(
                new ReceivedRollingpaperResponseDto(rollingpaperId1, rollingpaperTitle1, teamId, teamName),
                new ReceivedRollingpaperResponseDto(rollingpaperId2, rollingpaperTitle2, teamId, teamName)
        );

        assertThat(actual)
                .usingRecursiveComparison()
                .isEqualTo(expected);
    }

    @Test
    @DisplayName("내가 작성한 메시지 목록을 조회한다.")
    void findWrittenMessages() {
        // 모임 생성 및 가입시키기
        final Long teamId = 모임_생성(seungpang);
        모임_가입(kei, teamId, new JoinTeamMemberRequest("알고리즘이좋아요"));

        final String rollingpaperTitle1 = "알렉스가좋아요";
        final Long rollingpaperId1 = 회원_롤링페이퍼_생성(kei, teamId,
                new CreateMemberRollingpaperRequest(rollingpaperTitle1, seungpang.getId()))
                .as(CreateResponse.class)
                .getId();
        final Long rollingpaperId2 = 회원_롤링페이퍼_생성(kei, teamId,
                new CreateMemberRollingpaperRequest("영환이형도좋아요", seungpang.getId()))
                .as(CreateResponse.class)
                .getId();

        final String messageContent1 = "좋아";
        final String messageContent2 = "ㅋㅋ";
        final String messageContent3 = "테스트";
        final String messageColor1 = "green";
        final String messageColor2 = "red";
        final Long messageId1 =
                메시지_작성(kei, rollingpaperId1, new MessageRequest(messageContent1, messageColor1, false, false))
                        .as(CreateResponse.class)
                        .getId();
        final Long messageId2 =
                메시지_작성(kei, rollingpaperId1, new MessageRequest(messageContent2, messageColor2, false, false))
                        .as(CreateResponse.class)
                        .getId();
        메시지_작성(kei, rollingpaperId2, new MessageRequest(messageContent3, "yellow", false, false));

        //내가 작성한 메시지를 2개만 조회
        final WrittenMessagesResponseDto writtenMessagesResponseDto = 나의_메시지_조회(kei, 0, 2)
                .as(WrittenMessagesResponseDto.class);
        final List<WrittenMessageResponseDto> actual = writtenMessagesResponseDto.getMessages();
        final List<WrittenMessageResponseDto> expected = List.of(
                new WrittenMessageResponseDto(
                        messageId1,
                        rollingpaperId1,
                        rollingpaperTitle1,
                        teamId,
                        "woowacourse-4th",
                        messageContent1,
                        messageColor1,
                        "나는야모임장"
                ),
                new WrittenMessageResponseDto(
                        messageId2,
                        rollingpaperId1,
                        rollingpaperTitle1,
                        teamId,
                        "woowacourse-4th",
                        messageContent2,
                        messageColor2,
                        "나는야모임장"
                )
        );

        assertThat(actual)
                .usingRecursiveComparison()
                .isEqualTo(expected);
    }

    @Test
    @DisplayName("회원정보를 수정할 수 있다.")
    void updateMember() {
        //회원정보 수정
        final MemberUpdateRequest memberUpdateRequest = new MemberUpdateRequest("kingGodZero");
        final ExtractableResponse<Response> response = 회원_유저네임_수정(zero, memberUpdateRequest);

        //회원정보가 수정됨
        회원정보가_수정됨(response);
    }

    @Test
    @DisplayName("올바르지 않은 토큰으로 수정할 경우 예외가 발생한다.")
    void updateInvalidToken() {
        //회원정보 수정
        final MemberUpdateRequest memberUpdateRequest = new MemberUpdateRequest("kingGodKei");
        final ExtractableResponse<Response> response =
                회원_유저네임_수정(new TokenResponseDto("invalidToken", 9999L), memberUpdateRequest);

        //회원정보 수정 실패
        assertThat(response.statusCode()).isEqualTo(HttpStatus.UNAUTHORIZED.value());
    }

    @Test
    @DisplayName("회원을 삭제할 수 있다.")
    void deleteMember() {
        //회원 삭제
        final ExtractableResponse<Response> response = 회원_삭제(alex);

        //회원이 삭제됨
        회원_삭제됨(response);
    }

    @Test
    @DisplayName("올바르지 않은 토큰으로 삭제할 경우 예외가 발생한다.")
    void deleteInvalidToken() {
        //회원 삭제
        final ExtractableResponse<Response> response = 회원_삭제(new TokenResponseDto("invalidToken", 999L));

        //회원정보 삭제 실패
        assertThat(response.statusCode()).isEqualTo(HttpStatus.UNAUTHORIZED.value());
    }

    @Test
    @DisplayName("존재하지 않는 회원을 삭제하려 하는 경우 예외가 발생한다.")
    void failDeleteMember() {
        회원_삭제(alex);

        //없는 회원 삭제
        final ExtractableResponse<Response> response = 회원_삭제(alex);

        //회원 삭제 실패
        assertThat(response.statusCode()).isEqualTo(HttpStatus.NOT_FOUND.value());
    }

    private void 회원정보가_수정됨(final ExtractableResponse<Response> response) {
        assertThat(response.statusCode()).isEqualTo(HttpStatus.NO_CONTENT.value());
    }

    private void 회원_삭제됨(final ExtractableResponse<Response> response) {
        assertThat(response.statusCode()).isEqualTo(HttpStatus.NO_CONTENT.value());
    }
}
