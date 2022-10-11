package com.woowacourse.naepyeon.exception;

import org.springframework.http.HttpStatus;

public class InvalidCancelLikeMessageException extends NaePyeonException {

    public InvalidCancelLikeMessageException(final Long memberId, final Long messageId) {
        super(
                String.format("이미 좋아요 취소를 눌렀습니다. memberId={%d}  messageId={%d}", memberId, messageId),
                "이미 좋아요 취소를 눌렀습니다.",
                HttpStatus.BAD_REQUEST,
                "2006"
        );
    }
}
