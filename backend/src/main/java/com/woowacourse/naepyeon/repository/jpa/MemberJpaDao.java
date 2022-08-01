package com.woowacourse.naepyeon.repository.jpa;

import com.woowacourse.naepyeon.domain.Member;
import com.woowacourse.naepyeon.domain.Platform;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberJpaDao extends JpaRepository<Member, Long> {

    Optional<Member> findByEmail(final String email);

    Optional<Member> findByPlatformAndPlatformId(final Platform platform, final Long platformId);
}