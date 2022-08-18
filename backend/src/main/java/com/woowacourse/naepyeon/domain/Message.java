package com.woowacourse.naepyeon.domain;

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
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Table(name = "message")
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

    public Message(final String content, final String color, final Member author, final Rollingpaper rollingpaper,
                   final boolean anonymous, final boolean secret) {
        validateContentLength(content);
        validateCanSecret(rollingpaper, secret);
        this.content = content;
        this.color = color;
        this.author = author;
        this.rollingpaper = rollingpaper;
        this.anonymous = anonymous;
        this.secret = secret;

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
}
