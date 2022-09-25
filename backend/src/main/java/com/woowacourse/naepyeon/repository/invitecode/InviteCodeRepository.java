package com.woowacourse.naepyeon.repository.invitecode;

import com.woowacourse.naepyeon.domain.invitecode.InviteCode;
import java.time.LocalDateTime;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface InviteCodeRepository extends JpaRepository<InviteCode, Long> {

    Optional<InviteCode> findByCode(final String code);

    @Query("delete from InviteCode ic where ic.expired < :now")
    @Modifying(clearAutomatically = true, flushAutomatically = true)
    int deleteExpired(@Param("now") final LocalDateTime now);
}
