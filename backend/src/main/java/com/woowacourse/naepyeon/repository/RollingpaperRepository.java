package com.woowacourse.naepyeon.repository;

import com.woowacourse.naepyeon.domain.Rollingpaper;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface RollingpaperRepository {

    Long save(final Rollingpaper rollingpaper);

    Optional<Rollingpaper> findById(final Long rollingpaperId);

    List<Rollingpaper> findByMemberId(final Long memberId);

    Page<Rollingpaper> findByMemberId(final Long memberId, final Pageable pageRequest);

    List<Rollingpaper> findByTeamId(final Long teamId);

    void update(final Long rollingpaperId, final String newTitle);

    void delete(final Long rollingpaperId);
}
