package com.woowacourse.naepyeon.exception;

import org.springframework.http.HttpStatus;

public final class NotFoundTeamException extends NaePyeonException {

    public NotFoundTeamException(final Long teamId) {
        super(
                String.format("해당 모임이 존재하지 않습니다. id={%d}", teamId),
                "존재하지 않는 모임입니다.",
                HttpStatus.NOT_FOUND,
                "4000"
        );
    }
}
