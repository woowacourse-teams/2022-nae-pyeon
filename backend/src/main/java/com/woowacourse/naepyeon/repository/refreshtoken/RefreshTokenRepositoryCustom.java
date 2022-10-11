package com.woowacourse.naepyeon.repository.refreshtoken;

import com.woowacourse.naepyeon.domain.refreshtoken.RefreshToken;
import java.util.List;

public interface RefreshTokenRepositoryCustom {

    List<RefreshToken> findByMemberId(final Long memberId);
}
