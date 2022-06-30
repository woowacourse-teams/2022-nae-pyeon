package com.woowacourse.naepyeon.repository;

import com.woowacourse.naepyeon.domain.Team;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamRepository extends JpaRepository<Team, Long> {
}