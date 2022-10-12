package com.woowacourse.naepyeon.repository.messagelike;

public interface MessageLikeRepositoryCustom {

    Boolean existsByMemberIdAndMessageId(final Long memberId, final Long messageId);
}
