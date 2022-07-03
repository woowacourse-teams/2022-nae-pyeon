package com.woowacourse.naepyeon.repository;

import com.woowacourse.naepyeon.domain.Message;
import java.util.Optional;

public interface MessageRepository {

    Long save(final Message message);

    Optional<Message> findById(final Long id);

    void update(final Long id, final String newContent);

    void delete(final Long id);
}
