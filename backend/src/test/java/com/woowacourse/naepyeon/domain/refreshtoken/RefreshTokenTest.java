package com.woowacourse.naepyeon.domain.refreshtoken;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

import com.woowacourse.naepyeon.domain.Member;
import com.woowacourse.naepyeon.domain.Platform;
import java.time.LocalDateTime;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class RefreshTokenTest {

    @Test
    @DisplayName("생성시간 7일 뒤의 expiredTime을 가지는 리프레시 토큰을 생성한다.")
    void createBy() {
        final Member member = new Member("name", "email@email.com", Platform.KAKAO, "1");
        final String refreshTokenValue = "refreshToken";

        final RefreshToken refreshToken = RefreshToken.createBy(member, () -> refreshTokenValue);

        final LocalDateTime beforeExpiredTime = LocalDateTime.now().plusDays(6).plusHours(23).plusMinutes(59);
        final LocalDateTime afterExpiredTime = LocalDateTime.now().plusDays(7).plusMinutes(1);
        assertAll(
                () -> assertThat(refreshToken.getExpiredTime()).isBetween(beforeExpiredTime, afterExpiredTime),
                () -> assertThat(refreshToken.getValue()).isEqualTo(refreshTokenValue)
        );
    }
}
