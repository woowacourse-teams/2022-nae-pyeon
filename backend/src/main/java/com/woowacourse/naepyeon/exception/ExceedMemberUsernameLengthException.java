package com.woowacourse.naepyeon.exception;

import com.woowacourse.naepyeon.domain.Member;
import org.springframework.http.HttpStatus;

public final class ExceedMemberUsernameLengthException extends NaePyeonException {

    public ExceedMemberUsernameLengthException(final String username) {
        super(
                String.format(
                        "유저네임은 %d자 이상 %d자 이하여야 합니다. username={%s}",
                        Member.MIN_USERNAME_LENGTH,
                        Member.MAX_USERNAME_LENGTH,
                        username
                ),
                String.format(
                        "유저네임은 %d자 이상 %d자 이하여야 합니다.",
                        Member.MIN_USERNAME_LENGTH,
                        Member.MAX_USERNAME_LENGTH
                ),
                HttpStatus.BAD_REQUEST,
                "3005"
        );
    }
}
