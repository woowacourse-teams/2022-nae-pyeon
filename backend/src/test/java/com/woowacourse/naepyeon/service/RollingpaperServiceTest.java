package com.woowacourse.naepyeon.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.woowacourse.naepyeon.domain.Member;
import com.woowacourse.naepyeon.domain.Team;
import com.woowacourse.naepyeon.repository.jpa.MemberJpaDao;
import com.woowacourse.naepyeon.repository.jpa.TeamJpaDao;
import com.woowacourse.naepyeon.service.dto.RollingpaperResponse;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
class RollingpaperServiceTest {

    private static final String rollingPaperTitle = "AlexAndKei";

    private final Team team = new Team("nae-pyeon");
    private final Member member = new Member("member", "m@hello", "abc@@1234");

    @Autowired
    private TeamJpaDao teamJpaDao;
    @Autowired
    private MemberJpaDao memberJpaDao;
    @Autowired
    private RollingpaperService rollingpaperService;

    @BeforeEach
    void setUp() {
        teamJpaDao.save(team);
        memberJpaDao.save(member);
    }

    @Test
    @DisplayName("롤링페이퍼를 저장하고 id값으로 찾는다.")
    void saveRollingpaperAndFind() {
        final Long rollingpaperId =
                rollingpaperService.openRollingpaper(rollingPaperTitle, team.getId(), member.getId());

        final RollingpaperResponse rollingpaperResponse = rollingpaperService.findById(rollingpaperId);

        assertThat(rollingpaperResponse).extracting("title", "to", "messages")
                .containsExactly(rollingPaperTitle, member.getUsername(), List.of());
    }

    @Test
    @DisplayName("롤링페이퍼 타이틀을 수정한다.")
    void updateTitle() {
        final Long rollingpaperId =
                rollingpaperService.openRollingpaper(rollingPaperTitle, team.getId(), member.getId());
        final String expected = "woowacourse";

        rollingpaperService.updateTitle(rollingpaperId, expected);

        final RollingpaperResponse rollingpaperResponse = rollingpaperService.findById(rollingpaperId);
        assertThat(rollingpaperResponse.getTitle()).isEqualTo(expected);
    }

    @Test
    @DisplayName("롤링페이를 id로 제거한다.")
    void deleteRollingpaper() {
        final Long rollingpaperId =
                rollingpaperService.openRollingpaper(rollingPaperTitle, team.getId(), member.getId());

        rollingpaperService.deleteRollingpaper(rollingpaperId);

        assertThatThrownBy(() -> rollingpaperService.findById(rollingpaperId))
                .isInstanceOf(IllegalArgumentException.class);
    }
}