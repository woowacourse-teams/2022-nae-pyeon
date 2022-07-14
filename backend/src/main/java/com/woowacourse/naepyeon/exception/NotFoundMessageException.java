package com.woowacourse.naepyeon.exception;

import org.springframework.http.HttpStatus;

public final class NotFoundMessageException extends NaePyeonException {

    public NotFoundMessageException(final Long messageId) {
        super(
                String.format("해당 메시지가 존재하지 않습니다. id={%d}", messageId),
                "올바르지 않은 메시지입니다.",
                HttpStatus.NOT_FOUND,
                "2000"
        );
    }
}
