package com.woowacourse.naepyeon.repository.rollingpaper;

import com.woowacourse.naepyeon.domain.rollingpaper.Rollingpaper;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RollingpaperRepository extends JpaRepository<Rollingpaper, Long> {

    Optional<Rollingpaper> findById(final Long rollingpaperId);

    List<Rollingpaper> findByMemberId(final Long memberId);

    Page<Rollingpaper> findByMemberId(final Long memberId, final Pageable pageRequest);

    List<Rollingpaper> findByTeamId(final Long teamId);
}
