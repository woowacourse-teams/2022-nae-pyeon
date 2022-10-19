package com.woowacourse.naepyeon.exception;

import org.springframework.http.HttpStatus;

public class RefreshTokenExpiredException extends NaePyeonException {

    public RefreshTokenExpiredException() {
        super(
                "리프레시 토큰이 만료되었습니다.",
                "리프레시 토큰이 만료되었습니다.",
                HttpStatus.UNAUTHORIZED,
                "3019"
        );
    }
}
