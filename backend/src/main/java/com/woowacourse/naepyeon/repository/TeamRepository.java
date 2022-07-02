package com.woowacourse.naepyeon.repository;

import com.woowacourse.naepyeon.domain.Team;

import java.util.Optional;

public interface TeamRepository {

    Long save(final Team team);

    Optional<Team> findById(final Long teamId);

    void delete(final Long teamId);
}
