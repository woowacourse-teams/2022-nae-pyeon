package com.woowacourse.naepyeon.exception;

import org.springframework.http.HttpStatus;

public class RefreshTokenInvalidException extends NaePyeonException {

    public RefreshTokenInvalidException() {
        super(
                "올바르지 않은 리프레시 토큰입니다.",
                "올바르지 않은 리프레시 토큰입니다.",
                HttpStatus.UNAUTHORIZED,
                "3018"
        );
    }
}
