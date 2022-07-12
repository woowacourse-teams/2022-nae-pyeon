package com.woowacourse.naepyeon.controller.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
public class RollingpaperCreateRequest {

    @NotBlank(message = "내용을 입력해주세요.")
    private String title;

    @Positive
    private Long memberId;
}
