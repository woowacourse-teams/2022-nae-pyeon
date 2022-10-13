package com.woowacourse.naepyeon.domain.refreshtoken;

@FunctionalInterface
public interface RefreshTokenGenerator {

    String generate();
}
