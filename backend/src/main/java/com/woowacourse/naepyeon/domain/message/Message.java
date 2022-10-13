package com.woowacourse.naepyeon.domain.message;

import com.woowacourse.naepyeon.domain.BaseEntity;
import com.woowacourse.naepyeon.domain.Member;
import com.woowacourse.naepyeon.domain.rollingpaper.Recipient;
import com.woowacourse.naepyeon.domain.rollingpaper.Rollingpaper;
import com.woowacourse.naepyeon.exception.ExceedMessageContentLengthException;
import com.woowacourse.naepyeon.exception.InvalidSecretMessageToTeam;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Table(name = "message", indexes = {
        @Index(name = "message_rollingpaper_index", columnList = "rollingpaper_id")
})
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Message extends BaseEntity {

    public static final int MAX_CONTENT_LENGTH = 500;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "message_id")
    private Long id;

    @Column(name = "content", length = 500, nullable = false)
    private String content;

    @Column(name = "color")
    private String color;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member author;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "rollingpaper_id", nullable = false)
    private Rollingpaper rollingpaper;

    @Column(name = "anonymous", nullable = false)
    private boolean anonymous;

    @Column(name = "secret", nullable = false)
    private boolean secret;

    @Column(name = "likes", nullable = false)
    private Long likes;

    public Message(final String content, final String color, final Member author, final Rollingpaper rollingpaper,
                   final boolean anonymous, final boolean secret, final Long likes) {
        validateContentLength(content);
        validateCanSecret(rollingpaper, secret);
        this.content = content;
        this.color = color;
        this.author = author;
        this.rollingpaper = rollingpaper;
        this.anonymous = anonymous;
        this.secret = secret;
        this.likes = likes;
    }

    public Message(final String content, final String color, final Member author, final Rollingpaper rollingpaper,
                   final boolean anonymous, final boolean secret) {
        this(content, color, author, rollingpaper, anonymous, secret, 0L);
    }

    private void validateCanSecret(final Rollingpaper rollingpaper, final boolean secret) {
        if (rollingpaper.checkSameRecipient(Recipient.TEAM) && secret) {
            throw new InvalidSecretMessageToTeam(rollingpaper.getId());
        }
    }

    public void changeContent(final String newContent) {
        validateContentLength(newContent);
        this.content = newContent;
    }

    public void changeColor(final String newColor) {
        this.color = newColor;
    }

    public void changeAnonymous(final boolean anonymous) {
        this.anonymous = anonymous;
    }

    public void changeSecret(final boolean secret) {
        this.secret = secret;
    }

    private void validateContentLength(final String content) {
        if (content.length() > MAX_CONTENT_LENGTH) {
            throw new ExceedMessageContentLengthException(content);
        }
    }

    public boolean isAuthor(final Long memberId) {
        return this.author.isSameMember(memberId);
    }

    public void like() {
        likes = likes + 1;
    }

    public void cancelLike() {
        likes = likes - 1;
    }
}
