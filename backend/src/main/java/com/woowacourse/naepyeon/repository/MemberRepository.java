package com.woowacourse.naepyeon.repository;

import com.woowacourse.naepyeon.domain.Member;
import com.woowacourse.naepyeon.domain.Platform;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findById(final Long memberId);

    Optional<Member> findByEmail(final String email);

    @Query("select m.id "
            + "from Member m "
            + "where m.platform = :platform and m.platformId = :platformId")
    Optional<Long> findMemberIdByPlatformAndPlatformId(@Param("platform") final Platform platform,
                                                       @Param("platformId") final String platformId);
}
