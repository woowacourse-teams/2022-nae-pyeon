package com.woowacourse.naepyeon.acceptance;

import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.리프레시_토큰_무효화;
import static com.woowacourse.naepyeon.acceptance.AcceptanceFixture.액세스_토큰_재발급;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import com.woowacourse.naepyeon.controller.dto.ErrorResponse;
import com.woowacourse.naepyeon.service.dto.AccessTokenDto;
import com.woowacourse.naepyeon.service.dto.RefreshTokenDto;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;

class AuthAcceptanceTest extends AcceptanceTest {

    @Test
    @DisplayName("리프레시 토큰으로 새 엑세스 토큰을 요청한다.")
    void renewalToken() {
        final ExtractableResponse<Response> response = 액세스_토큰_재발급(alex, new RefreshTokenDto(alex.getRefreshToken()));

        final AccessTokenDto accessTokenDto = response.as(AccessTokenDto.class);
        final Long alexId = Long.valueOf(jwtTokenProvider.getPayload(accessTokenDto.getAccessToken()));

        assertThat(alexId).isEqualTo(alex.getId());
    }

    @Test
    @DisplayName("리프레시 토큰이 만료됐을 경우 새 엑세스 토큰을 요청하면 401에러를 던진다.")
    void renewalTokenExpired() {
        리프레시_토큰_무효화(alex, new RefreshTokenDto(alex.getRefreshToken()));
        final ExtractableResponse<Response> response = 액세스_토큰_재발급(alex, new RefreshTokenDto(alex.getRefreshToken()));

        final ErrorResponse errorResponse = response.as(ErrorResponse.class);
        assertAll(
                () -> assertThat(response.statusCode()).isEqualTo(HttpStatus.UNAUTHORIZED.value()),
                () -> assertThat(errorResponse.getErrorCode()).isEqualTo("3019"),
                () -> assertThat(errorResponse.getMessage()).isEqualTo("리프레시 토큰이 만료되었습니다.")
        );
    }
}
