package com.woowacourse.naepyeon.repository.jpa;

import com.woowacourse.naepyeon.domain.Rollingpaper;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RollingpaperJpaDao extends JpaRepository<Rollingpaper, Long> {

    List<Rollingpaper> findByTeamId(final Long teamId);
}