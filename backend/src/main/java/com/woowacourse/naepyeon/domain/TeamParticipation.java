package com.woowacourse.naepyeon.domain;

import com.woowacourse.naepyeon.exception.ExceedNicknameLengthException;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(
        name = "team_member",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "participate_duplicate",
                        columnNames= {"team_id", "member_id"}
                )
        }
)
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TeamParticipation {

    public static final int MAX_NICKNAME_LENGTH = 20;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "team_member_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id")
    private Team team;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(length = 20, nullable = false)
    private String nickname;

    public TeamParticipation(final Team team, final Member member, final String nickname) {
        this.team = team;
        this.member = member;
        this.nickname = nickname;
    }

    public void changeNickname(final String nickname) {
        validateNicknameLength(nickname);
        this.nickname = nickname;
    }

    private void validateNicknameLength(final String nickname) {
        if (nickname.length() > MAX_NICKNAME_LENGTH) {
            throw new ExceedNicknameLengthException(nickname);
        }
    }
}
