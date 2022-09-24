package com.woowacourse.naepyeon.domain.invitecode;

import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
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

    @Column(unique = true)
    private String code;
    private Long teamId;
    private LocalDateTime expired;

    public InviteCode(final Long id, final String code, final Long teamId, final LocalDateTime expired) {
        this.id = id;
        this.code = code;
        this.teamId = teamId;
        this.expired = expired;
    }

    public static InviteCode createdBy(final Long teamId, final InviteCodeGenerator inviteCodeGenerator) {
        return new InviteCode(null, inviteCodeGenerator.generate(), teamId, LocalDateTime.now().plusHours(24));
    }

    public boolean isAvailable() {
        return LocalDateTime.now().isBefore(expired);
    }
}
