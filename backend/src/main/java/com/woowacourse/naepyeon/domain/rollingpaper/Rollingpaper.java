package com.woowacourse.naepyeon.domain.rollingpaper;

import com.woowacourse.naepyeon.domain.BaseEntity;
import com.woowacourse.naepyeon.domain.Member;
import com.woowacourse.naepyeon.domain.Team;
import com.woowacourse.naepyeon.exception.ExceedRollingpaperNameLengthException;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Getter
@Table(name = "rollingpaper")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Rollingpaper extends BaseEntity {

    public static final int MAX_TITLE_LENGTH = 20;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rollingpaper_id")
    private Long id;

    @Column(name = "title", length = 20, nullable = false)
    private String title;

    @Enumerated(EnumType.STRING)
    @Column(name = "classification", nullable = false)
    private Recipient recipient;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id", nullable = false)
    private Team team;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    public Rollingpaper(final String title, final Recipient recipient, final Team team, final Member member) {
        validateRollingpaper(title);
        this.title = title;
        this.recipient = recipient;
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

    public boolean isAddressee(final Long memberId) {
        return this.member.isSameMember(memberId);
    }

    public Long getAddresseeId() {
        return member.getId();
    }

    public boolean isMemberNull() {
        return this.member == null;
    }

    public boolean checkSameRecipient(Recipient recipient) {
        return this.recipient.equals(recipient);
    }

    public String getTeamName() {
        return team.getName();
    }
}
