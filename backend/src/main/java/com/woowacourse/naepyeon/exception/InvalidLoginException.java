package com.woowacourse.naepyeon.exception;

import org.springframework.http.HttpStatus;

public final class InvalidLoginException extends NaePyeonException {

    public InvalidLoginException(final String email) {
        super(
                String.format("이메일 정규식에 위반되는 이메일입니다. email = {%s}", email),
                "이메일 또는 비밀번호가 일치하지 않습니다.",
                HttpStatus.BAD_REQUEST,
                "3010"
        );
    }
}
