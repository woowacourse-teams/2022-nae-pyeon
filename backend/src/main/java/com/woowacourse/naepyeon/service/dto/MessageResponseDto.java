package com.woowacourse.naepyeon.service.dto;

import com.woowacourse.naepyeon.domain.Message;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class MessageResponseDto {

    private Long id;
    private String content;
    private String from;
    private Long authorId;
    private String color;
    private boolean anonymous;
    private boolean secret;

    public static MessageResponseDto of(final Message message, final String nickname, final Long authorId) {
        return new MessageResponseDto(
                message.getId(),
                message.getContent(),
                nickname,
                authorId,
                message.getColor(),
                message.isAnonymous(),
                message.isSecret()
        );
    }
}
