package com.woowacourse.naepyeon.exception;

import org.springframework.http.HttpStatus;

public final class InviteCodeExpiredException extends NaePyeonException {

    public InviteCodeExpiredException() {
        super(
                "초대코드의 유효기간이 만료됐습니다.",
                "초대코드의 유효기간이 만료됐습니다.",
                HttpStatus.BAD_REQUEST,
                "4017"
        );
    }
}
