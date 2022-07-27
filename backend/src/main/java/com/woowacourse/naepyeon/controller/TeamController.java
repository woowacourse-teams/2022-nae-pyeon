package com.woowacourse.naepyeon.controller;

import com.woowacourse.naepyeon.controller.auth.AuthenticationPrincipal;
import com.woowacourse.naepyeon.controller.dto.CreateResponse;
import com.woowacourse.naepyeon.controller.dto.JoinTeamMemberRequest;
import com.woowacourse.naepyeon.controller.dto.LoginMemberRequest;
import com.woowacourse.naepyeon.controller.dto.PageSizeRequest;
import com.woowacourse.naepyeon.controller.dto.TeamRequest;
import com.woowacourse.naepyeon.controller.dto.UpdateTeamParticipantRequest;
import com.woowacourse.naepyeon.exception.UncertificationTeamMemberException;
import com.woowacourse.naepyeon.service.TeamService;
import com.woowacourse.naepyeon.service.dto.JoinedMembersResponseDto;
import com.woowacourse.naepyeon.service.dto.TeamMemberResponseDto;
import com.woowacourse.naepyeon.service.dto.TeamResponseDto;
import com.woowacourse.naepyeon.service.dto.TeamsResponseDto;
import java.net.URI;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/teams")
public class TeamController {

    private final TeamService teamService;

    @GetMapping("/{teamId}")
    public ResponseEntity<TeamResponseDto> getTeam(
            @AuthenticationPrincipal @Valid final LoginMemberRequest loginMemberRequest,
            @PathVariable final Long teamId) {
        return ResponseEntity.ok(teamService.findById(teamId, loginMemberRequest.getId()));
    }

    @GetMapping("/me")
    public ResponseEntity<TeamsResponseDto> getJoinedTeams(
            @AuthenticationPrincipal @Valid final LoginMemberRequest loginMemberRequest) {
        return ResponseEntity.ok(teamService.findByJoinedMemberId(loginMemberRequest.getId()));
    }

    @GetMapping
    public ResponseEntity<TeamsResponseDto> getAllTeams(
            @AuthenticationPrincipal @Valid final LoginMemberRequest loginMemberRequest,
            @RequestParam("keyword") final String keyword, @RequestParam("page") final Integer page,
            @RequestBody final PageSizeRequest pageSizeRequest) {
        final PageRequest pageRequest = PageRequest.of(page, pageSizeRequest.getSize());
        return ResponseEntity.ok(
                teamService.findTeamsByContainingTeamName(keyword, loginMemberRequest.getId(), pageRequest)
        );
    }

    @GetMapping("/{teamId}/members")
    public ResponseEntity<JoinedMembersResponseDto> getJoinedMembers(
            @AuthenticationPrincipal @Valid final LoginMemberRequest loginMemberRequest,
            @PathVariable final Long teamId) {
        if (!teamService.isJoinedMember(loginMemberRequest.getId(), teamId)) {
            throw new UncertificationTeamMemberException(teamId, loginMemberRequest.getId());
        }
        return ResponseEntity.ok(teamService.findJoinedMembers(teamId));
    }


    @PostMapping
    public ResponseEntity<CreateResponse> createTeam(
            @AuthenticationPrincipal @Valid final LoginMemberRequest loginMemberRequest,
            @RequestBody @Valid final TeamRequest teamRequest) {
        final Long teamId = teamService.save(teamRequest, loginMemberRequest.getId());
        return ResponseEntity.created(URI.create("/api/v1/teams/" + teamId)).body(new CreateResponse(teamId));
    }

    @PutMapping("/{teamId}")
    public ResponseEntity<Void> updateTeam(@AuthenticationPrincipal @Valid final LoginMemberRequest loginMemberRequest,
                                           @PathVariable final Long teamId,
                                           @RequestBody @Valid final TeamRequest teamRequest) {
        if (!teamService.isJoinedMember(loginMemberRequest.getId(), teamId)) {
            throw new UncertificationTeamMemberException(teamId, loginMemberRequest.getId());
        }
        teamService.updateName(teamId, teamRequest.getName());
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{teamId}")
    public ResponseEntity<Void> deleteTeam(@AuthenticationPrincipal @Valid final LoginMemberRequest loginMemberRequest,
                                           @PathVariable final Long teamId) {
        if (!teamService.isJoinedMember(loginMemberRequest.getId(), teamId)) {
            throw new UncertificationTeamMemberException(teamId, loginMemberRequest.getId());
        }
        teamService.delete(teamId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{teamId}")
    public ResponseEntity<Void> joinMember(@AuthenticationPrincipal @Valid final LoginMemberRequest loginMemberRequest,
                                           @PathVariable final Long teamId,
                                           @RequestBody final JoinTeamMemberRequest joinTeamMemberRequest) {
        teamService.joinMember(teamId, loginMemberRequest.getId(), joinTeamMemberRequest.getNickname());
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{teamId}/me")
    public ResponseEntity<TeamMemberResponseDto> getMyInfoInTeam(
            @AuthenticationPrincipal @Valid final LoginMemberRequest loginMemberRequest,
            @PathVariable final Long teamId) {
        final TeamMemberResponseDto responseDto = teamService.findMyInfoInTeam(teamId, loginMemberRequest.getId());
        return ResponseEntity.ok(responseDto);
    }

    @PutMapping("/{teamId}/me")
    public ResponseEntity<Void> updateMyInfo(
            @AuthenticationPrincipal @Valid final LoginMemberRequest loginMemberRequest,
            @PathVariable final Long teamId,
            @RequestBody final UpdateTeamParticipantRequest updateTeamParticipantRequest) {
        teamService.updateMyInfo(teamId, loginMemberRequest.getId(), updateTeamParticipantRequest.getNickname());
        return ResponseEntity.noContent().build();
    }
}
