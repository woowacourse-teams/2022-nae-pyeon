package com.woowacourse.naepyeon.controller.dto;

import com.woowacourse.naepyeon.service.dto.MessageUpdateRequestDto;
import javax.validation.constraints.NotBlank;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
public class MessageUpdateRequest {

    @NotBlank(message = "2001:메시지는 공백일 수 없습니다.")
    private String content;

    private String color;

    private boolean anonymous;

    private boolean secret;

    public MessageUpdateRequestDto toServiceDto() {
        return new MessageUpdateRequestDto(content, color, anonymous, secret);
    }
}
