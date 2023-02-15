package com.woowacourse.naepyeon.service;

import com.woowacourse.naepyeon.config.batch.BatchTaskConfig;
import com.woowacourse.naepyeon.repository.invitecode.InviteCodeRepository;
import com.woowacourse.naepyeon.repository.member.MemberRepository;
import com.woowacourse.naepyeon.repository.messagelike.MessageLikeRepository;
import com.woowacourse.naepyeon.repository.refreshtoken.RefreshTokenRepository;
import com.woowacourse.naepyeon.repository.rollingpaper.RollingpaperRepository;
import com.woowacourse.naepyeon.repository.team.TeamRepository;
import com.woowacourse.naepyeon.repository.teamparticipation.TeamParticipationRepository;
import com.woowacourse.naepyeon.support.JwtTokenProvider;
import com.woowacourse.naepyeon.support.oauth.google.GooglePlatformUserProvider;
import com.woowacourse.naepyeon.support.oauth.kakao.KakaoPlatformUserProvider;
import javax.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest(webEnvironment = WebEnvironment.NONE)
@Transactional
public abstract class ServiceTest {

    @MockBean
    protected KakaoPlatformUserProvider kakaoPlatformUserProvider;
    @MockBean
    protected GooglePlatformUserProvider googlePlatformUserProvider;

    @Autowired
    protected MemberRepository memberRepository;

    @Autowired
    protected JwtTokenProvider jwtTokenProvider;

    @Autowired
    protected MemberService memberService;

    @Autowired
    protected RefreshTokenRepository refreshTokenRepository;

    @Autowired
    protected MessageService messageService;

    @Autowired
    protected TeamRepository teamRepository;

    @Autowired
    protected RollingpaperRepository rollingpaperRepository;
    @Autowired
    protected TeamParticipationRepository teamParticipationRepository;

    @Autowired
    protected MessageLikeRepository messageLikeRepository;

    @Autowired
    protected TeamService teamService;
    @Autowired
    protected RollingpaperService rollingpaperService;

    @Autowired
    protected InviteCodeRepository inviteCodeRepository;

    @Autowired
    protected EntityManager em;

    @MockBean
    protected BatchTaskConfig batchTaskConfig;
}
