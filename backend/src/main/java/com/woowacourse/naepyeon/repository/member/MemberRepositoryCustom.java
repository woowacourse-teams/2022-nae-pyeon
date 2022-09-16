package com.woowacourse.naepyeon.repository.member;

import com.woowacourse.naepyeon.domain.Platform;
import java.util.Optional;

public interface MemberRepositoryCustom {

    Optional<Long> findMemberIdByPlatformAndPlatformId(final Platform platform, final String platformId);
}
