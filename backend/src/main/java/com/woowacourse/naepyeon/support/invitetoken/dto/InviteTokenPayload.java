package com.woowacourse.naepyeon.support.invitetoken.dto;

import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class InviteTokenPayload {

    private Long teamId;
    private LocalDateTime expired;
}
