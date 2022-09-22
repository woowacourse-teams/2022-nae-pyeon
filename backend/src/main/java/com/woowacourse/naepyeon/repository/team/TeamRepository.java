package com.woowacourse.naepyeon.repository.team;

import com.woowacourse.naepyeon.domain.Team;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamRepository extends JpaRepository<Team, Long> {

    Boolean existsByName(final String name);

    Page<Team> findTeamsByNameContaining(final String keyword, final Pageable pageRequest);

    List<Team> findAll();
}
