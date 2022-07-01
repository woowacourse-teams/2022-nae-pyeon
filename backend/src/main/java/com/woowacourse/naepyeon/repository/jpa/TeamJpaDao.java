package com.woowacourse.naepyeon.repository.jpa;

import com.woowacourse.naepyeon.domain.Team;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamJpaDao extends JpaRepository<Team, Long> {
}