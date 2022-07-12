package com.woowacourse.naepyeon.controller;

import static com.woowacourse.naepyeon.TestDataInit.dummyMember2;
import static com.woowacourse.naepyeon.TestDataInit.dummyTeam;

import com.woowacourse.naepyeon.controller.dto.CreateResponse;
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
            @PathVariable final Long teamId,
            @RequestBody @Valid final RollingpaperCreateRequest rollingpaperCreateRequest) {
//        final Long rollingpaperId = rollingpaperService.createRollingpaper(rollingpaperCreateRequest.getTitle(), teamId,
//                rollingpaperCreateRequest.getMemberId());
//        return ResponseEntity.created(URI.create("/api/v1/teams/" + teamId + "/rollingpapers/" + rollingpaperId))
//                .build();
        final Long rollingpaperId = rollingpaperService.createRollingpaper(rollingpaperCreateRequest.getTitle(),
                dummyTeam.getId(),
                dummyMember2.getId());
        return ResponseEntity.created(
                        URI.create("/api/v1/teams/" + dummyTeam.getId() + "/rollingpapers/" + rollingpaperId))
                .body(new CreateResponse(rollingpaperId));
    }

    @GetMapping("/{rollingpaperId}")
    public ResponseEntity<RollingpaperResponseDto> findRollingpaper(@PathVariable final Long teamId,
                                                                    @PathVariable final Long rollingpaperId) {
        final RollingpaperResponseDto rollingpaper = rollingpaperService.findById(rollingpaperId);
        return ResponseEntity.ok(rollingpaper);
    }

    @GetMapping
    public ResponseEntity<RollingpapersResponseDto> findRollingpapers(@PathVariable final Long teamId) {
//        final RollingpapersResponseDto rollingpapersResponseDto = rollingpaperService.findByTeamId(teamId);
        final RollingpapersResponseDto rollingpapersResponseDto = rollingpaperService.findByTeamId(dummyTeam.getId());
        return ResponseEntity.ok(rollingpapersResponseDto);
    }

    @PutMapping("/{rollingpaperId}")
    public ResponseEntity<Void> updateRollingpaper(@PathVariable final Long rollingpaperId,
                                                   @RequestBody final RollingpaperUpdateRequest updateRequest) {
        rollingpaperService.updateTitle(rollingpaperId, updateRequest.getTitle());
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{rollingpaperId}")
    public ResponseEntity<Void> deleteRollingpaper(@PathVariable final Long rollingpaperId) {
        rollingpaperService.deleteRollingpaper(rollingpaperId);
        return ResponseEntity.noContent().build();
    }
}
