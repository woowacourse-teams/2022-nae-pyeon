package com.woowacourse.naepyeon.controller;

import com.woowacourse.naepyeon.controller.dto.CreateResponse;
import com.woowacourse.naepyeon.controller.dto.TeamRequest;
import com.woowacourse.naepyeon.service.TeamService;
import java.net.URI;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/teams")
public class TeamController {

    private final TeamService teamService;

    @PostMapping
    public ResponseEntity<CreateResponse> createTeam(@RequestBody @Valid final TeamRequest teamRequest) {
        final Long teamId = teamService.save(teamRequest);
        return ResponseEntity.created(URI.create("/api/v1/teams/" + teamId)).body(new CreateResponse(teamId));
    }

    @PutMapping("/{teamId}")
    public ResponseEntity<Void> updateTeam(@PathVariable final Long teamId,
                                           @RequestBody @Valid final TeamRequest teamRequest) {
        teamService.updateName(teamId, teamRequest.getName());
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{teamId}")
    public ResponseEntity<Void> deleteTeam(@PathVariable final Long teamId) {
        teamService.delete(teamId);
        return ResponseEntity.noContent().build();
    }
}
