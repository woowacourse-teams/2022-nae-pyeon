package com.woowacourse.naepyeon.service.dto;

import com.woowacourse.naepyeon.domain.Team;
import lombok.Getter;

@Getter
public class TeamResponse {

    private Long id;
    private String name;

    public TeamResponse() {
    }

    public TeamResponse(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public TeamResponse(Team team) {
        this.id = team.getId();
        this.name = team.getName();
    }
}
