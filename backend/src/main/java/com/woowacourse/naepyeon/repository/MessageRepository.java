package com.woowacourse.naepyeon.repository;

import com.woowacourse.naepyeon.domain.Message;
import java.util.List;
import java.util.Optional;

public interface MessageRepository {

    Long save(final Message message);

    Optional<Message> findById(final Long id);

    List<Message> findAllByRollingpaperId(final Long rollingpaperId);

    void update(final Long id, final String newColor, final String newContent);

    void delete(final Long id);
}
