package com.woowacourse.naepyeon;

import com.woowacourse.naepyeon.domain.Member;
import com.woowacourse.naepyeon.domain.Team;
import com.woowacourse.naepyeon.domain.TeamMember;
import com.woowacourse.naepyeon.repository.MemberRepository;
import com.woowacourse.naepyeon.repository.TeamMemberRepository;
import com.woowacourse.naepyeon.repository.TeamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional
public class TestDataInit {

    private final MemberRepository memberRepository;
    private final TeamRepository teamRepository;
    private final TeamMemberRepository teamMemberRepository;

    @EventListener(ApplicationReadyEvent.class)
    public void initData() {
        final Team dummyTeam = new Team("mypyeon");
        final Member dummyMember1 =
                new Member("kth990303", "kth990303@gmail.com", "abc@@1234");
        final Member dummyMember2 =
                new Member("yxxnghwan", "yxxnghwan@gmail.com", "abc@@1234");
        memberRepository.save(dummyMember1);
        memberRepository.save(dummyMember2);
        teamRepository.save(dummyTeam);

        teamMemberRepository.save(new TeamMember(dummyTeam, dummyMember1));
        teamMemberRepository.save(new TeamMember(dummyTeam, dummyMember2));
    }
}
