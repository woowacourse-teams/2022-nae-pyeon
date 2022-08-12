package com.woowacourse.naepyeon.repository.jpa;

import com.woowacourse.naepyeon.domain.rollingpaper.Rollingpaper;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RollingpaperJpaDao extends JpaRepository<Rollingpaper, Long> {

    List<Rollingpaper> findByTeamId(final Long teamId);

    List<Rollingpaper> findByMemberId(final Long memberId);

    Page<Rollingpaper> findByMemberId(final Long memberId, final Pageable pageRequest);
}