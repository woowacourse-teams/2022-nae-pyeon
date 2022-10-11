package com.woowacourse.naepyeon.repository;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import com.woowacourse.naepyeon.config.JpaAuditingConfig;
import com.woowacourse.naepyeon.config.QueryDslConfig;
import com.woowacourse.naepyeon.domain.Member;
import com.woowacourse.naepyeon.domain.Platform;
import com.woowacourse.naepyeon.domain.Team;
import com.woowacourse.naepyeon.domain.TeamParticipation;
import com.woowacourse.naepyeon.domain.rollingpaper.Recipient;
import com.woowacourse.naepyeon.domain.rollingpaper.Rollingpaper;
import com.woowacourse.naepyeon.repository.member.MemberRepository;
import com.woowacourse.naepyeon.repository.rollingpaper.RollingpaperRepository;
import com.woowacourse.naepyeon.repository.team.TeamRepository;
import com.woowacourse.naepyeon.repository.teamparticipation.TeamParticipationRepository;
import java.time.LocalDateTime;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.context.annotation.Import;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

@DataJpaTest
@Import({JpaAuditingConfig.class, QueryDslConfig.class})
class RollingpaperRepositoryTest {

    private static final String rollingPaperTitle = "AlexAndKei";

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private RollingpaperRepository rollingpaperRepository;

    @Autowired
    private TestEntityManager em;

    @Autowired
    private TeamParticipationRepository teamParticipationRepository;

    private final Team team = new Team(
            "nae-pyeon",
            "테스트 모임입니다.",
            "testEmoji",
            "#123456",
            false
    );
    private final Member member = new Member("member", "m@hello.com", Platform.KAKAO, "1");
    private TeamParticipation teamParticipation1;

    @BeforeEach
    void setUp() {
        teamRepository.save(team);
        memberRepository.save(member);
        teamParticipation1 = new TeamParticipation(team, member, "케이");
        teamParticipationRepository.save(teamParticipation1);
    }

    @Test
    @DisplayName("롤링페이퍼를 저장하고 id값으로 찾는다.")
    void saveAndFind() {
        final Rollingpaper rollingPaper = createRollingPaper();
        final Long rollingPaperId = rollingpaperRepository.save(rollingPaper)
                .getId();

        final Rollingpaper findRollingPaper = rollingpaperRepository.findById(rollingPaperId)
                .orElseThrow();
        final Team findRollingPaperTeam = findRollingPaper.getTeam();
        final Member findRollingPaperMember = findRollingPaper.getAddressee();

        assertAll(
                () -> assertThat(findRollingPaper)
                        .extracting("id", "title")
                        .containsExactly(rollingPaperId, rollingPaperTitle),
                () -> assertThat(findRollingPaperTeam.getId()).isEqualTo(this.team.getId()),
                () -> assertThat(findRollingPaperMember.getId()).isEqualTo(this.member.getId())
        );
    }

    @Test
    @DisplayName("롤링페이퍼들을 teamId로 찾는다.")
    void findByTeamId() {
        final Rollingpaper rollingPaper1 = createRollingPaper();
        final Rollingpaper rollingPaper2 = createRollingPaper();
        rollingpaperRepository.save(rollingPaper1);
        rollingpaperRepository.save(rollingPaper2);

        final List<Rollingpaper> rollingpapers = rollingpaperRepository.findByTeamId(team.getId());

        assertThat(rollingpapers).hasSize(2);
    }

    @Test
    @DisplayName("롤링페이퍼들을 memberId와 PageRequest로 찾는다.")
    void findByMemberIdAndPageRequest() {
        final Rollingpaper rollingPaper1 = createRollingPaper();
        final Rollingpaper rollingPaper2 = createRollingPaper();
        final Rollingpaper rollingPaper3 = createRollingPaper();
        final Rollingpaper rollingPaper4 = createRollingPaper();
        final Rollingpaper rollingPaper5 = createRollingPaper();
        final Rollingpaper rollingPaper6 = createRollingPaper();
        final Rollingpaper rollingPaper7 = createRollingPaper();
        rollingpaperRepository.save(rollingPaper1);
        rollingpaperRepository.save(rollingPaper2);
        rollingpaperRepository.save(rollingPaper3);
        rollingpaperRepository.save(rollingPaper4);
        rollingpaperRepository.save(rollingPaper5);
        rollingpaperRepository.save(rollingPaper6);
        rollingpaperRepository.save(rollingPaper7);

        final Page<Rollingpaper> actual = rollingpaperRepository.findByAddresseeId(member.getId(),
                PageRequest.of(1, 3));

        assertAll(
                () -> assertThat(actual).contains(rollingPaper4, rollingPaper5, rollingPaper6),
                () -> assertThat(actual).doesNotContain(rollingPaper1, rollingPaper2, rollingPaper3, rollingPaper7)
        );
    }

    @Test
    @DisplayName("개인 롤링페이퍼 수신인의 닉네임을 찾는다.")
    void findAddresseeNicknameByRollingpaperId() {
        final Member author = new Member("author", "a@hello.com", Platform.KAKAO, "2");
        memberRepository.save(author);
        final TeamParticipation teamParticipation2 = new TeamParticipation(team, author, "다른닉네임");
        teamParticipationRepository.save(teamParticipation2);

        final Rollingpaper rollingPaper1 =
                new Rollingpaper(rollingPaperTitle, Recipient.MEMBER, team, member, teamParticipation1);
        final Rollingpaper rollingPaper2 =
                new Rollingpaper(rollingPaperTitle, Recipient.MEMBER, team, author, teamParticipation2);
        final Rollingpaper rollingPaper3 =
                new Rollingpaper(rollingPaperTitle, Recipient.TEAM, team, null, null);
        rollingpaperRepository.save(rollingPaper1);
        rollingpaperRepository.save(rollingPaper2);
        rollingpaperRepository.save(rollingPaper3);

        assertAll(
                () -> assertThat(
                        rollingpaperRepository.findAddresseeNicknameByMemberRollingpaperId(rollingPaper1.getId())
                                .orElse(team.getName())
                ).isEqualTo("케이"),
                () -> assertThat(
                        rollingpaperRepository.findAddresseeNicknameByMemberRollingpaperId(rollingPaper2.getId())
                                .orElse(team.getName())
                ).isEqualTo("다른닉네임"),
                // 팀 롤링페이퍼인데 해당 메서드를 사용할 경우 optional.empty() 반환
                // 이렇게 이 메서드를 서비스에서 잘못 호출할 수도 있을 듯하다.
                // 이 경우에는 모임 롤링페이퍼 대상 닉네임이라도 보이도록 team.getName() 반환하도록 해주자
                () -> assertThat(
                        rollingpaperRepository.findAddresseeNicknameByMemberRollingpaperId(rollingPaper3.getId())
                                .orElse(team.getName())
                ).isEqualTo("nae-pyeon")
        );
    }

    @Test
    @DisplayName("롤링페이퍼를 id값을 통해 삭제한다.")
    void delete() {
        final Rollingpaper rollingPaper = createRollingPaper();
        final Long rollingPaperId = rollingpaperRepository.save(rollingPaper)
                .getId();

        rollingpaperRepository.deleteById(rollingPaperId);

        assertThat(rollingpaperRepository.findById(rollingPaperId))
                .isEmpty();
    }

    @Test
    @DisplayName("롤링페이퍼를 생성할 때 생성일자가 올바르게 나온다.")
    void createMemberWhen() {
        final Rollingpaper message = createRollingPaper();
        final Long rollingpaperId = rollingpaperRepository.save(message)
                .getId();

        final Rollingpaper actual = rollingpaperRepository.findById(rollingpaperId)
                .orElseThrow();
        assertThat(actual.getCreatedDate()).isAfter(LocalDateTime.MIN);
    }

    @Test
    @DisplayName("롤링페이퍼를 수정할 때 수정일자가 올바르게 나온다.")
    void updateMemberWhen() {
        final Rollingpaper rollingpaper = createRollingPaper();
        final Long rollingpaperId = rollingpaperRepository.save(rollingpaper)
                .getId();

        rollingpaper.changeTitle("updateupdate");
        em.flush();

        final Rollingpaper actual = rollingpaperRepository.findById(rollingpaperId)
                .orElseThrow();
        assertThat(actual.getLastModifiedDate()).isAfter(actual.getCreatedDate());
    }

    private Rollingpaper createRollingPaper() {
        return new Rollingpaper(rollingPaperTitle, Recipient.MEMBER, team, member);
    }
}
