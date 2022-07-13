package com.woowacourse.naepyeon.exception;

import com.woowacourse.naepyeon.domain.Member;
import org.springframework.http.HttpStatus;

public final class ExceedMemberPasswordLengthException extends NaePyeonException {

    public ExceedMemberPasswordLengthException(final String password) {
        super(
                String.format(
                        "비밀번호는 %d자 이상 %d자 이하여야 합니다. password={%s}",
                        Member.MIN_PASSWORD_LENGTH,
                        Member.MAX_USERNAME_LENGTH,
                        password
                ),
                String.format(
                        "[3008] 비밀번호는 %d자 이상 %d자 이하여야 합니다.",
                        Member.MIN_PASSWORD_LENGTH,
                        Member.MAX_USERNAME_LENGTH
                ),
                HttpStatus.BAD_REQUEST
        );
    }
}
