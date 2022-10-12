package com.woowacourse.naepyeon.domain.refreshtoken;

import com.woowacourse.naepyeon.domain.Member;
import java.time.LocalDateTime;
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
@Table(name = "refresh_token", indexes = {
        @Index(name = "refresh_token_member_id", columnList = "member_id")
})
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RefreshToken {

    private static final int EXPIRED_DAYS = 7;
    private static final int REMAINING_DAYS_TO_EXTENDS = 2;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "refresh_token_id")
    private Long id;

    @Column(name = "value", unique = true, nullable = false)
    private String value;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @Column(name = "expired_time")
    private LocalDateTime expiredTime;

    private RefreshToken(final String value, final Member member, final LocalDateTime expiredTime) {
        this.value = value;
        this.member = member;
        this.expiredTime = expiredTime;
    }

    public static RefreshToken createBy(final Member member, final RefreshTokenGenerator generator) {
        return new RefreshToken(generator.generate(), member, LocalDateTime.now().plusDays(EXPIRED_DAYS));
    }

    public boolean isExpired() {
        return expiredTime.isBefore(LocalDateTime.now());
    }

    public void extendsExpired() {
        final LocalDateTime now = LocalDateTime.now();
        if (expiredTime.isBefore(now.plusDays(REMAINING_DAYS_TO_EXTENDS))) {
            expiredTime = now.plusDays(EXPIRED_DAYS);
        }
    }

    public Long getMemberId() {
        return member.getId();
    }
}
