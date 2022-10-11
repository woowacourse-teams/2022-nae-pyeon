package com.woowacourse.naepyeon.config.batch;

import com.woowacourse.naepyeon.service.AuthService;
import com.woowacourse.naepyeon.service.TeamService;
import java.util.concurrent.TimeUnit;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

@EnableScheduling
@Configuration
@RequiredArgsConstructor
public class BatchTaskConfig {

    private final TeamService teamService;
    private final AuthService authService;

    @Scheduled(timeUnit = TimeUnit.HOURS, initialDelay = 0, fixedDelay = 12)
    public void scheduleDeleteExpiredInviteCode() {
        teamService.deleteExpiredInviteCodes();
    }

    @Scheduled(timeUnit = TimeUnit.HOURS, initialDelay = 0, fixedDelay = 12)
    public void scheduleDeleteExpiredRefreshToken() {
        authService.deleteExpiredRefreshTokens();
    }
}
