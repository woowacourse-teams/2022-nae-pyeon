package com.woowacourse.naepyeon.domain;

import com.woowacourse.naepyeon.exception.ExceedMessageContentLengthException;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Message {

    public static final int MAX_CONTENT_LENGTH = 500;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "message_id")
    private Long id;

    @Column(length = 500, nullable = false)
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member author;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "rollingpaper_id")
    private Rollingpaper rollingpaper;

    public Message(final String content, final Member author, final Rollingpaper rollingpaper) {
        validateContentLength(content);
        this.content = content;
        this.author = author;
        this.rollingpaper = rollingpaper;
    }

    public void changeContent(final String newContent) {
        validateContentLength(newContent);
        this.content = newContent;
    }

    private void validateContentLength(final String content) {
        if (content.length() > MAX_CONTENT_LENGTH) {
            throw new ExceedMessageContentLengthException(content);
        }
    }
}
