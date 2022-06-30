package com.woowacourse.naepyeon.domain;

import com.woowacourse.naepyeon.domain.Team;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@Table(name = "rollingpaper")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Rollingpaper {

    @Id
    @GeneratedValue
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
}
