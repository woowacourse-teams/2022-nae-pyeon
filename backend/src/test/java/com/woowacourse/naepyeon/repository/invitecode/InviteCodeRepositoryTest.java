package com.woowacourse.naepyeon.repository.invitecode;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.woowacourse.naepyeon.config.JpaAuditingConfig;
import com.woowacourse.naepyeon.config.QueryDslConfig;
import com.woowacourse.naepyeon.domain.Team;
import com.woowacourse.naepyeon.domain.invitecode.InviteCode;
import com.woowacourse.naepyeon.repository.team.TeamRepository;
import java.time.LocalDateTime;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
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
    private TeamRepository teamRepository;

    @Autowired
    private TestEntityManager em;

    Team team1;
    Team team2;
    Team team3;
    Team team4;

    @BeforeEach
    void setUp() {
        team1 = new Team("woowacourse1", "테스트 모임입니다.", "testEmoji", "#123456", false);
        team2 = new Team("woowacourse2", "테스트 모임입니다.", "testEmoji", "#123456", false);
        team3 = new Team("woowacourse3", "테스트 모임입니다.", "testEmoji", "#123456", false);
        team4 = new Team("woowacourse4", "테스트 모임입니다.", "testEmoji", "#123456", false);
        teamRepository.save(team1);
        teamRepository.save(team2);
        teamRepository.save(team3);
        teamRepository.save(team4);
        em.flush();
        em.clear();
    }

    @Test
    @DisplayName("중복된 코드를 저장시 예외가 발생한다.")
    void saveDuplicate() {
        final InviteCode inviteCode1 = InviteCode.createdBy(team1, () -> "duplicate");
        final InviteCode inviteCode2 = InviteCode.createdBy(team2, () -> "duplicate");

        inviteCodeRepository.save(inviteCode1);

        assertThatThrownBy(() -> inviteCodeRepository.save(inviteCode2))
                .isInstanceOf(DataIntegrityViolationException.class);
    }

    @Test
    @DisplayName("만료된 초대코드 데이터를 삭제한다.")
    void deleteExpired() {
        final InviteCode inviteCode1 = new InviteCode(null, "abc", LocalDateTime.now().minusHours(1), team1);
        final InviteCode inviteCode2 = new InviteCode(null, "def", LocalDateTime.now().minusHours(1), team2);
        final InviteCode inviteCode3 = new InviteCode(null, "ghi", LocalDateTime.now().plusHours(1), team3);
        final InviteCode inviteCode4 = new InviteCode(null, "jkl", LocalDateTime.now().plusHours(1), team4);
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