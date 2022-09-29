package com.woowacourse.naepyeon.config.invitecode;

import com.woowacourse.naepyeon.repository.invitecode.InviteCodeRepository;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@EnableAsync
@RequiredArgsConstructor
public class DeleteExpiredInviteCodeTask {

    private final InviteCodeRepository inviteCodeRepository;

    @Async
    @Transactional
    public void deleteExpiredInviteCodes() {
        inviteCodeRepository.deleteExpired(LocalDateTime.now());
    }
}
