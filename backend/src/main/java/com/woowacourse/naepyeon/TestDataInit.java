package com.woowacourse.naepyeon;

import com.woowacourse.naepyeon.domain.Member;
import com.woowacourse.naepyeon.domain.Team;
import com.woowacourse.naepyeon.domain.TeamMember;
import com.woowacourse.naepyeon.repository.jpa.MemberJpaDao;
import com.woowacourse.naepyeon.repository.jpa.TeamJpaDao;
import com.woowacourse.naepyeon.repository.jpa.TeamMemberJpaDao;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional
public class TestDataInit {

    private final MemberJpaDao memberJpaDao;
    private final TeamJpaDao teamJpaDao;
    private final TeamMemberJpaDao teamMemberJpaDao;

    @EventListener(ApplicationReadyEvent.class)
    public void initData() {
        final Team dummyTeam = new Team("mypyeon");
        final Member dummyMember1 =
                new Member("kth990303", "kth990303@gmail.com", "abc@@1234");
        final Member dummyMember2 =
                new Member("yxxnghwan", "yxxnghwan@gmail.com", "abc@@1234");
        memberJpaDao.save(dummyMember1);
        memberJpaDao.save(dummyMember2);
        teamJpaDao.save(dummyTeam);

        teamMemberJpaDao.save(new TeamMember(dummyTeam, dummyMember1));
        teamMemberJpaDao.save(new TeamMember(dummyTeam, dummyMember2));
    }
}
