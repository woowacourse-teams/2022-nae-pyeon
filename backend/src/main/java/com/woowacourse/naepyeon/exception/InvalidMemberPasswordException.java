package com.woowacourse.naepyeon.exception;

import org.springframework.http.HttpStatus;

public final class InvalidMemberPasswordException extends NaePyeonException {

    public InvalidMemberPasswordException(final String password) {
        super(
                String.format("비밀번호는 최소 하나 이상의 알파벳과 숫자로 구성해야 합니다. password={%s}", password),
                "[3009] 비밀번호는 최소 하나 이상의 알파벳과 숫자로 구성해야 합니다.",
                HttpStatus.BAD_REQUEST
        );
    }
}
