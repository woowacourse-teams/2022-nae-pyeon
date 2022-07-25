package com.woowacourse.naepyeon.exception;

import org.springframework.http.HttpStatus;

public final class DuplicateTeamNameException extends NaePyeonException {

    public DuplicateTeamNameException(final String teamName) {
        super(
                String.format("이미 존재하는 모임 이름입니다. teamName={%s}", teamName),
                "이미 존재하는 모임 이름입니다.",
                HttpStatus.BAD_REQUEST,
                "4011"
        );
    }
}
