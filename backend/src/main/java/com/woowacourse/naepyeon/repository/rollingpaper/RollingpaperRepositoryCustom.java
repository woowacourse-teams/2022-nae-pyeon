package com.woowacourse.naepyeon.repository.rollingpaper;

import com.woowacourse.naepyeon.domain.rollingpaper.Rollingpaper;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface RollingpaperRepositoryCustom {

    Page<Rollingpaper> findByAddresseeId(final Long memberId, final Pageable pageRequest);

    List<Rollingpaper> findByTeamId(final Long teamId);

    List<Rollingpaper> findByTeamIdOldestOrder(final Long teamId);

    Optional<String> findAddresseeNicknameByMemberRollingpaperId(final Long rollingpaperId);
}
