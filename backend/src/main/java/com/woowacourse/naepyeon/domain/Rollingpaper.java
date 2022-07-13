package com.woowacourse.naepyeon.domain;

import com.woowacourse.naepyeon.exception.ExceedRollingpaperNameLengthException;
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
@Table(name = "rollingpaper")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Rollingpaper {

    public static final int MAX_TITLE_LENGTH = 20;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rollingpaper_id")
    private Long id;

    @Column(length = 20, nullable = false)
    private String title;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id", nullable = false)
    private Team team;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    public Rollingpaper(final String title, final Team team, final Member member) {
        validateRollingpaper(title);
        this.title = title;
        this.team = team;
        this.member = member;
    }

    public void validateRollingpaper(final String title) {
        if (title.length() > MAX_TITLE_LENGTH) {
            throw new ExceedRollingpaperNameLengthException(title);
        }
    }

    public void changeTitle(final String title) {
        validateRollingpaper(title);
        this.title = title;
    }
}
