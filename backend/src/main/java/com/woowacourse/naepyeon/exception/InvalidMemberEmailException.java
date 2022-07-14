package com.woowacourse.naepyeon.exception;

import org.springframework.http.HttpStatus;

public final class InvalidMemberEmailException extends NaePyeonException {

    public InvalidMemberEmailException(final String email) {
        super(
                String.format("이메일 정규식에 위반되는 이메일입니다. email = {%s}", email),
                "유효하지 않은 이메일입니다.",
                HttpStatus.BAD_REQUEST,
                "3002"
        );
    }
}
