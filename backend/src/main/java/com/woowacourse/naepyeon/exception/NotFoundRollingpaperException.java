package com.woowacourse.naepyeon.exception;

import org.springframework.http.HttpStatus;

public final class NotFoundRollingpaperException extends NaePyeonException {

    public NotFoundRollingpaperException(final Long rollingpaperId) {
        super(
                String.format("해당 롤링페이퍼가 존재하지 않습니다. id={%d}", rollingpaperId),
                "올바르지 않은 롤링페이퍼입니다.",
                HttpStatus.NOT_FOUND,
                "1000"
        );
    }
}
