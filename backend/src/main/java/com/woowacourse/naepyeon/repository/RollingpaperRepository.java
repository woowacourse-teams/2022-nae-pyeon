package com.woowacourse.naepyeon.repository;

import com.woowacourse.naepyeon.domain.Rollingpaper;
import java.util.Optional;

public interface RollingpaperRepository {

    Long save(final Rollingpaper rollingpaper);

    Optional<Rollingpaper> findById(final Long id);

    void update(final Long id, final String newTitle);

    void delete(final Long id);
}
