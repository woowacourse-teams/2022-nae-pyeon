package com.woowacourse.naepyeon.exception;

import org.springframework.http.HttpStatus;

public final class TokenInvalidExpiredException extends NaePyeonException {

    public TokenInvalidExpiredException() {
        super(
                "토큰의 유효기간이 만료됐습니다.",
                "토큰의 유효기간이 만료됐습니다.",
                HttpStatus.BAD_REQUEST,
                "3012"
        );
    }
}
