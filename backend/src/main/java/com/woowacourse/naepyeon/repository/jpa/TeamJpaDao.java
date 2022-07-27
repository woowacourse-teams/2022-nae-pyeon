package com.woowacourse.naepyeon.repository.jpa;

import com.woowacourse.naepyeon.domain.Team;
import java.util.List;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TeamJpaDao extends JpaRepository<Team, Long> {

    @Query("delete from Team t where t.id = :id")
    @Modifying(clearAutomatically = true)
    int deleteByIdAndGetAffectedRow(@Param("id") final Long id);

    List<Team> findByNameContaining(final String keyword, final PageRequest pageRequest);
}