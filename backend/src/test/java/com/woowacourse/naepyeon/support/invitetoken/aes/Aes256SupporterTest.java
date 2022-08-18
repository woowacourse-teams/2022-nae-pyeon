package com.woowacourse.naepyeon.support.invitetoken.aes;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;

class Aes256SupporterTest {

    private final Aes256Supporter aes256Supporter = new Aes256Supporter("a".repeat(16));

    @Test
    void encryptAndDecrypt() {
        final String expected = "alex";
        final String encrypted = aes256Supporter.encrypt(expected);

        final String actual = aes256Supporter.decrypt(encrypted);

        assertThat(actual).isEqualTo(expected);
    }
}