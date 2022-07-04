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

    public static Member dummyMember1;
    public static Member dummyMember2;
    public static Team dummyTeam;
    private final MemberJpaDao memberJpaDao;
    private final TeamJpaDao teamJpaDao;
    private final TeamMemberJpaDao teamMemberJpaDao;

    @EventListener(ApplicationReadyEvent.class)
    public void initData() {
        final Team team = new Team("mypyeon");
        final Member member1 =
                new Member("kth990303", "kth990303@gmail.com", "abc@@1234");
        final Member member2 =
                new Member("yxxnghwan", "yxxnghwan@gmail.com", "abc@@1234");
        dummyMember1 = memberJpaDao.save(member1);
        dummyMember2 = memberJpaDao.save(member2);
        dummyTeam = teamJpaDao.save(team);

        teamMemberJpaDao.save(new TeamMember(dummyTeam, dummyMember1));
        teamMemberJpaDao.save(new TeamMember(dummyTeam, dummyMember2));
    }
}
