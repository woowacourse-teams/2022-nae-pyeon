package com.woowacourse.naepyeon.exception;

import com.woowacourse.naepyeon.domain.TeamParticipation;
import org.springframework.http.HttpStatus;

public class ExceedNicknameLengthException extends NaePyeonException {

    public ExceedNicknameLengthException(final String nickname) {
        super(
                String.format("닉네임 글자 수 초과 nickname={%s}", nickname),
                String.format("닉네임은 %d자 이하여야 합니다.", TeamParticipation.MAX_NICKNAME_LENGTH),
                HttpStatus.BAD_REQUEST,
                "4010"
        );
    }
}
