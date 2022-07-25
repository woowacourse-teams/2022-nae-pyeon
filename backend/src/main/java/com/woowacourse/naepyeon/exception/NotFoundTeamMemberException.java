package com.woowacourse.naepyeon.exception;

import org.springframework.http.HttpStatus;

public final class NotFoundTeamMemberException extends NaePyeonException {

    public NotFoundTeamMemberException(final Long memberId) {
        super(
                String.format("해당 모임에 가입되지 않은 회원입니다. memberId={%d}", memberId),
                "해당 모임에 가입되지 않은 회원입니다.",
                HttpStatus.NOT_FOUND,
                "4012"
        );
    }
}
