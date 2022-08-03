package com.woowacourse.naepyeon.exception;

import org.springframework.http.HttpStatus;

public final class KakaoAuthorizationException extends NaePyeonException {

    public KakaoAuthorizationException(final RuntimeException e) {
        super(
                String.format(
                        "전달받은 authorizationCode나 redirectUri가 잘못 되었거나 카카오 서버 에러입니다. errorMessage={%s}",
                        e.getMessage()
                ),
                "authorizationCode, redirectUri를 제대로 전달하고 있는지 확인하세요. 제대로 전달중이라면 서버 개발자에게 문의바랍니다.",
                HttpStatus.BAD_REQUEST,
                "3014"
        );
    }
}
