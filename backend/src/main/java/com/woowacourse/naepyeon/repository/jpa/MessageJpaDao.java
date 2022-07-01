package com.woowacourse.naepyeon.repository.jpa;

import com.woowacourse.naepyeon.domain.Message;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageJpaDao extends JpaRepository<Message, Long> {
}