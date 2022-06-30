package com.woowacourse.naepyeon.repository;

import com.woowacourse.naepyeon.domain.Message;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<Message, Long> {
}