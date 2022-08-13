package com.woowacourse.naepyeon.exception;

import org.springframework.http.HttpStatus;

public class InvalidSecretMessageToTeam extends NaePyeonException {

    public InvalidSecretMessageToTeam(final Long rollingpaperId) {
        super(
                String.format("모임에게 작성하는 메시지는 비밀로 작성할 수 없습니다. rollingpaperId = {%d}", rollingpaperId),
                "모임에게 작성하는 메시지는 비밀로 작성할 수 없습니다.",
                HttpStatus.BAD_REQUEST,
                "2004"
        );
    }
}
