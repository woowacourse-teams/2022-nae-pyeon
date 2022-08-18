package com.woowacourse.naepyeon.support.invitetoken;

public interface InviteTokenProvider {

    String createInviteToken(final Long teamId);

    Long getTeamId(final String token);
}
