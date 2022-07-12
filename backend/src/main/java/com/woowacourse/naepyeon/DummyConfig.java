package com.woowacourse.naepyeon;

import com.woowacourse.naepyeon.repository.jpa.MemberJpaDao;
import com.woowacourse.naepyeon.repository.jpa.TeamJpaDao;
import com.woowacourse.naepyeon.repository.jpa.TeamMemberJpaDao;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Configuration
@RequiredArgsConstructor
public class DummyConfig {

    private final MemberJpaDao memberJpaDao;
    private final TeamJpaDao teamJpaDao;
    private final TeamMemberJpaDao teamMemberJpaDao;

    @Bean
    @Profile("local")
    public TestDataInit testDataInit() {
        return new TestDataInit(memberJpaDao, teamJpaDao, teamMemberJpaDao);
    }
}
