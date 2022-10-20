package com.woowacourse.naepyeon.exception;

import org.springframework.data.redis.connection.Message;
import org.springframework.http.HttpStatus;

public class InvalidRedisMessageException extends NaePyeonException {

    public InvalidRedisMessageException(final Message message) {
        super(
                String.format("유효하지 않은 reids message입니다. message= {%s}", message),
                "유효하지 않은 redis message입니다.",
                HttpStatus.BAD_REQUEST,
                "5002"
        );
    }
}
