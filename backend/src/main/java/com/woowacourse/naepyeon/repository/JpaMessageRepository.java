package com.woowacourse.naepyeon.repository;

import com.woowacourse.naepyeon.domain.Message;
import com.woowacourse.naepyeon.exception.NotFoundMessageException;
import com.woowacourse.naepyeon.repository.jpa.MessageJpaDao;
import com.woowacourse.naepyeon.service.dto.WrittenMessageResponseDto;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
    public List<Message> findAllByRollingpaperId(final Long rollingpaperId) {
        return messageJpaDao.findByRollingpaperId(rollingpaperId);
    }

    @Override
    public Page<WrittenMessageResponseDto> findAllByAuthorId(final Long authorId, final Pageable pageRequest) {
        return messageJpaDao.findAllByAuthorId(authorId, pageRequest);
    }

    @Override
    public void update(final Long id, final String newColor, final String newContent, final boolean anonymous,
                       final boolean secret) {
        final Message message = findById(id)
                .orElseThrow(() -> new NotFoundMessageException(id));
        message.changeContent(newContent);
        message.changeColor(newColor);
        message.changeAnonymous(anonymous);
        message.changeSecret(secret);
    }

    @Override
    public void delete(final Long id) {
        messageJpaDao.deleteById(id);
    }
}
