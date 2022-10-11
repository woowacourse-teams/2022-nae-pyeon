package com.woowacourse.naepyeon.repository.invitecode;

import com.woowacourse.naepyeon.domain.invitecode.InviteCode;
import java.time.LocalDateTime;
import java.util.Optional;

public interface InviteCodeRepositoryCustom {

    long deleteExpired(final LocalDateTime deleteTime);

    Optional<InviteCode> findByCode(final String code);
}
