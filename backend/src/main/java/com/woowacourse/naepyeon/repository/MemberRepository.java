package com.woowacourse.naepyeon.repository;

import com.woowacourse.naepyeon.domain.Member;
import com.woowacourse.naepyeon.domain.Platform;
import java.util.Optional;

public interface MemberRepository {

    Long save(final Member member);

    Optional<Member> findById(final Long memberId);

    Optional<Member> findByEmail(final String email);

    void delete(final Long memberId);

    Optional<Long> findMemberIdByPlatformAndPlatformId(final Platform platform, final String platformId);
}
