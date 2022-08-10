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
    private boolean visible;
    private boolean editable;

    public static MessageResponseDto of(final Message message, final String nickname, final Long authorId,
                                        final boolean visible, final boolean editable) {
        return new MessageResponseDto(
                message.getId(),
                message.getContent(),
                nickname,
                authorId,
                message.getColor(),
                message.isAnonymous(),
                message.isSecret(),
                visible,
                editable
        );
    }

    public static MessageResponseDto of(final Message message, final String content, final String nickname,
                                        final Long authorId, final boolean visible, final boolean editable) {
        return new MessageResponseDto(
                message.getId(),
                content,
                nickname,
                authorId,
                message.getColor(),
                message.isAnonymous(),
                message.isSecret(),
                visible,
                editable
        );
    }
}
