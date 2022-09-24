package com.woowacourse.naepyeon.repository.invitecode;

import com.woowacourse.naepyeon.domain.invitecode.InviteCode;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InviteCodeRepository extends JpaRepository<InviteCode, Long> {

    Optional<InviteCode> findByCode(final String code);
}
