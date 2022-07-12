package com.woowacourse.naepyeon.controller.dto;

import javax.validation.constraints.NotBlank;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
public class MemberUpdateRequest {

    @NotBlank(message = "이름을 입력해주세요.")
    private String username;
}
