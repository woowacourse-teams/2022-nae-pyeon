package com.woowacourse.naepyeon.controller.dto;

import lombok.Getter;

@Getter
public class TeamRequest {

    private String name;

    public TeamRequest() {
    }

    public TeamRequest(String name) {
        this.name = name;
    }
}
