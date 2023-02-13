package com.woowacourse.naepyeon.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.woowacourse.naepyeon.domain.rollingpaper.Recipient;
import com.woowacourse.naepyeon.domain.rollingpaper.Rollingpaper;
import com.woowacourse.naepyeon.exception.NotFoundRollingpaperException;
import com.woowacourse.naepyeon.exception.NotFoundTeamMemberException;
import com.woowacourse.naepyeon.exception.UncertificationTeamMemberException;
import com.woowacourse.naepyeon.service.dto.ReceivedRollingpaperResponseDto;
import com.woowacourse.naepyeon.service.dto.ReceivedRollingpapersResponseDto;
import com.woowacourse.naepyeon.service.dto.RollingpaperPreviewResponseDto;
import com.woowacourse.naepyeon.service.dto.RollingpaperResponseDto;
import com.woowacourse.naepyeon.service.dto.RollingpapersResponseDto;
import com.woowacourse.naepyeon.service.dto.TeamRequestDto;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class RollingpaperServiceTest extends ServiceTest {

    private static final String ROLLINGPAPER_TITLE = "AlexAndKei";
    private static final String MEMBER_NICKNAME = "마스터";
    private static final String TEAM_NAME = "nae-pyeon";

    private final TeamRequestDto teamRequestDto =
            new TeamRequestDto("nae-pyeon", "테스트 모임입니다.", "testEmoji", "#123456", MEMBER_NICKNAME, true);
    private Long teamId;
    private Long memberId;
    private Long member2Id;
    private Long member3Id;

    @BeforeEach
    void setUp() {
        memberId = memberService.save("member", "m@hello.com", "KAKAO", "1");
        member2Id = memberService.save("writer", "w@hello.com", "KAKAO", "2");
        member3Id = memberService.save("anonymous", "a@hello.com", "KAKAO", "3");
        teamId = teamService.save(teamRequestDto, memberId);
        teamService.joinMember(teamId, member2Id, "안뇽안뇽");
    }

    @Test
    @DisplayName("멤버 대상 롤링페이퍼를 저장하고 id값으로 찾는다.")
    void saveMemberRollingpaperAndFind() {
        final Long rollingpaperId =
                rollingpaperService.createMemberRollingpaper(ROLLINGPAPER_TITLE, teamId, member2Id, memberId);

        final RollingpaperResponseDto rollingpaperResponse =
                rollingpaperService.findById(rollingpaperId, teamId, memberId);

        assertThat(rollingpaperResponse)
                .extracting("title", "to", "messages")
                .containsExactly(ROLLINGPAPER_TITLE, MEMBER_NICKNAME, List.of());
    }

    @Test
    @DisplayName("팀 대상 롤링페이퍼를 저장하고 id값으로 찾는다.")
    void saveTeamRollingpaperAndFind() {
        final Long rollingpaperId =
                rollingpaperService.createTeamRollingpaper(ROLLINGPAPER_TITLE, teamId, member2Id);

        final RollingpaperResponseDto rollingpaperResponse =
                rollingpaperService.findById(rollingpaperId, teamId, memberId);

        assertThat(rollingpaperResponse)
                .extracting("title", "to", "messages")
                .containsExactly(ROLLINGPAPER_TITLE, TEAM_NAME, List.of());
    }

    @Test
    @DisplayName("모임에 속하지 않은 회원이 롤링페이퍼를 저장할 때 예외를 발생시킨다.")
    void saveRollingpaperWithAnonymous() {
        assertThatThrownBy(
                () -> rollingpaperService.createMemberRollingpaper(ROLLINGPAPER_TITLE, teamId, member3Id, memberId))
                .isInstanceOf(UncertificationTeamMemberException.class);
    }

    @Test
    @DisplayName("롤링페이퍼를 모임에 속하지 않은 회원에게 작성할 때 예외를 발생시킨다.")
    void saveRollingpaperToAnonymous() {
        assertThatThrownBy(
                () -> rollingpaperService.createMemberRollingpaper(ROLLINGPAPER_TITLE, teamId, memberId, member3Id))
                .isInstanceOf(NotFoundTeamMemberException.class);
    }

    @Test
    @DisplayName("모임에 속하지 않은 회원이 모임 롤링페이퍼를 생성할 때 예외를 발생시킨다.")
    void saveTeamRollingpaperWithAnonymous() {
        assertThatThrownBy(() -> rollingpaperService.createTeamRollingpaper(ROLLINGPAPER_TITLE, teamId, member3Id))
                .isInstanceOf(UncertificationTeamMemberException.class);
    }

    @Test
    @DisplayName("모임에 속하지 않은 회원이 id값으로 롤링페이퍼를 찾을 때 예외를 발생시킨다.")
    void saveRollingpaperAndFindWithAnonymous() {
        final Long rollingpaperId =
                rollingpaperService.createMemberRollingpaper(ROLLINGPAPER_TITLE, teamId, member2Id, memberId);

        assertThatThrownBy(() -> rollingpaperService.findById(rollingpaperId, teamId, member3Id))
                .isInstanceOf(UncertificationTeamMemberException.class);
    }

    @Test
    @DisplayName("롤링페이퍼들을 teamId로 찾는다.")
    void findRollingpapersByTeamId() {
        // given
        final Long rollingpaperId1 =
                rollingpaperService.createMemberRollingpaper(ROLLINGPAPER_TITLE, teamId, member2Id, memberId);
        final Long rollingpaperId2 =
                rollingpaperService.createTeamRollingpaper(ROLLINGPAPER_TITLE, teamId, member2Id);
        final List<RollingpaperPreviewResponseDto> expected = convertPreviewDto(rollingpaperId2, rollingpaperId1);

        // when
        final RollingpapersResponseDto responseDto = rollingpaperService.findByTeamId(teamId, memberId, "", null);
        final List<RollingpaperPreviewResponseDto> rollingpaperPreviewResponseDtos = responseDto.getRollingpapers();

        // then
        assertThat(rollingpaperPreviewResponseDtos)
                .usingRecursiveComparison()
                .isEqualTo(expected);
    }

    @Test
    @DisplayName("롤링페이퍼들을 오래된 순으로 teamId로 찾는다.")
    void findRollingpapersByTeamIdOldestOrder() {
        // given
        final Long rollingpaperId1 =
                rollingpaperService.createMemberRollingpaper(ROLLINGPAPER_TITLE, teamId, member2Id, memberId);
        final Long rollingpaperId2 =
                rollingpaperService.createTeamRollingpaper(ROLLINGPAPER_TITLE, teamId, member2Id);
        final List<RollingpaperPreviewResponseDto> expected = convertPreviewDto(rollingpaperId1, rollingpaperId2);

        // when
        final RollingpapersResponseDto responseDto = rollingpaperService.findByTeamId(teamId, memberId, "oldest", null);
        final List<RollingpaperPreviewResponseDto> rollingpaperPreviewResponseDtos = responseDto.getRollingpapers();

        // then
        assertThat(rollingpaperPreviewResponseDtos)
                .usingRecursiveComparison()
                .isEqualTo(expected);
    }

    @Test
    @DisplayName("멤버 대상 롤링페이퍼들을 teamId로 찾는다.")
    void findMemberRollingpapersByTeamId() {
        // given
        final Long rollingpaperId =
                rollingpaperService.createMemberRollingpaper(ROLLINGPAPER_TITLE, teamId, member2Id, memberId);
        rollingpaperService.createTeamRollingpaper(ROLLINGPAPER_TITLE, teamId, member2Id);
        final List<RollingpaperPreviewResponseDto> expected = List.of(
                RollingpaperPreviewResponseDto.createPreviewRollingpaper(
                        rollingpaperRepository.findById(rollingpaperId).orElseThrow(),
                        MEMBER_NICKNAME
                ));

        // when
        final RollingpapersResponseDto responseDto =
                rollingpaperService.findByTeamId(teamId, memberId, "oldest", "member");
        final List<RollingpaperPreviewResponseDto> rollingpaperPreviewResponseDtos = responseDto.getRollingpapers();

        // then
        assertThat(rollingpaperPreviewResponseDtos)
                .usingRecursiveComparison()
                .isEqualTo(expected);
    }

    @Test
    @DisplayName("모임 대상 롤링페이퍼들을 teamId로 찾는다.")
    void findTeamRollingpapersByTeamId() {
        // given
        rollingpaperService.createMemberRollingpaper(ROLLINGPAPER_TITLE, teamId, member2Id, memberId);
        final Long rollingpaperId = rollingpaperService.createTeamRollingpaper(ROLLINGPAPER_TITLE, teamId, member2Id);
        final List<RollingpaperPreviewResponseDto> expected = List.of(
                RollingpaperPreviewResponseDto.createPreviewRollingpaper(
                        rollingpaperRepository.findById(rollingpaperId).orElseThrow(),
                        "nae-pyeon"
                ));

        // when
        final RollingpapersResponseDto responseDto =
                rollingpaperService.findByTeamId(teamId, memberId, "oldest", "team");
        final List<RollingpaperPreviewResponseDto> rollingpaperPreviewResponseDtos = responseDto.getRollingpapers();

        // then
        assertThat(rollingpaperPreviewResponseDtos)
                .usingRecursiveComparison()
                .isEqualTo(expected);
    }

    @Test
    @DisplayName("필터링 값이 의도치 않을 경우 모든 롤링페이퍼를 teamId로 찾는다.")
    void findRollingpapersByTeamIdAndStrangeFilterValue() {
        // given
        final Long rollingpaperId1 =
                rollingpaperService.createMemberRollingpaper(ROLLINGPAPER_TITLE, teamId, member2Id, memberId);
        final Long rollingpaperId2 =
                rollingpaperService.createTeamRollingpaper(ROLLINGPAPER_TITLE, teamId, member2Id);
        final List<RollingpaperPreviewResponseDto> expected = convertPreviewDto(rollingpaperId1, rollingpaperId2);

        // when
        final RollingpapersResponseDto responseDto =
                rollingpaperService.findByTeamId(teamId, memberId, "oldest", "invalidFilter");
        final List<RollingpaperPreviewResponseDto> rollingpaperPreviewResponseDtos = responseDto.getRollingpapers();

        // then
        assertThat(rollingpaperPreviewResponseDtos)
                .usingRecursiveComparison()
                .isEqualTo(expected);
    }

    private List<RollingpaperPreviewResponseDto> convertPreviewDto(final Long rollingpaperId1,
                                                                   final Long rollingpaperId2) {
        final Rollingpaper rollingpaper1 = rollingpaperRepository.findById(rollingpaperId1).orElseThrow();
        final Rollingpaper rollingpaper2 = rollingpaperRepository.findById(rollingpaperId2).orElseThrow();
        return List.of(
                RollingpaperPreviewResponseDto.createPreviewRollingpaper(
                        rollingpaper1,
                        rollingpaper1.checkSameRecipient(Recipient.MEMBER)
                                ? MEMBER_NICKNAME
                                : rollingpaper1.getTeamName()
                ),
                RollingpaperPreviewResponseDto.createPreviewRollingpaper(
                        rollingpaper2,
                        rollingpaper2.checkSameRecipient(Recipient.MEMBER)
                                ? MEMBER_NICKNAME
                                : rollingpaper2.getTeamName()
                )
        );
    }

    @Test
    @DisplayName("모임에 속하지 않은 회원이 teamId값으로 롤링페이퍼를 찾을 때 예외를 발생시킨다.")
    void saveRollingpaperAndFindByTeamIdWithAnonymous() {
        rollingpaperService.createMemberRollingpaper(ROLLINGPAPER_TITLE, teamId, member2Id, memberId);

        assertThatThrownBy(() -> rollingpaperService.findByTeamId(teamId, member3Id, "oldest", ""))
                .isInstanceOf(UncertificationTeamMemberException.class);
    }

    @Test
    @DisplayName("내가 받은 롤링페이퍼 목록을 조회한다.")
    void findReceivedRollingpapers() {
        // given
        final Long rollingpaperId1 =
                rollingpaperService.createMemberRollingpaper(ROLLINGPAPER_TITLE, teamId, member2Id, memberId);
        final Long rollingpaperId2 =
                rollingpaperService.createMemberRollingpaper(ROLLINGPAPER_TITLE, teamId, member2Id, memberId);

        // when
        final ReceivedRollingpapersResponseDto receivedRollingpapersResponseDto =
                rollingpaperService.findReceivedRollingpapers(memberId, 0, 2);
        final List<ReceivedRollingpaperResponseDto> actual = receivedRollingpapersResponseDto.getRollingpapers();
        final List<ReceivedRollingpaperResponseDto> expected = List.of(
                new ReceivedRollingpaperResponseDto(rollingpaperId2, ROLLINGPAPER_TITLE, teamId,
                        teamRequestDto.getName()),
                new ReceivedRollingpaperResponseDto(rollingpaperId1, ROLLINGPAPER_TITLE, teamId,
                        teamRequestDto.getName())
        );

        // then
        assertThat(actual)
                .usingRecursiveComparison()
                .isEqualTo(expected);
    }

    @Test
    @DisplayName("롤링페이퍼 타이틀을 수정한다.")
    void updateTitle() {
        final Long rollingpaperId =
                rollingpaperService.createMemberRollingpaper(ROLLINGPAPER_TITLE, teamId, member2Id, memberId);
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
                rollingpaperService.createMemberRollingpaper(ROLLINGPAPER_TITLE, teamId, member2Id, memberId);

        assertThatThrownBy(() -> rollingpaperService.updateTitle(rollingpaperId, "내맘대로수정할래", teamId, member3Id))
                .isInstanceOf(UncertificationTeamMemberException.class);
    }

    @Test
    @DisplayName("롤링페이퍼를 id로 제거한다.")
    void deleteRollingpaper() {
        final Long rollingpaperId =
                rollingpaperService.createMemberRollingpaper(ROLLINGPAPER_TITLE, teamId, member2Id, memberId);

        rollingpaperService.deleteRollingpaper(rollingpaperId, teamId, memberId);

        assertThatThrownBy(() -> rollingpaperService.findById(rollingpaperId, teamId, memberId))
                .isInstanceOf(NotFoundRollingpaperException.class);
    }

    @Test
    @DisplayName("모임에 속하지 않은 회원이 롤링페이퍼를 삭제할 경우 예외를 발생시킨다.")
    void deleteRollingpaperWithAnonymous() {
        final Long rollingpaperId =
                rollingpaperService.createMemberRollingpaper(ROLLINGPAPER_TITLE, teamId, member2Id, memberId);

        assertThatThrownBy(() -> rollingpaperService.deleteRollingpaper(rollingpaperId, teamId, member3Id))
                .isInstanceOf(UncertificationTeamMemberException.class);
    }
}
