package com.woowacourse.naepyeon.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.woowacourse.naepyeon.controller.dto.TeamRequest;
import com.woowacourse.naepyeon.exception.NotFoundRollingpaperException;
import com.woowacourse.naepyeon.exception.NotFoundTeamMemberException;
import com.woowacourse.naepyeon.exception.UncertificationTeamMemberException;
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
    private static final String MEMBER_NICKNAME = "마스터";

    private final TeamRequest teamRequest =
            new TeamRequest("nae-pyeon", "테스트 모임입니다.", "testEmoji", "#123456", MEMBER_NICKNAME);
    private Long teamId;
    private Long memberId;
    private Long member2Id;
    private Long member3Id;

    @Autowired
    private MemberService memberService;
    @Autowired
    private TeamService teamService;
    @Autowired
    private RollingpaperService rollingpaperService;

    @BeforeEach
    void setUp() {
        memberId = memberService.save("member", "m@hello.com", "abc@@1234");
        member2Id = memberService.save("writer", "w@hello.com", "abc@@1234");
        member3Id = memberService.save("anonymous", "a@hello.com", "abc@@1234");
        teamId = teamService.save(teamRequest, memberId);
        teamService.joinMember(teamId, member2Id, "안뇽안뇽");
    }

    @Test
    @DisplayName("롤링페이퍼를 저장하고 id값으로 찾는다.")
    void saveRollingpaperAndFind() {
        final Long rollingpaperId =
                rollingpaperService.createRollingpaper(rollingPaperTitle, teamId, member2Id, memberId);

        final RollingpaperResponseDto rollingpaperResponse =
                rollingpaperService.findById(rollingpaperId, teamId, memberId);

        assertThat(rollingpaperResponse)
                .extracting("title", "to", "messages")
                .containsExactly(rollingPaperTitle, MEMBER_NICKNAME, List.of());
    }

    @Test
    @DisplayName("모임에 속하지 않은 회원이 롤링페이퍼를 저장할 때 예외를 발생시킨다.")
    void saveRollingpaperWithAnonymous() {
        assertThatThrownBy(() -> rollingpaperService.createRollingpaper(rollingPaperTitle, teamId, member3Id, memberId))
                .isInstanceOf(UncertificationTeamMemberException.class);
    }

    @Test
    @DisplayName("롤링페이퍼를 모임에 속하지 않은 회원에게 작성할 때 예외를 발생시킨다.")
    void saveRollingpaperToAnonymous() {
        assertThatThrownBy(() -> rollingpaperService.createRollingpaper(rollingPaperTitle, teamId, memberId, member3Id))
                .isInstanceOf(NotFoundTeamMemberException.class);
    }

    @Test
    @DisplayName("모임에 속하지 않은 회원이 id값으로 롤링페이퍼를 찾을 때 예외를 발생시킨다.")
    void saveRollingpaperAndFindWithAnonymous() {
        final Long rollingpaperId =
                rollingpaperService.createRollingpaper(rollingPaperTitle, teamId, member2Id, memberId);

        final RollingpaperResponseDto rollingpaperResponse =
                rollingpaperService.findById(rollingpaperId, teamId, memberId);

        assertThat(rollingpaperResponse).extracting("title", "to", "messages")
                .containsExactly(rollingPaperTitle, MEMBER_NICKNAME, List.of());
    }

    @Test
    @DisplayName("롤링페이퍼들을 teamId로 찾는다.")
    void findRollingpapersByTeamId() {
        // given
        final Long rollingpaperId1 =
                rollingpaperService.createRollingpaper(rollingPaperTitle, teamId, member2Id, memberId);
        final Long rollingpaperId2 =
                rollingpaperService.createRollingpaper(rollingPaperTitle, teamId, member2Id, memberId);
        final List<RollingpaperPreviewResponseDto> expected = convertPreviewDto(rollingpaperId1, rollingpaperId2);

        // when
        final RollingpapersResponseDto responseDto = rollingpaperService.findByTeamId(teamId, memberId);
        final List<RollingpaperPreviewResponseDto> rollingpaperPreviewResponseDtos = responseDto.getRollingpapers();

        // then
        assertThat(rollingpaperPreviewResponseDtos)
                .usingRecursiveComparison()
                .isEqualTo(expected);
    }

    @Test
    @DisplayName("모임에 속하지 않은 회원이 teamId값으로 롤링페이퍼를 찾을 때 예외를 발생시킨다.")
    void saveRollingpaperAndFindByTeamIdWithAnonymous() {
        rollingpaperService.createRollingpaper(rollingPaperTitle, teamId, member2Id, memberId);

        assertThatThrownBy(() -> rollingpaperService.findByTeamId(teamId, member3Id))
                .isInstanceOf(UncertificationTeamMemberException.class);
    }

    @Test
    @DisplayName("롤링페이퍼들을 memberId로 찾는다.")
    void findRollingpapersByMemberId() {
        // given
        final Long rollingpaperId1 =
                rollingpaperService.createRollingpaper(rollingPaperTitle, teamId, member2Id, memberId);
        final Long rollingpaperId2 =
                rollingpaperService.createRollingpaper(rollingPaperTitle, teamId, member2Id, memberId);
        final List<RollingpaperPreviewResponseDto> expected = convertPreviewDto(rollingpaperId1, rollingpaperId2);

        // when
        final RollingpapersResponseDto responseDto = rollingpaperService.findByMemberId(teamId, memberId);
        final List<RollingpaperPreviewResponseDto> rollingpaperPreviewResponseDtos = responseDto.getRollingpapers();

        // then
        assertThat(rollingpaperPreviewResponseDtos)
                .usingRecursiveComparison()
                .isEqualTo(expected);
    }

    private List<RollingpaperPreviewResponseDto> convertPreviewDto(final Long rollingpaperId1,
                                                                   final Long rollingpaperId2) {
        final RollingpaperResponseDto rollingpaperResponseDto1 =
                rollingpaperService.findById(rollingpaperId1, teamId, memberId);
        final RollingpaperResponseDto rollingpaperResponseDto2 =
                rollingpaperService.findById(rollingpaperId2, teamId, memberId);
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
                rollingpaperService.createRollingpaper(rollingPaperTitle, teamId, member2Id, memberId);
        final String expected = "woowacourse";

        rollingpaperService.updateTitle(rollingpaperId, expected, teamId, memberId);

        final RollingpaperResponseDto rollingpaperResponse =
                rollingpaperService.findById(rollingpaperId, teamId, memberId);
        assertThat(rollingpaperResponse.getTitle()).isEqualTo(expected);
    }

    @Test
    @DisplayName("모임에 속하지 않은 회원이 롤링페이퍼 타이틀을 수정할 경우 예외를 발생시킨다.")
    void updateRollingpaperTitleWithAnonymous() {
        final Long rollingpaperId =
                rollingpaperService.createRollingpaper(rollingPaperTitle, teamId, member2Id, memberId);

        assertThatThrownBy(() -> rollingpaperService.updateTitle(rollingpaperId, "내맘대로수정할래", teamId, member3Id))
                .isInstanceOf(UncertificationTeamMemberException.class);
    }

    @Test
    @DisplayName("롤링페이퍼를 id로 제거한다.")
    void deleteRollingpaper() {
        final Long rollingpaperId =
                rollingpaperService.createRollingpaper(rollingPaperTitle, teamId, member2Id, memberId);

        rollingpaperService.deleteRollingpaper(rollingpaperId, teamId, memberId);

        assertThatThrownBy(() -> rollingpaperService.findById(rollingpaperId, teamId, memberId))
                .isInstanceOf(NotFoundRollingpaperException.class);
    }

    @Test
    @DisplayName("모임에 속하지 않은 회원이 롤링페이퍼를 삭제할 경우 예외를 발생시킨다.")
    void deleteRollingpaperWithAnonymous() {
        final Long rollingpaperId =
                rollingpaperService.createRollingpaper(rollingPaperTitle, teamId, member2Id, memberId);

        assertThatThrownBy(() -> rollingpaperService.deleteRollingpaper(rollingpaperId, teamId, member3Id))
                .isInstanceOf(UncertificationTeamMemberException.class);
    }
}