package com.woowacourse.naepyeon.repository.invitecode;

import com.woowacourse.naepyeon.domain.invitecode.InviteCode;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InviteCodeRepository extends JpaRepository<InviteCode, Long>, InviteCodeRepositoryCustom {
}
