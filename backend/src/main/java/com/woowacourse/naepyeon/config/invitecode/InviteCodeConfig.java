package com.woowacourse.naepyeon.config.invitecode;

import com.woowacourse.naepyeon.service.TeamService;
import java.util.concurrent.TimeUnit;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

@EnableScheduling
@Configuration
@RequiredArgsConstructor
public class InviteCodeConfig {

    private final TeamService teamService;

    @Scheduled(timeUnit = TimeUnit.HOURS, initialDelay = 0, fixedDelay = 12)
    public void scheduleDeleteExpiredInviteCode() {
        teamService.deleteExpiredInviteCodes();
    }
}
