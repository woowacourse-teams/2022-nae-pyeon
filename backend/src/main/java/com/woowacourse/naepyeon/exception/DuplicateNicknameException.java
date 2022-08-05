package com.woowacourse.naepyeon.exception;

import org.springframework.http.HttpStatus;

public final class DuplicateNicknameException extends NaePyeonException {

    public DuplicateNicknameException(final String nickname) {
        super(
                String.format("이미 존재하는 닉네임입니다. teamName={%s}", nickname),
                "이미 존재하는 닉네임입니다.",
                HttpStatus.BAD_REQUEST,
                "4014"
        );
    }
}
