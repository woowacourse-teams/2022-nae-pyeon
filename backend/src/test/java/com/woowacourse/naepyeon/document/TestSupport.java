package com.woowacourse.naepyeon.document;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.woowacourse.naepyeon.config.DatabaseCleaner;
import com.woowacourse.naepyeon.config.logging.RequestBodyWrappingFilter;
import com.woowacourse.naepyeon.repository.team.TeamRepository;
import com.woowacourse.naepyeon.service.MemberService;
import com.woowacourse.naepyeon.service.MessageService;
import com.woowacourse.naepyeon.service.RollingpaperService;
import com.woowacourse.naepyeon.service.TeamService;
import com.woowacourse.naepyeon.service.dto.MessageRequestDto;
import com.woowacourse.naepyeon.service.dto.TeamRequestDto;
import com.woowacourse.naepyeon.support.JwtTokenProvider;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.restdocs.RestDocumentationContextProvider;
import org.springframework.restdocs.RestDocumentationExtension;
import org.springframework.restdocs.mockmvc.MockMvcRestDocumentation;
import org.springframework.restdocs.mockmvc.RestDocumentationResultHandler;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ExtendWith(RestDocumentationExtension.class)
@Import(RestDocsConfiguration.class)
@AutoConfigureTestDatabase
@Transactional
public abstract class TestSupport {

    @Autowired
    protected RestDocumentationResultHandler restDocs;

    @Autowired
    protected ObjectMapper objectMapper;

    @Autowired
    protected JwtTokenProvider jwtTokenProvider;

    @Autowired
    protected MemberService memberService;

    @Autowired
    protected TeamService teamService;

    @Autowired
    protected RollingpaperService rollingpaperService;

    @Autowired
    protected MessageService messageService;

    @Autowired
    private DatabaseCleaner databaseCleaner;

    @Autowired
    protected TeamRepository teamRepository;

    protected MockMvc mockMvc;
    protected String accessToken;
    protected String joinedMemberAccessToken;
    protected String notJoinedMemberAccessToken;
    protected Long memberId1;
    protected Long memberId2;
    protected Long memberId3;
    protected Long teamId;
    protected Long rollingpaperId1;
    protected Long rollingpaperId2;
    protected Long messageId;

    @BeforeEach
    void setUp(
            final WebApplicationContext context,
            final RestDocumentationContextProvider provider
    ) {
        databaseCleaner.execute();
        this.mockMvc = MockMvcBuilders.webAppContextSetup(context)
                .apply(MockMvcRestDocumentation.documentationConfiguration(provider))
                .addFilters(new RequestBodyWrappingFilter())
                .alwaysDo(restDocs)
                .build();
        saveBaseData();
        accessToken = jwtTokenProvider.createToken(String.valueOf(memberId1));
        joinedMemberAccessToken = jwtTokenProvider.createToken(String.valueOf(memberId2));
        notJoinedMemberAccessToken = jwtTokenProvider.createToken(String.valueOf(memberId3));
    }

    private void saveBaseData() {
        memberId1 = memberService.save("홍길동", "email1@email.com", "KAKAO", "1");
        memberId2 = memberService.save("이순신", "email2@email.com", "KAKAO", "2");
        memberId3 = memberService.save("아이유", "email3@email.com", "KAKAO", "3");

        teamId = teamService.save(
                new TeamRequestDto("우테코 4기", "우테코 4기 크루원들 모임입니다.", "\\uD83D\\uDE00", "#212121", "길동이", false),
                memberId1
        );
        teamService.save(
                new TeamRequestDto("케이의 알고리즘 스터디", "케이와 함께하는 알고리즈 스터디", "\\uD83D\\uDE00", "#212121", "제로", false),
                memberId1
        );
        teamService.save(
                new TeamRequestDto("우테코 5기", "우테코 5기 크루원들 모임입니다.", "\\uD83D\\uDE00", "#212121", "승팡", false),
                memberId1
        );
        teamService.joinMember(teamId, memberId2, "순신이");

        rollingpaperId1 = rollingpaperService.createMemberRollingpaper("이순신 환영해", teamId, memberId1, memberId2);
        rollingpaperId2 = rollingpaperService.createMemberRollingpaper("홍길동 반가워", teamId, memberId2, memberId1);
        rollingpaperService.createMemberRollingpaper("홍길동 생일축하해", teamId, memberId2, memberId1);

        messageId = messageService.saveMessage(
                new MessageRequestDto("생일축하해!", "#123456", false, false), rollingpaperId1, memberId2
        );
        messageService.saveMessage(
                new MessageRequestDto("환영합니다", "#123456", false, false), rollingpaperId1, memberId1
        );
        messageService.saveMessage(
                new MessageRequestDto("감사합니다!", "#123456", false, false), rollingpaperId2, memberId1
        );
        messageService.saveMessage(
                new MessageRequestDto("많은 가르침 받았습니다.", "#123456", false, false), rollingpaperId2, memberId2
        );
        messageService.likeMessage(memberId1, rollingpaperId1, messageId);
    }
}
