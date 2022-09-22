package com.woowacourse.naepyeon.repository.message;

import com.woowacourse.naepyeon.domain.Message;
import java.util.List;

public interface MessageRepositoryCustom {

    List<Message> findAllByRollingpaperId(final Long rollingpaperId);
}
