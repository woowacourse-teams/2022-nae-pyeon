package com.woowacourse.naepyeon.repository;

import com.woowacourse.naepyeon.domain.Message;
import com.woowacourse.naepyeon.repository.jpa.MessageJpaDao;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class JpaMessageRepository implements MessageRepository {

    private final MessageJpaDao messageJpaDao;

    @Override
    public Long save(final Message message) {
        return messageJpaDao.save(message)
                .getId();
    }

    @Override
    public Optional<Message> findById(final Long id) {
        return messageJpaDao.findById(id);
    }

    @Override
    public void update(final Long id, final String newContent) {
        final Message message = findById(id)
                .orElseThrow(IllegalArgumentException::new);
        message.changeContent(newContent);
    }

    @Override
    public void delete(final Long id) {
        messageJpaDao.deleteById(id);
    }
}
