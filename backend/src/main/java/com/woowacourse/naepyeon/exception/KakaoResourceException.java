package com.woowacourse.naepyeon.exception;

import org.springframework.http.HttpStatus;

public final class KakaoResourceException extends NaePyeonException {

    public KakaoResourceException(final RuntimeException e, final String accessToken) {
        super(
                String.format(
                        "카카오 리소스 서버 요청시 에러 발생 accessToken={%s}\nerrorMessage={%s}",
                        accessToken,
                        e.getMessage()
                ),
                "authorizationCode, redirectUri를 제대로 전달하고 있는지 확인하세요. 제대로 전달중이라면 서버 개발자에게 문의바랍니다.",
                HttpStatus.INTERNAL_SERVER_ERROR,
                "3015"
        );
    }
}
