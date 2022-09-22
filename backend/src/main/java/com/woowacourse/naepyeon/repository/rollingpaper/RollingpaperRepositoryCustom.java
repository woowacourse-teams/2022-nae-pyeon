package com.woowacourse.naepyeon.repository.rollingpaper;

import com.woowacourse.naepyeon.domain.rollingpaper.Rollingpaper;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface RollingpaperRepositoryCustom {

    Page<Rollingpaper> findByMemberId(final Long memberId, final Pageable pageRequest);

    List<Rollingpaper> findByTeamId(final Long teamId);
}
