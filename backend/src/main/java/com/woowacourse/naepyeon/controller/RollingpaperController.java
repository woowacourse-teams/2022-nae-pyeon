package com.woowacourse.naepyeon.controller;

import com.woowacourse.naepyeon.controller.auth.AuthenticationPrincipal;
import com.woowacourse.naepyeon.controller.dto.CreateResponse;
import com.woowacourse.naepyeon.controller.dto.LoginMemberRequest;
import com.woowacourse.naepyeon.controller.dto.RollingpaperCreateRequest;
import com.woowacourse.naepyeon.controller.dto.RollingpaperUpdateRequest;
import com.woowacourse.naepyeon.service.RollingpaperService;
import com.woowacourse.naepyeon.service.dto.RollingpaperResponseDto;
import com.woowacourse.naepyeon.service.dto.RollingpapersResponseDto;
import java.net.URI;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/teams/{teamId}/rollingpapers")
public class RollingpaperController {

    private final RollingpaperService rollingpaperService;

    @PostMapping
    public ResponseEntity<CreateResponse> createRollingpaper(
            @AuthenticationPrincipal @Valid final LoginMemberRequest loginMemberRequest,
            @PathVariable final Long teamId,
            @RequestBody @Valid final RollingpaperCreateRequest rollingpaperCreateRequest) {
        final Long rollingpaperId = rollingpaperService.createRollingpaper(rollingpaperCreateRequest.getTitle(), teamId,
                loginMemberRequest.getId(), rollingpaperCreateRequest.getAddresseeId());
        return ResponseEntity.created(URI.create("/api/v1/teams/" + teamId + "/rollingpapers/" + rollingpaperId))
                .body(new CreateResponse(rollingpaperId));
    }

    @GetMapping("/{rollingpaperId}")
    public ResponseEntity<RollingpaperResponseDto> findRollingpaperById(
            @AuthenticationPrincipal @Valid final LoginMemberRequest loginMemberRequest,
            @PathVariable final Long teamId, @PathVariable final Long rollingpaperId) {
        final RollingpaperResponseDto rollingpaperResponseDto =
                rollingpaperService.findById(rollingpaperId, teamId, loginMemberRequest.getId());
        return ResponseEntity.ok(rollingpaperResponseDto);
    }

    @GetMapping
    public ResponseEntity<RollingpapersResponseDto> findRollingpapersByTeamId(
            @AuthenticationPrincipal @Valid final LoginMemberRequest loginMemberRequest,
            @PathVariable final Long teamId) {
        final RollingpapersResponseDto rollingpapersResponseDto = rollingpaperService.findByTeamId(teamId,
                loginMemberRequest.getId());
        return ResponseEntity.ok(rollingpapersResponseDto);
    }

    @GetMapping("/me")
    public ResponseEntity<RollingpapersResponseDto> findRollingpapersByMemberId(
            @AuthenticationPrincipal @Valid final LoginMemberRequest loginMemberRequest,
            @PathVariable final Long teamId) {
        final RollingpapersResponseDto rollingpapersResponseDto =
                rollingpaperService.findByMemberId(teamId, loginMemberRequest.getId());
        return ResponseEntity.ok(rollingpapersResponseDto);
    }

    @PutMapping("/{rollingpaperId}")
    public ResponseEntity<Void> updateRollingpaper(
            @AuthenticationPrincipal @Valid final LoginMemberRequest loginMemberRequest,
            @PathVariable final Long teamId,
            @PathVariable final Long rollingpaperId,
            @RequestBody final RollingpaperUpdateRequest updateRequest) {
        rollingpaperService.updateTitle(rollingpaperId, updateRequest.getTitle(), teamId, loginMemberRequest.getId());
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{rollingpaperId}")
    public ResponseEntity<Void> deleteRollingpaper(
            @AuthenticationPrincipal @Valid final LoginMemberRequest loginMemberRequest,
            @PathVariable final Long teamId,
            @PathVariable final Long rollingpaperId) {
        rollingpaperService.deleteRollingpaper(rollingpaperId, teamId, loginMemberRequest.getId());
        return ResponseEntity.noContent().build();
    }
}
