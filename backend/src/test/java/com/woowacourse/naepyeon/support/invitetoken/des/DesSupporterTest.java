package com.woowacourse.naepyeon.support.invitetoken.des;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;

class DesSupporterTest {

    private final DesSupporter desSupporter = new DesSupporter("a".repeat(16));

    @Test
    void encryptAndDecrypt() {
        final String expected = "alex";
        final String encrypted = desSupporter.encrypt(expected);

        final String actual = desSupporter.decrypt(encrypted);

        assertThat(actual).isEqualTo(expected);
    }
}