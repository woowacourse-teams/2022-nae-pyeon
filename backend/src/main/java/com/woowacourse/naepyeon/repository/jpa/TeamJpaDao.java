package com.woowacourse.naepyeon.repository.jpa;

import com.woowacourse.naepyeon.domain.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TeamJpaDao extends JpaRepository<Team, Long> {

    @Query("delete from Team t where t.id = :id")
    @Modifying
    int deleteByIdAndGetAffectedRow(@Param("id") final Long id);
}