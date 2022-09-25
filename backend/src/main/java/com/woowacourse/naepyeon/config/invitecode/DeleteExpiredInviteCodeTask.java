package com.woowacourse.naepyeon.config.invitecode;

import com.woowacourse.naepyeon.repository.invitecode.InviteCodeRepository;
import java.time.LocalDateTime;
import java.util.concurrent.TimeUnit;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@EnableAsync
@RequiredArgsConstructor
public class DeleteExpiredInviteCodeTask {

    private final InviteCodeRepository inviteCodeRepository;

    @Async
    @Scheduled(timeUnit = TimeUnit.HOURS, initialDelay = 0, fixedDelay = 12)
    @Transactional
    public void scheduleDeleteExpiredInviteCode() {
        inviteCodeRepository.deleteExpired(LocalDateTime.now());
    }
}
