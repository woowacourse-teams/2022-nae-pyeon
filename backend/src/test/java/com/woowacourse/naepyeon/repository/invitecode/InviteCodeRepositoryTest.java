package com.woowacourse.naepyeon.repository.invitecode;

import static org.assertj.core.api.Assertions.*;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.woowacourse.naepyeon.config.JpaAuditingConfig;
import com.woowacourse.naepyeon.config.QueryDslConfig;
import com.woowacourse.naepyeon.domain.invitecode.InviteCode;
import java.time.LocalDateTime;
import java.util.List;
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

    @Test
    @DisplayName("만료된 초대코드 데이터를 삭제한다.")
    void deleteExpired() {
        final InviteCode inviteCode1 = new InviteCode(null, "abc", 1L, LocalDateTime.now().minusHours(1));
        final InviteCode inviteCode2 = new InviteCode(null, "def", 2L, LocalDateTime.now().minusHours(1));
        final InviteCode inviteCode3 = new InviteCode(null, "ghi", 3L, LocalDateTime.now().plusHours(1));
        final InviteCode inviteCode4 = new InviteCode(null, "jkl", 4L, LocalDateTime.now().plusHours(1));
        inviteCodeRepository.save(inviteCode1);
        inviteCodeRepository.save(inviteCode2);
        inviteCodeRepository.save(inviteCode3);
        inviteCodeRepository.save(inviteCode4);
        em.flush();
        em.clear();

        inviteCodeRepository.deleteExpired(LocalDateTime.now());
        final List<InviteCode> inviteCodes = inviteCodeRepository.findAll();

        assertThat(inviteCodes).extracting("code")
                .containsExactly(inviteCode3.getCode(), inviteCode4.getCode());
    }
}