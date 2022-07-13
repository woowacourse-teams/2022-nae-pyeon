package com.woowacourse.naepyeon.exception;

import org.springframework.http.HttpStatus;

public final class InvalidMemberUsernameException extends NaePyeonException {

    public InvalidMemberUsernameException(final String username) {
        super(
                String.format("올바르지 않은 username입니다. username={%s}", username),
                "[3006] 유저네임은 영어, 한국어, 숫자로 구성해야 합니다.",
                HttpStatus.BAD_REQUEST
        );
    }
}
