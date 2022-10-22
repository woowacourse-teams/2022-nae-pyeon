package com.woowacourse.naepyeon.controller.dto;

import com.woowacourse.naepyeon.service.dto.MessageRequestDto;
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
public class MessageRequest {

    @NotBlank(message = "2001:메시지는 공백일 수 없습니다.")
    private String content;

    private String color;

    private boolean anonymous;

    private boolean secret;

    public MessageRequestDto toServiceDto() {
        return new MessageRequestDto(content, color, anonymous, secret);
    }
}
