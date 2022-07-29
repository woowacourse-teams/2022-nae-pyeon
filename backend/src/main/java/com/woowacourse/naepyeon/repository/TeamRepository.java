package com.woowacourse.naepyeon.repository;

import com.woowacourse.naepyeon.domain.Team;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

public interface TeamRepository {

    Long save(final Team team);

    Optional<Team> findById(final Long teamId);

    List<Team> findTeamsByContainingTeamName(final String keyword, final Pageable pageRequest);

    List<Team> findAll();

    void delete(final Long teamId);
}
