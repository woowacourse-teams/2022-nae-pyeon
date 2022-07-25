package com.woowacourse.naepyeon.exception;

import com.woowacourse.naepyeon.domain.Team;
import org.springframework.http.HttpStatus;

public final class ExceedTeamNameLengthException extends NaePyeonException {

    public ExceedTeamNameLengthException(final String name) {
        super(
                String.format("모임 이름은 %d자 이하여야 합니다. name={%s}", Team.MAX_TEAMNAME_LENGTH, name),
                String.format("모임 이름은 %d자 이하여야 합니다.", Team.MAX_TEAMNAME_LENGTH),
                HttpStatus.BAD_REQUEST,
                "4002"
        );

    }
}
