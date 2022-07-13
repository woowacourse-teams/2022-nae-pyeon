package com.woowacourse.naepyeon.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.woowacourse.naepyeon.domain.Member;
import com.woowacourse.naepyeon.domain.Team;
import com.woowacourse.naepyeon.exception.NotFoundRollingpaperException;
import com.woowacourse.naepyeon.repository.jpa.MemberJpaDao;
import com.woowacourse.naepyeon.repository.jpa.TeamJpaDao;
import com.woowacourse.naepyeon.service.dto.RollingpaperPreviewResponseDto;
import com.woowacourse.naepyeon.service.dto.RollingpaperResponseDto;
import com.woowacourse.naepyeon.service.dto.RollingpapersResponseDto;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
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
                rollingpaperService.createRollingpaper(rollingPaperTitle, team.getId(), member.getId());

        final RollingpaperResponseDto rollingpaperResponse = rollingpaperService.findById(rollingpaperId);

        assertThat(rollingpaperResponse).extracting("title", "to", "messages")
                .containsExactly(rollingPaperTitle, member.getUsername(), List.of());
    }

    @Test
    @DisplayName("롤링페이퍼들을 teamId로 찾는다.")
    void findRollingpapersByTeamId() {
        // given
        final Long rollingpaperId1 =
                rollingpaperService.createRollingpaper(rollingPaperTitle, team.getId(), member.getId());
        final Long rollingpaperId2 =
                rollingpaperService.createRollingpaper(rollingPaperTitle, team.getId(), member.getId());
        final List<RollingpaperPreviewResponseDto> expected = convertPreviewDto(rollingpaperId1, rollingpaperId2);

        // when
        final RollingpapersResponseDto responseDto = rollingpaperService.findByTeamId(team.getId());
        final List<RollingpaperPreviewResponseDto> rollingpaperPreviewResponseDtos = responseDto.getRollingpapers();

        // then
        assertThat(rollingpaperPreviewResponseDtos)
                .usingRecursiveComparison()
                .isEqualTo(expected);
    }

    private List<RollingpaperPreviewResponseDto> convertPreviewDto(final Long rollingpaperId1,
                                                                   final Long rollingpaperId2) {
        final RollingpaperResponseDto rollingpaperResponseDto1 = rollingpaperService.findById(rollingpaperId1);
        final RollingpaperResponseDto rollingpaperResponseDto2 = rollingpaperService.findById(rollingpaperId2);
        return List.of(
                new RollingpaperPreviewResponseDto(rollingpaperResponseDto1.getId(),
                        rollingpaperResponseDto1.getTitle(), rollingpaperResponseDto1.getTo()),
                new RollingpaperPreviewResponseDto(rollingpaperResponseDto2.getId(),
                        rollingpaperResponseDto2.getTitle(), rollingpaperResponseDto2.getTo())
        );
    }

    @Test
    @DisplayName("롤링페이퍼 타이틀을 수정한다.")
    void updateTitle() {
        final Long rollingpaperId =
                rollingpaperService.createRollingpaper(rollingPaperTitle, team.getId(), member.getId());
        final String expected = "woowacourse";

        rollingpaperService.updateTitle(rollingpaperId, expected);

        final RollingpaperResponseDto rollingpaperResponse = rollingpaperService.findById(rollingpaperId);
        assertThat(rollingpaperResponse.getTitle()).isEqualTo(expected);
    }

    @Test
    @DisplayName("롤링페이를 id로 제거한다.")
    void deleteRollingpaper() {
        final Long rollingpaperId =
                rollingpaperService.createRollingpaper(rollingPaperTitle, team.getId(), member.getId());

        rollingpaperService.deleteRollingpaper(rollingpaperId);

        assertThatThrownBy(() -> rollingpaperService.findById(rollingpaperId))
                .isInstanceOf(NotFoundRollingpaperException.class);
    }
}