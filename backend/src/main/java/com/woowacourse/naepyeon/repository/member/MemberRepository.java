package com.woowacourse.naepyeon.repository.member;

import com.woowacourse.naepyeon.domain.Member;
import com.woowacourse.naepyeon.domain.Platform;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long>, MemberRepositoryCustom {

    Optional<Member> findById(final Long memberId);

    Optional<Member> findByEmail(final String email);

    Optional<Long> findMemberIdByPlatformAndPlatformId(final Platform platform, final String platformId);
}
