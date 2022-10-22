package com.woowacourse.naepyeon.controller.dto;

import javax.validation.constraints.NotBlank;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
@ToString
public class JoinTeamMemberRequest {

    @NotBlank(message = "4009:닉네임은 공백일 수 없습니다.")
    private String nickname;
}
