package com.woowacourse.naepyeon.repository.invitecode;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

import com.woowacourse.naepyeon.config.JpaAuditingConfig;
import com.woowacourse.naepyeon.config.QueryDslConfig;
import com.woowacourse.naepyeon.domain.invitecode.InviteCode;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.context.annotation.Import;
import org.springframework.dao.DataIntegrityViolationException;

@DataJpaTest
@Import({JpaAuditingConfig.class, QueryDslConfig.class})
class InviteCodeRepositoryTest {

    @Autowired
    private InviteCodeRepository inviteCodeRepository;

    @Autowired
    private TestEntityManager em;

    @Test
    @DisplayName("중복된 코드를 저장시 예외가 발생한다.")
    void saveDuplicate() {
        final InviteCode inviteCode1 = InviteCode.createdBy(1L, () -> "duplicate");
        final InviteCode inviteCode2 = InviteCode.createdBy(2L, () -> "duplicate");

        inviteCodeRepository.save(inviteCode1);

        assertThatThrownBy(() -> inviteCodeRepository.save(inviteCode2))
                .isInstanceOf(DataIntegrityViolationException.class);
    }
}