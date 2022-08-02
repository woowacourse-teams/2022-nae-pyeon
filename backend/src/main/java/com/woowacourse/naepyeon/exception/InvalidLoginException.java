package com.woowacourse.naepyeon.exception;

import org.springframework.http.HttpStatus;

public final class InvalidLoginException extends NaePyeonException {

    public InvalidLoginException(final String platformType, final Long platformId) {
        super(
                String.format(
                        "존재하지 않는 유저의 토큰입니다. 다시 로그인해주세요. platformType = {%s}, platformId = {%d}",
                        platformType,
                        platformId
                ),
                "존재하지 않는 유저의 토큰입니다. 다시 로그인해주세요.",
                HttpStatus.UNAUTHORIZED,
                "3010"
        );
    }
}
