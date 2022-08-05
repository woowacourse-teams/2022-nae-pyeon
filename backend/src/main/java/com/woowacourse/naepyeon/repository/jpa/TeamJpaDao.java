package com.woowacourse.naepyeon.repository.jpa;

import com.woowacourse.naepyeon.domain.Team;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TeamJpaDao extends JpaRepository<Team, Long> {

    @Query("delete from Team t where t.id = :id")
    @Modifying(clearAutomatically = true)
    int deleteByIdAndGetAffectedRow(@Param("id") final Long id);

    Page<Team> findByNameContaining(final String keyword, final Pageable pageRequest);
}