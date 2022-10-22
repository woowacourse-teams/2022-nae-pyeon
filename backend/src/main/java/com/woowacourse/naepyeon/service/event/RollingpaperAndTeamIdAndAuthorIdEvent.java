package com.woowacourse.naepyeon.service.event;

import com.woowacourse.naepyeon.domain.rollingpaper.Rollingpaper;
import java.util.Objects;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class RollingpaperAndTeamIdAndAuthorIdEvent {

    private final Rollingpaper rollingpaper;
    private final Long teamId;
    private final Long authorId;

    @Override
    public boolean equals(final Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final RollingpaperAndTeamIdAndAuthorIdEvent that = (RollingpaperAndTeamIdAndAuthorIdEvent) o;
        return Objects.equals(getRollingpaper(), that.getRollingpaper()) && Objects.equals(getTeamId(),
                that.getTeamId()) && Objects.equals(getAuthorId(), that.getAuthorId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getRollingpaper(), getTeamId(), getAuthorId());
    }
}
