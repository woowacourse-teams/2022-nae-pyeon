package com.woowacourse.naepyeon.support;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class SecureRandomStringUtilsTest {

    @Test
    @DisplayName("입력받은 길이의 숫자랑 알파벳만 들어간 랜덤 문자열을 만든다.")
    void createRandomAlphanumericSecure() {
        final String randomString = SecureRandomStringUtils.createRandomAlphanumericSecure(10);

        assertAll(
                () -> assertThat(randomString).hasSize(10),
                () -> assertThat(randomString).matches("^[a-zA-Z0-9]*$")
        );
    }
}
