package com.woowacourse.naepyeon.controller.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
public class CreateMemberRollingpaperRequest {

    @NotBlank(message = "1002:롤링페이퍼 제목은 공백일 수 없습니다.")
    private String title;

    private Long addresseeId;
}
