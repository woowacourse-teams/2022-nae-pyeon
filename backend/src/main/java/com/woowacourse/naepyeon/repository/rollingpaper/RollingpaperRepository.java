package com.woowacourse.naepyeon.repository.rollingpaper;

import com.woowacourse.naepyeon.domain.rollingpaper.Rollingpaper;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RollingpaperRepository extends JpaRepository<Rollingpaper, Long>, RollingpaperRepositoryCustom {

}
