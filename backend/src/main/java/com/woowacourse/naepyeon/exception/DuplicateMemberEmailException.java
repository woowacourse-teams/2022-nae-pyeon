package com.woowacourse.naepyeon.exception;

import org.springframework.http.HttpStatus;

public final class DuplicateMemberEmailException extends NaePyeonException {

    public DuplicateMemberEmailException() {
        super(
                "이미 이메일이 중복되는 회원이 존재합니다.",
                "이미 가입된 이메일입니다.",
                HttpStatus.BAD_REQUEST,
                "3003"
        );
    }
}
