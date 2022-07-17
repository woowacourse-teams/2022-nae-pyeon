package com.woowacourse.naepyeon.exception;

import org.springframework.http.HttpStatus;

public final class DuplicateTeamPaticipateException extends NaePyeonException {

    public DuplicateTeamPaticipateException(final Long teamId, final Long memberId) {
        super(
                String.format("이미 가입된 모임입니다. teamId={%d}, memberId={%d}", teamId, memberId),
                "이미 가입한 모임입니다.",
                HttpStatus.BAD_REQUEST,
                "4007"
        );
    }
}
