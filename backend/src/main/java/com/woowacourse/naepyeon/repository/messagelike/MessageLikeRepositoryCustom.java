package com.woowacourse.naepyeon.repository.messagelike;

public interface MessageLikeRepositoryCustom {

    Boolean existsByMemberIdAndMessageId(Long memberId, Long messageId);
}
