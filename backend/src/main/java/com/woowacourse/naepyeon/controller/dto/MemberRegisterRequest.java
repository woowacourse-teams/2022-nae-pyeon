package com.woowacourse.naepyeon.controller.dto;

import javax.validation.constraints.NotBlank;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
public class MemberRegisterRequest {

    @NotBlank(message = "[3004] 유저네임은 공백일 수 없습니다.")
    private String username;

    @NotBlank(message = "[3001] 이메일은 공백일 수 없습니다.")
    private String email;

    @NotBlank(message = "[3007] 비밀번호는 공백일 수 없습니다.")
    private String password;
}
