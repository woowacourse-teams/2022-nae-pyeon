package com.woowacourse.naepyeon.repository;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import com.woowacourse.naepyeon.domain.Member;
import com.woowacourse.naepyeon.domain.Rollingpaper;
import com.woowacourse.naepyeon.domain.Team;
import com.woowacourse.naepyeon.repository.jpa.MemberJpaDao;
import com.woowacourse.naepyeon.repository.jpa.TeamJpaDao;
import java.time.LocalDateTime;
import java.util.List;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Transactional
class RollingpaperRepositoryTest {

    private static final String rollingPaperTitle = "AlexAndKei";

    @Autowired
    private TeamJpaDao teamJpaDao;

    @Autowired
    private MemberJpaDao memberJpaDao;

    @Autowired
    private RollingpaperRepository rollingpaperRepository;

    @Autowired
    private EntityManager em;

    private final Team team = new Team(
            "nae-pyeon",
            "테스트 모임입니다.",
            "testEmoji",
            "#123456"
    );
    private final Member member = new Member("member", "m@hello.com", "abc@@1234");

    @BeforeEach
    void setUp() {
        teamJpaDao.save(team);
        memberJpaDao.save(member);
    }

    @Test
    @DisplayName("롤링페이퍼를 저장하고 id값으로 찾는다.")
    void saveAndFind() {
        final Rollingpaper rollingPaper = createRollingPaper();
        final Long rollingPaperId = rollingpaperRepository.save(rollingPaper);

        final Rollingpaper findRollingPaper = rollingpaperRepository.findById(rollingPaperId)
                .orElseThrow();
        final Team findRollingPaperTeam = findRollingPaper.getTeam();
        final Member findRollingPaperMember = findRollingPaper.getMember();

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
    @DisplayName("롤링페이퍼들을 memberId로 찾는다.")
    void findByMemberId() {
        final Rollingpaper rollingPaper1 = createRollingPaper();
        rollingpaperRepository.save(rollingPaper1);

        final List<Rollingpaper> rollingpapers = rollingpaperRepository.findByMemberId(member.getId());

        assertThat(rollingpapers).hasSize(1);
    }

    @Test
    @DisplayName("롤링페이퍼 타이틀을 변경한다.")
    void update() {
        final Rollingpaper rollingPaper = createRollingPaper();
        final Long rollingPaperId = rollingpaperRepository.save(rollingPaper);
        final String newTitle = "HelloWorld";

        rollingpaperRepository.update(rollingPaperId, newTitle);
        final Rollingpaper updateRollingpaper = rollingpaperRepository.findById(rollingPaperId)
                .orElseThrow();

        assertThat(updateRollingpaper.getTitle()).isEqualTo(newTitle);
    }

    @Test
    @DisplayName("롤링페이퍼를 id값을 통해 삭제한다.")
    void delete() {
        final Rollingpaper rollingPaper = createRollingPaper();
        final Long rollingPaperId = rollingpaperRepository.save(rollingPaper);

        rollingpaperRepository.delete(rollingPaperId);

        assertThat(rollingpaperRepository.findById(rollingPaperId))
                .isEmpty();
    }

    @Test
    @DisplayName("롤링페이퍼를 생성할 때 생성일자가 올바르게 나온다.")
    void createMemberWhen() {
        final Rollingpaper message = createRollingPaper();
        final Long rollingpaperId = rollingpaperRepository.save(message);

        final Rollingpaper actual = rollingpaperRepository.findById(rollingpaperId)
                .orElseThrow();
        assertThat(actual.getCreatedDate()).isAfter(LocalDateTime.MIN);
    }

    @Test
    @DisplayName("롤링페이퍼를 수정할 때 수정일자가 올바르게 나온다.")
    void updateMemberWhen() {
        final Rollingpaper rollingpaper = createRollingPaper();
        final Long rollingpaperId = rollingpaperRepository.save(rollingpaper);

        em.flush();
        rollingpaper.changeTitle("updateupdate");
        em.flush();

        final Rollingpaper actual = rollingpaperRepository.findById(rollingpaperId)
                .orElseThrow();
        assertThat(actual.getLastModifiedDate()).isAfter(actual.getCreatedDate());
    }

    private Rollingpaper createRollingPaper() {
        return new Rollingpaper(rollingPaperTitle, team, member);
    }
}