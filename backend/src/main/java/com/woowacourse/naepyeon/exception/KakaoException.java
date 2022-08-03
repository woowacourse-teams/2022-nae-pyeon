package com.woowacourse.naepyeon.exception;

import org.springframework.http.HttpStatus;

public final class KakaoException extends NaePyeonException {

    public KakaoException(final Exception e) {
        super(e.getMessage(), "잘못된 요청입니다.", HttpStatus.BAD_REQUEST, "9999");
    }
}
