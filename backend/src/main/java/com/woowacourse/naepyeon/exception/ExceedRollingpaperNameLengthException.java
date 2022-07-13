package com.woowacourse.naepyeon.exception;

import com.woowacourse.naepyeon.domain.Rollingpaper;
import org.springframework.http.HttpStatus;

public final class ExceedRollingpaperNameLengthException extends NaePyeonException {

    public ExceedRollingpaperNameLengthException(final String title) {
        super(
                String.format("롤링페이퍼 제목은 %d자를 초과할 수 없습니다. title={%s}", Rollingpaper.MAX_TITLE_LENGTH, title),
                String.format("[1001] 롤링페이퍼 제목은 %d자를 초과할 수 없습니다.", Rollingpaper.MAX_TITLE_LENGTH),
                HttpStatus.BAD_REQUEST
        );
    }
}
