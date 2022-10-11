package com.woowacourse.naepyeon.exception;

import org.springframework.http.HttpStatus;

public class InvalidDisLikeMessageException extends NaePyeonException {

    public InvalidDisLikeMessageException(final Long memberId, final Long messageId) {
        super(
                String.format("이미 좋아요 취소를 눌렀습니다. memberId={%d}  messageId={%d}", memberId, messageId),
                "이미 좋아요 취소를 눌렀습니다.",
                HttpStatus.NOT_FOUND,
                "2006"
        );
    }
}
