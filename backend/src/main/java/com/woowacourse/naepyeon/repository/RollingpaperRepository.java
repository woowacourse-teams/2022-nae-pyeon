package com.woowacourse.naepyeon.repository;

import com.woowacourse.naepyeon.domain.Rollingpaper;
import java.util.List;
import java.util.Optional;

public interface RollingpaperRepository {

    Long save(final Rollingpaper rollingpaper);

    Optional<Rollingpaper> findById(final Long rollingpaperId);

    List<Rollingpaper> findByTeamId(final Long teamId);

    void update(final Long rollingpaperId, final String newTitle);

    void delete(final Long rollingpaperId);
}
