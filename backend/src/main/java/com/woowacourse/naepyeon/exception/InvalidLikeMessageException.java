package com.woowacourse.naepyeon.exception;

import org.springframework.http.HttpStatus;

public class InvalidLikeMessageException extends NaePyeonException {

    public InvalidLikeMessageException(final Long memberId, final Long messageId) {
        super(
                String.format("이미 좋아요를 눌렀습니다. memberId={%d}  messageId={%d}", memberId, messageId),
                "이미 좋아요를 눌렀습니다.",
                HttpStatus.NOT_FOUND,
                "2005"
        );
    }
}
