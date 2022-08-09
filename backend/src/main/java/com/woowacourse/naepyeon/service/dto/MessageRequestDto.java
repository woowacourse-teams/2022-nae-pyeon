package com.woowacourse.naepyeon.service.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
public class MessageRequestDto {

    private String content;

    private String color;

    private boolean anonymous;

    private boolean secret;

    public static MessageRequestDto of(final String content, final String color) {
        return new MessageRequestDto(content, color, false, false);
    }
}
