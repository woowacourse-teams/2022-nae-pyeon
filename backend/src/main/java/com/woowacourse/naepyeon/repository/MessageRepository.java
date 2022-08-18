package com.woowacourse.naepyeon.repository;

import com.woowacourse.naepyeon.domain.Message;
import com.woowacourse.naepyeon.service.dto.WrittenMessageResponseDto;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface MessageRepository {

    Long save(final Message message);

    Optional<Message> findById(final Long id);

    List<Message> findAllByRollingpaperId(final Long rollingpaperId);

    Page<WrittenMessageResponseDto> findAllByAuthorId(final Long memberId, final Pageable pageRequest);

    void update(final Long id, final String newColor, final String newContent, final boolean anonymous,
                final boolean secret);

    void delete(final Long id);
}
