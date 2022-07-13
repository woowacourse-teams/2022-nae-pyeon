package com.woowacourse.naepyeon.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public abstract class NaePyeonException extends RuntimeException {

    private final String showMessage;
    private final HttpStatus httpStatus;

    public NaePyeonException(final String message, final String showMessage, final HttpStatus httpStatus) {
        super(message);
        this.showMessage = showMessage;
        this.httpStatus = httpStatus;
    }
}
