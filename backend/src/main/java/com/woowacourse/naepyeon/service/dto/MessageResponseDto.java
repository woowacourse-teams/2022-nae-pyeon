package com.woowacourse.naepyeon.service.dto;

import com.woowacourse.naepyeon.domain.message.Message;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@ToString
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
    private Long likes;
    private boolean liked;

    public static MessageResponseDto of(final Message message, final String nickname, final Long authorId,
                                        final boolean visible, final boolean editable, final Long likes,
                                        final boolean liked) {
        return new MessageResponseDto(
                message.getId(),
                message.getContent(),
                nickname,
                authorId,
                message.getColor(),
                message.isAnonymous(),
                message.isSecret(),
                visible,
                editable,
                likes,
                liked
        );
    }

    public static MessageResponseDto of(final Message message, final String content, final String nickname,
                                        final Long authorId, final boolean visible, final boolean editable,
                                        final Long likes, final boolean liked) {
        return new MessageResponseDto(
                message.getId(),
                content,
                nickname,
                authorId,
                message.getColor(),
                message.isAnonymous(),
                message.isSecret(),
                visible,
                editable,
                likes,
                liked
        );
    }
}
