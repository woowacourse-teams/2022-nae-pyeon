package com.woowacourse.naepyeon.repository.message;

import com.woowacourse.naepyeon.domain.Message;
import com.woowacourse.naepyeon.domain.rollingpaper.Rollingpaper;
import com.woowacourse.naepyeon.service.dto.WrittenMessageResponseDto;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface MessageRepositoryCustom {

    List<Message> findAllByRollingpaper(final Rollingpaper rollingpaper);

    Page<WrittenMessageResponseDto> findAllByAuthorId(final Long authorId, final Pageable pageRequest);
}
