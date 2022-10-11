package com.woowacourse.naepyeon.domain.rollingpaper;

import java.util.Arrays;
import java.util.Optional;

public enum Recipient {

    MEMBER("member"),
    TEAM("team");

    private final String recipient;

    Recipient(final String recipient) {
        this.recipient = recipient;
    }

    public static Optional<Recipient> from(final String filter) {
        return Arrays.stream(values())
                .filter(value -> value.recipient.equals(filter))
                .findFirst();
    }
}
