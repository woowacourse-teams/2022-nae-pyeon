package com.woowacourse.naepyeon.controller.dto;

import javax.validation.constraints.NotBlank;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
public class TeamRequest {

    @NotBlank(message = "4001:모임 이름은 공백일 수 없습니다.")
    private String name;

    @NotBlank(message = "4003:모임 설명은 공백일 수 없습니다.")
    private String description;

    @NotBlank(message = "4005:이모지가 선택되지 않았습니다.")
    private String emoji;

    @NotBlank(message = "4006:색상이 선택되지 않았습니다.")
    private String color;
}
