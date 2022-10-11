package com.woowacourse.naepyeon.repository.messagelike;

import com.woowacourse.naepyeon.domain.message.MessageLike;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MessageLikeRepository extends JpaRepository<MessageLike, Long>, MessageLikeRepositoryCustom {

    Optional<MessageLike> findByMemberIdAndMessageId(Long memberId, Long MessageId);

    List<MessageLike> findByMemberIdAndRollingpaperId(Long memberId, Long rollingpaperId);
}
