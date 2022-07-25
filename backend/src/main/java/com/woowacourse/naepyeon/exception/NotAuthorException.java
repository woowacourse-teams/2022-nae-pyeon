package com.woowacourse.naepyeon.exception;

import org.springframework.http.HttpStatus;

public class NotAuthorException extends NaePyeonException {

    public NotAuthorException(final Long memberId) {
        super(
                String.format("해당 회원은 작성자가 아닙니다. id={%d}", memberId),
                "해당 글의 작성자가 아닙니다.",
                HttpStatus.FORBIDDEN,
                "2003"
        );
    }
}
