package com.woowacourse.naepyeon.repository.refreshtoken;

import com.woowacourse.naepyeon.domain.refreshtoken.RefreshToken;
import java.time.LocalDateTime;
import java.util.List;

public interface RefreshTokenRepositoryCustom {

    List<RefreshToken> findByMemberId(final Long memberId);

    long deleteExpired(final LocalDateTime deleteTime);
}
