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

    @NotBlank(message = "[1002] 롤링페이퍼 제목은 공백일 수 없습니다.")
    private String title;

    private Long memberId;
}
