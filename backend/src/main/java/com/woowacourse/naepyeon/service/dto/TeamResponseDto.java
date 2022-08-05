package com.woowacourse.naepyeon.service.dto;

import com.woowacourse.naepyeon.controller.dto.TeamRequest;
import com.woowacourse.naepyeon.domain.Team;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class TeamResponseDto {

    private Long id;
    private String name;
    private String description;
    private String emoji;
    private String color;
    private boolean joined;

    public static TeamResponseDto of(final Team team, final boolean joined) {
        return new TeamResponseDto(
                team.getId(),
                team.getName(),
                team.getDescription(),
                team.getEmoji(),
                team.getColor(),
                joined
        );
    }

    public static TeamResponseDto byRequest(final Long teamId, final TeamRequest teamRequest, final boolean joined) {
        return new TeamResponseDto(
                teamId,
                teamRequest.getName(),
                teamRequest.getDescription(),
                teamRequest.getEmoji(),
                teamRequest.getColor(),
                joined
        );
    }
}
