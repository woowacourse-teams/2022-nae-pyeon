package com.woowacourse.naepyeon.repository.jpa;

import com.woowacourse.naepyeon.domain.Message;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageJpaDao extends JpaRepository<Message, Long> {

    List<Message> findByRollingpaperId(final Long rollingpaperId);
}