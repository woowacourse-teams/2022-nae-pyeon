package com.woowacourse.naepyeon.controller;

import com.woowacourse.naepyeon.controller.dto.TeamRequest;
import com.woowacourse.naepyeon.service.TeamService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/teams")
public class TeamController {

    private final TeamService teamService;

    @PostMapping
    public ResponseEntity<Void> createMember(@RequestBody @Valid TeamRequest teamRequest) {
        Long teamId = teamService.save(teamRequest.getName());
        return ResponseEntity.created(URI.create("/api/v1/teams/" + teamId)).build();
    }

    @PutMapping("/{teamId}")
    public ResponseEntity<Void> updateMember(@PathVariable Long teamId, @RequestBody @Valid TeamRequest teamRequest) {
        teamService.updateName(teamId, teamRequest.getName());
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{teamId}")
    public ResponseEntity<Void> deleteMember(@PathVariable Long teamId) {
        teamService.delete(teamId);
        return ResponseEntity.noContent().build();
    }
}
