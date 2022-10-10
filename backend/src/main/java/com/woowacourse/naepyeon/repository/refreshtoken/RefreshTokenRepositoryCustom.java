package com.woowacourse.naepyeon.repository.refreshtoken;

public interface RefreshTokenRepositoryCustom {

    Long findCountByMemberId(final Long memberId);
}
