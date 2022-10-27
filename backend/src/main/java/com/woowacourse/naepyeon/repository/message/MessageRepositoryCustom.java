package com.woowacourse.naepyeon.repository.message;

import com.woowacourse.naepyeon.domain.message.Message;
import com.woowacourse.naepyeon.service.dto.WrittenMessageResponseDto;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Lock;

import javax.persistence.LockModeType;

public interface MessageRepositoryCustom {

    List<Message> findAllByRollingpaperId(final Long rollingpaperId);

    Page<WrittenMessageResponseDto> findAllByAuthorId(final Long authorId, final Pageable pageRequest);

    @Lock(LockModeType.OPTIMISTIC)
    Optional<Message> findByIdForUpdate(Long id);
}
