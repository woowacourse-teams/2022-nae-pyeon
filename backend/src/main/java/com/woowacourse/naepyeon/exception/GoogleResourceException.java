package com.woowacourse.naepyeon.exception;

import org.springframework.http.HttpStatus;

public class GoogleResourceException extends NaePyeonException {

    public GoogleResourceException(final RuntimeException e, final String accessToken) {
        super(
                String.format(
                        "구글 리소스 서버 요청시 에러 발생 accessToken={%s}\nerrorMessage={%s}",
                        accessToken,
                        e.getMessage()
                ),
                "구글 로그인에 실패했습니다. 관리자에게 문의하세요.",
                HttpStatus.INTERNAL_SERVER_ERROR,
                "3017"
        );
    }
}
