package com.woowacourse.naepyeon.support;

import java.security.SecureRandom;
import java.util.Date;

public class SecureRandomStringUtils {

    private static final char[] ALPHANUMERIC = {
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
            'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
            'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
    };

    public static String createRandomAlphanumericSecure(final int count) {
        final SecureRandom secureRandom = new SecureRandom();
        secureRandom.setSeed(new Date().getTime());

        final StringBuilder stringBuilder = new StringBuilder();
        for (int i = 0; i < count; i++) {
            final int index = secureRandom.nextInt(ALPHANUMERIC.length);
            stringBuilder.append(ALPHANUMERIC[index]);
        }

        return stringBuilder.toString();
    }
}
