package com.woowacourse.naepyeon.service.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
@ToString
public class TeamRequestDto {

    private String name;
    private String description;
    private String emoji;
    private String color;
    private String nickname;
    private boolean secret;
}
