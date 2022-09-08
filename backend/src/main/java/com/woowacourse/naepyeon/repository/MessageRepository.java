package com.woowacourse.naepyeon.repository;

import com.woowacourse.naepyeon.domain.Message;
import com.woowacourse.naepyeon.service.dto.WrittenMessageResponseDto;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MessageRepository extends JpaRepository<Message, Long> {

    Optional<Message> findById(final Long id);

    List<Message> findAllByRollingpaperId(final Long rollingpaperId);

    @Query(value = "select distinct new com.woowacourse.naepyeon.service.dto.WrittenMessageResponseDto"
            + "(m.id, r.id, r.title, t.id, t.name, m.content, m.color, "
            + "case when r.recipient = com.woowacourse.naepyeon.domain.rollingpaper.Recipient.MEMBER then p.nickname "
            + "when r.recipient = com.woowacourse.naepyeon.domain.rollingpaper.Recipient.TEAM then t.name "
            + "else '' end) "
            + "from Message m"
            + ", Rollingpaper r"
            + ", Team t"
            + ", TeamParticipation p "
            + "where m.rollingpaper.id = r.id "
            + "and r.team.id = t.id "
            + "and p.team.id = t.id "
            + "and m.author.id = :authorId "
            + "and (p.member.id = r.member.id or r.member.id is null)")
    Page<WrittenMessageResponseDto> findAllByAuthorId(@Param("authorId") final Long authorId,
                                                      final Pageable pageRequest);
}
