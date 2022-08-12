package com.woowacourse.naepyeon.exception;

import org.springframework.http.HttpStatus;

public final class InviteTokenInvalidFormException extends NaePyeonException {

    public InviteTokenInvalidFormException() {
        super(
                "올바르지 않은 토큰입니다.",
                "올바르지 않은 토큰입니다.",
                HttpStatus.BAD_REQUEST,
                "4015"
        );
    }
}
