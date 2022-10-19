package com.woowacourse.naepyeon.service.event;

import com.woowacourse.naepyeon.domain.rollingpaper.Rollingpaper;
import java.util.Objects;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class RollingpaperEvent {

    private final Rollingpaper rollingpaper;

    @Override
    public boolean equals(final Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final RollingpaperEvent that = (RollingpaperEvent) o;
        return Objects.equals(getRollingpaper(), that.getRollingpaper());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getRollingpaper());
    }
}
