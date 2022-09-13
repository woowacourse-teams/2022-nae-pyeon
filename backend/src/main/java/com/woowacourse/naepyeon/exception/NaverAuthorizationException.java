package com.woowacourse.naepyeon.exception;

import org.springframework.http.HttpStatus;

public class NaverAuthorizationException extends NaePyeonException {

    public NaverAuthorizationException(final RuntimeException e) {
        super(
                String.format(
                        "네이버 서버 에러입니다. errorMessage={%s}", e.getMessage()
                ),
                "네이버 로그인에 실패했습니다. 관리자에게 문의하세요.",
                HttpStatus.BAD_REQUEST,
                "3016"
        );
    }
}
