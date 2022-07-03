package com.woowacourse.naepyeon.domain;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
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

    @Id
    @GeneratedValue
    @Column(name = "message_id")
    private Long id;

    @Column(length = 500, nullable = false)
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member author;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    @JoinColumn(name = "rollingpaper_id")
    private Rollingpaper rollingpaper;

    public Message(final String content, final Member author, final Rollingpaper rollingpaper) {
        this.content = content;
        this.author = author;
        this.rollingpaper = rollingpaper;
    }

    public void changeContent(final String newContent) {
        this.content = newContent;
    }
}
