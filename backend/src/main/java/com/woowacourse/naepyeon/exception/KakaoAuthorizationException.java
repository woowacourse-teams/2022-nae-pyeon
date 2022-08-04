package com.woowacourse.naepyeon.exception;

import org.springframework.http.HttpStatus;

public final class KakaoAuthorizationException extends NaePyeonException {

    public KakaoAuthorizationException(final RuntimeException e) {
        super(
                String.format(
                        "전달받은 authorizationCode나 redirectUri가 잘못 되었거나 카카오 서버 에러입니다. errorMessage={%s}",
                        e.getMessage()
                ),
                "카카오 로그인에 실패했습니다. 관리자에게 문의하세요.",
                HttpStatus.BAD_REQUEST,
                "3014"
        );
    }
}
