package com.woowacourse.naepyeon.domain.rollingpaper;

import java.util.Arrays;
import java.util.Optional;

public enum Recipient {

    MEMBER("member"),
    TEAM("team");

    private final String target;

    Recipient(final String target) {
        this.target = target;
    }

    public static Optional<Recipient> from(final String filter) {
        return Arrays.stream(values())
                .filter(value -> value.target.equals(filter))
                .findFirst();
    }
}
