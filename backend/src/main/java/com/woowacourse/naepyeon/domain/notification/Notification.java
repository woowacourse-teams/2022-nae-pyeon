package com.woowacourse.naepyeon.domain.notification;

import com.woowacourse.naepyeon.domain.BaseEntity;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Table(name = "notification", indexes = {
        @Index(name = "notification_read_index", columnList = "is_read")
})
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Notification extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "notification_id")
    private Long id;

    @Column(name = "member_id")
    private Long memberId;

    @Enumerated(EnumType.STRING)
    @Column(name = "content_type")
    private ContentType contentType;

    @Column(name = "team_name")
    private String teamName;

    @Column(name = "rollingpaper_title")
    private String rollingpaperTitle;

    @Column(name = "url")
    private String url;

    @Column(name = "is_read")
    private boolean isRead;

    public Notification(final Long memberId, final ContentType contentType, final String teamName,
                        final String rollingpaperTitle, final String url,
                        final boolean isRead) {
        this.memberId = memberId;
        this.contentType = contentType;
        this.teamName = teamName;
        this.rollingpaperTitle = rollingpaperTitle;
        this.url = url;
        this.isRead = isRead;
    }

    public void read() {
        this.isRead = true;
    }
}
