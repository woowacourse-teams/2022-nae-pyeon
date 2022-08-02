package com.woowacourse.naepyeon.acceptance;

import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.나의_롤링페이퍼_조회;
import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.나의_메시지_조회;
import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.로그인_응답;
import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.메시지_작성;
import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.모임_가입;
import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.모임_생성;
import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.회원_롤링페이퍼_생성;
import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.회원_삭제;
import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.회원_유저네임_수정;
import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.회원_조회;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import com.woowacourse.naepyeon.controller.dto.ErrorResponse;
import com.woowacourse.naepyeon.controller.dto.JoinTeamMemberRequest;
import com.woowacourse.naepyeon.controller.dto.MemberUpdateRequest;
import com.woowacourse.naepyeon.controller.dto.MessageRequest;
import com.woowacourse.naepyeon.controller.dto.RollingpaperCreateRequest;
import com.woowacourse.naepyeon.controller.dto.TokenRequest;
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
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.http.HttpStatus;

class MemberAcceptanceTest extends AcceptanceTest {

    @Test
    @DisplayName("회원을 추가하고 검증한다.")
    void addMember() {
        //회원 추가 및 토큰
        final TokenRequest tokenRequest =
                new TokenRequest("KAKAO", "1", "email@email.com", "알렉스", "이미지경로");
        final ExtractableResponse<Response> response = 로그인_응답(tokenRequest);

        //회원추가 검증 및 회원검증
        회원조회_확인(response.as(TokenResponseDto.class), tokenRequest);
    }

    @ParameterizedTest
    @DisplayName("회원가입 시, 이메일이 기본 이메일 형식이 아닌 경우 예외가 발생한다.")
    @ValueSource(strings = {"fail", "fail@email"})
    void failSignUpEmail(final String failEmail) {
        //회원 추가 및 토큰
        final TokenRequest tokenRequest =
                new TokenRequest("KAKAO", "1", failEmail, "알렉스", "이미지경로");
        final ExtractableResponse<Response> response = 로그인_응답(tokenRequest);
        final ErrorResponse error = response.as(ErrorResponse.class);

        assertAll(
                () -> assertThat(response.statusCode()).isEqualTo(HttpStatus.BAD_REQUEST.value()),
                () -> assertThat(error.getErrorCode()).isEqualTo("3002")
        );
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
        //회원 추가 및 토큰
        final TokenRequest tokenRequest =
                new TokenRequest("KAKAO", "1", "email@email.com", "알렉스", "이미지경로");

        final TokenResponseDto token = 로그인_응답(tokenRequest)
                .as(TokenResponseDto.class);
        회원_삭제(token);
        final ExtractableResponse<Response> response = 회원_조회(token);

        //회원조회 실패
        assertThat(response.statusCode()).isEqualTo(HttpStatus.NOT_FOUND.value());
    }

    @Test
    @DisplayName("내가 받은 롤링페이퍼 목록을 조회한다.")
    void findReceivedRollingpapers() {
        //회원 추가 및 토큰
        final TokenRequest tokenRequest1 =
                new TokenRequest("KAKAO", "1", "email@email.com", "알렉스", "이미지경로");
        final TokenResponseDto token1 = 로그인_응답(tokenRequest1)
                .as(TokenResponseDto.class);

        final TokenRequest tokenRequest2 =
                new TokenRequest("KAKAO", "2", "kth990303@email.com", "케이", "이미지경로");
        final TokenResponseDto token2 = 로그인_응답(tokenRequest2)
                .as(TokenResponseDto.class);

        // 모임 생성 및 가입시키기
        final Long teamId = 모임_생성(token1);
        모임_가입(token2, teamId, new JoinTeamMemberRequest("알고리즘이좋아요"));

        회원_롤링페이퍼_생성(token2, teamId, new RollingpaperCreateRequest("알렉스가좋아요", token1.getId()));
        회원_롤링페이퍼_생성(token2, teamId, new RollingpaperCreateRequest("영환이형도좋아요", token1.getId()));

        //나의 롤링페이퍼 조회
        final ReceivedRollingpapersResponseDto receivedRollingpapersResponseDto = 나의_롤링페이퍼_조회(token1, 0, 5)
                .as(ReceivedRollingpapersResponseDto.class);
        final List<ReceivedRollingpaperResponseDto> actual = receivedRollingpapersResponseDto.getRollingpapers();
        final List<ReceivedRollingpaperResponseDto> expected = List.of(
                new ReceivedRollingpaperResponseDto(1L, "알렉스가좋아요", teamId, "woowacourse-4th"),
                new ReceivedRollingpaperResponseDto(2L, "영환이형도좋아요", teamId, "woowacourse-4th")
        );

        assertThat(actual)
                .usingRecursiveComparison()
                .isEqualTo(expected);
    }

    @Test
    @DisplayName("내가 작성한 메시지 목록을 조회한다.")
    void findWrittenMessages() {
        //회원 추가 및 토큰
        final TokenRequest tokenRequest1 =
                new TokenRequest("KAKAO", "1", "email@email.com", "알렉스", "이미지경로");
        final TokenResponseDto token1 = 로그인_응답(tokenRequest1)
                .as(TokenResponseDto.class);

        final TokenRequest tokenRequest2 =
                new TokenRequest("KAKAO", "2", "kth990303@email.com", "케이", "이미지경로");
        final TokenResponseDto token2 = 로그인_응답(tokenRequest2)
                .as(TokenResponseDto.class);

        // 모임 생성 및 가입시키기
        final Long teamId = 모임_생성(token1);
        모임_가입(token2, teamId, new JoinTeamMemberRequest("알고리즘이좋아요"));

        회원_롤링페이퍼_생성(token2, teamId, new RollingpaperCreateRequest("알렉스가좋아요", token1.getId()));
        회원_롤링페이퍼_생성(token2, teamId, new RollingpaperCreateRequest("영환이형도좋아요", token1.getId()));

        메시지_작성(token2, 1L, new MessageRequest("좋아", "green"));
        메시지_작성(token2, 1L, new MessageRequest("ㅋㅋ", "red"));
        메시지_작성(token2, 2L, new MessageRequest("테스트", "yellow"));

        //내가 작성한 메시지를 2개만 조회
        final WrittenMessagesResponseDto writtenMessagesResponseDto = 나의_메시지_조회(token2, 0, 2)
                .as(WrittenMessagesResponseDto.class);
        final List<WrittenMessageResponseDto> actual = writtenMessagesResponseDto.getMessages();
        final List<WrittenMessageResponseDto> expected = List.of(
                new WrittenMessageResponseDto(
                        1L, 1L, "알렉스가좋아요", teamId, "woowacourse-4th", "나는야모임장",
                        "좋아", "green"),
                new WrittenMessageResponseDto(
                        2L, 1L, "알렉스가좋아요", teamId, "woowacourse-4th", "나는야모임장",
                        "ㅋㅋ", "red")
        );

        assertThat(actual)
                .usingRecursiveComparison()
                .isEqualTo(expected);

    }

    @Test
    @DisplayName("회원정보를 수정할 수 있다.")
    void updateMember() {
        //회원 추가 및 토큰
        final TokenRequest tokenRequest =
                new TokenRequest("KAKAO", "1", "email@email.com", "알렉스", "이미지경로");
        final TokenResponseDto token = 로그인_응답(tokenRequest)
                .as(TokenResponseDto.class);

        //회원정보 수정
        final MemberUpdateRequest memberUpdateRequest = new MemberUpdateRequest("zero");
        final ExtractableResponse<Response> response = 회원_유저네임_수정(token, memberUpdateRequest);

        //회원정보가 수정됨
        회원정보가_수정됨(response);
    }

    @Test
    @DisplayName("올바르지 않은 토큰으로 수정할 경우 예외가 발생한다.")
    void updateInvalidToken() {
        //회원정보 수정
        final MemberUpdateRequest memberUpdateRequest = new MemberUpdateRequest("kei");
        final ExtractableResponse<Response> response =
                회원_유저네임_수정(new TokenResponseDto("invalidToken", 9999L), memberUpdateRequest);

        //회원정보 수정 실패
        assertThat(response.statusCode()).isEqualTo(HttpStatus.UNAUTHORIZED.value());
    }

    @Test
    @DisplayName("회원을 삭제할 수 있다.")
    void deleteMember() {
        //회원 추가 및 토큰
        final TokenRequest tokenRequest =
                new TokenRequest("KAKAO", "1", "email@email.com", "알렉스", "이미지경로");
        final TokenResponseDto token = 로그인_응답(tokenRequest)
                .as(TokenResponseDto.class);

        //회원 삭제
        final ExtractableResponse<Response> response = 회원_삭제(token);

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
        //회원 추가 및 토큰
        final TokenRequest tokenRequest =
                new TokenRequest("KAKAO", "1", "email@email.com", "알렉스", "이미지경로");
        final TokenResponseDto token = 로그인_응답(tokenRequest)
                .as(TokenResponseDto.class);
        회원_삭제(token);

        //없는 회원 삭제
        final ExtractableResponse<Response> response = 회원_삭제(token);

        //회원 삭제 실패
        assertThat(response.statusCode()).isEqualTo(HttpStatus.NOT_FOUND.value());
    }

    private void 회원조회_확인(final TokenResponseDto token, final TokenRequest tokenRequest) {
        final MemberResponseDto findMember = 회원_조회(token)
                .as(MemberResponseDto.class);
        assertAll(
                () -> assertThat(findMember.getUsername()).isEqualTo(tokenRequest.getUsername()),
                () -> assertThat(findMember.getEmail()).isEqualTo(tokenRequest.getEmail())
        );
    }

    private void 회원정보가_수정됨(final ExtractableResponse<Response> response) {
        assertThat(response.statusCode()).isEqualTo(HttpStatus.NO_CONTENT.value());
    }

    private void 회원_삭제됨(final ExtractableResponse<Response> response) {
        assertThat(response.statusCode()).isEqualTo(HttpStatus.NO_CONTENT.value());
    }
}
