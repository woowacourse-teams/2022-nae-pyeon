package com.woowacourse.naepyeon.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;

import com.woowacourse.naepyeon.domain.Member;
import com.woowacourse.naepyeon.domain.Team;
import com.woowacourse.naepyeon.domain.TeamMember;
import com.woowacourse.naepyeon.repository.MemberRepository;
import com.woowacourse.naepyeon.repository.TeamMemberRepository;
import com.woowacourse.naepyeon.repository.TeamRepository;
import com.woowacourse.naepyeon.service.dto.TeamResponseDto;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Transactional
class TeamServiceTest {

    @Autowired
    private TeamService teamService;

    private final Member member = new Member("내편이", "naePyeon@test.com", "testtest");
    private final Team team = new Team("wooteco");
    @Autowired
    private TeamRepository teamRepository;
    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private TeamMemberRepository teamMemberRepository;

    @BeforeEach
    void setUp() {
        teamRepository.save(team);
        memberRepository.save(member);
    }

    @Test
    @DisplayName("모임을 id값으로 찾는다.")
    void findById() {
        // given
        final Long teamId = teamService.save("woowacourse");

        // when
        final TeamResponseDto findTeam = teamService.findById(teamId);

        // then
        assertThat(findTeam)
                .extracting("id", "name")
                .containsExactly(teamId, "woowacourse");
    }

    @Test
    @DisplayName("모임의 이름을 수정한다.")
    void update() {
        // given
        final Long teamId = teamService.save("woowacourse-4th");

        // when
        teamService.updateName(teamId, "woowacourse-5th");

        // then
        assertThat(teamService.findById(teamId))
                .extracting("id", "name")
                .containsExactly(teamId, "woowacourse-5th");
    }

    @Test
    @DisplayName("모임을 id으로 제거한다.")
    void delete() {
        // given
        final Long teamId = teamService.save("woowacourse-4th");

        // when
        teamService.delete(teamId);

        // then
        assertThatThrownBy(() -> teamService.findById(teamId))
                .isInstanceOf(IllegalArgumentException.class);
    }

    @Test
    @DisplayName("회원을 모임에 가입시킨다.")
    void joinMember() {
        final Long joinedId = teamService.joinMember(team.getId(), member.getId());
        final TeamMember findTeamMember = teamMemberRepository.findById(joinedId)
                .orElseThrow();

        assertAll(
                () -> assertThat(findTeamMember.getMember().getId()).isEqualTo(member.getId()),
                () -> assertThat(findTeamMember.getTeam().getId()).isEqualTo(team.getId())
        );
    }
}