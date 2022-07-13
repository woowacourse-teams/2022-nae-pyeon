package com.woowacourse.naepyeon.exception;

import org.springframework.http.HttpStatus;

public final class NotFoundMemberException extends NaePyeonException {

    public NotFoundMemberException(final Long messageId) {
        super(
                String.format("해당 회원가 존재하지 않습니다. id={%d}", messageId),
                "[3000] 올바르지 않은 회원입니다.",
                HttpStatus.NOT_FOUND
        );
    }
}
