package com.woowacourse.naepyeon.repository.message;

import com.woowacourse.naepyeon.domain.message.Message;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<Message, Long>, MessageRepositoryCustom {

}
