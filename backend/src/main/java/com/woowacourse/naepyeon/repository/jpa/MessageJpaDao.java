package com.woowacourse.naepyeon.repository.jpa;

import com.woowacourse.naepyeon.domain.Message;
import com.woowacourse.naepyeon.service.dto.WrittenMessageResponseDto;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface MessageJpaDao extends JpaRepository<Message, Long> {

    List<Message> findByRollingpaperId(final Long rollingpaperId);

    @Query(value = "select new com.woowacourse.naepyeon.service.dto.WrittenMessageResponseDto"
            + "(n.id, r.id, r.title, t.id, t.name, p.nickname, n.content, n.color) "
            + "from Message n "
            + "join n.rollingpaper r "
            + "join r.team t "
            + "join TeamParticipation p on p.team = t "
            + "where n.author.id = :authorId")
    Page<WrittenMessageResponseDto> findAllByAuthorId(final Long authorId, final Pageable pageRequest);
}