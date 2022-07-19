package com.woowacourse.naepyeon.exception;

import org.springframework.http.HttpStatus;

public final class NotFoundMemberException extends NaePyeonException {

    public NotFoundMemberException(final Long memberId) {
        super(
                String.format("해당 회원이 존재하지 않습니다. id={%d}", memberId),
                "올바르지 않은 회원입니다.",
                HttpStatus.NOT_FOUND,
                "3000"
        );
    }
}
