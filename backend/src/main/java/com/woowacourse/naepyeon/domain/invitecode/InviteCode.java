package com.woowacourse.naepyeon.domain.invitecode;

import com.woowacourse.naepyeon.domain.Team;
import java.time.LocalDateTime;
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

@Getter
@Entity
@Table(name = "invite_code")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class InviteCode {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "invite_code_id")
    private Long id;

    @Column(name = "code", unique = true, nullable = false)
    private String code;

    @Column(name = "expired", nullable = false)
    private LocalDateTime expired;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id", nullable = false)
    private Team team;

    public InviteCode(final Long id, final String code, final LocalDateTime expired, final Team team) {
        this.id = id;
        this.code = code;
        this.expired = expired;
        this.team = team;
    }

    public static InviteCode createdBy(final Team team, final InviteCodeGenerator inviteCodeGenerator) {
        return new InviteCode(null, inviteCodeGenerator.generate(), LocalDateTime.now().plusHours(24), team);
    }

    public boolean isAvailable() {
        return LocalDateTime.now().isBefore(expired);
    }

    public Long getTeamId() {
        return team.getId();
    }
}
