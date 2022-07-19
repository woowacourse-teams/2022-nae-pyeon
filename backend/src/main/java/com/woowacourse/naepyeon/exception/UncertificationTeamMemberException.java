package com.woowacourse.naepyeon.exception;

import org.springframework.http.HttpStatus;

public final class UncertificationTeamMemberException extends NaePyeonException {

    public UncertificationTeamMemberException(final Long teamId, final Long memberId) {
        super(
                String.format("해당 모임에 가입해야 가능한 작업입니다. teamId={%d}, memberId={%d}", teamId, memberId),
                "해당 모임에 가입해야 가능한 작업입니다.",
                HttpStatus.FORBIDDEN,
                "4013"
        );
    }
}
