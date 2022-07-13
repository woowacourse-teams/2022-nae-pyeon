package com.woowacourse.naepyeon.exception;

import com.woowacourse.naepyeon.domain.Message;
import org.springframework.http.HttpStatus;

public final class ExceedMessageContentLengthException extends NaePyeonException {

    public ExceedMessageContentLengthException(final String message) {
        super(
                String.format("메시지 내용 사이즈 초과입니다 message={%s}", message),
                String.format("[2002] 메시지 내용은 %d자 까지만 가능합니다.", Message.MAX_CONTENT_LENGTH),
                HttpStatus.BAD_REQUEST
        );
    }
}
