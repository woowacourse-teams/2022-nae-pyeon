package com.woowacourse.naepyeon.controller.dto;

import javax.validation.constraints.NotBlank;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
public class InviteJoinRequest {

    @NotBlank(message = "4015:올바르지 않은 토큰입니다.")
    private String inviteToken;

    @NotBlank(message = "4009:닉네임은 공백일 수 없습니다.")
    private String nickname;
}
