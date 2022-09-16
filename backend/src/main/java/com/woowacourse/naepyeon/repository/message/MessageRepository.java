package com.woowacourse.naepyeon.repository.message;

import com.woowacourse.naepyeon.domain.Message;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<Message, Long>, MessageRepositoryCustom {

    Optional<Message> findById(final Long id);
}
