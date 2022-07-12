package com.woowacourse.naepyeon.repository;

import com.woowacourse.naepyeon.domain.TeamMember;
import com.woowacourse.naepyeon.repository.jpa.TeamMemberJpaDao;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class JpaTeamMemberRepository implements TeamMemberRepository {

    private final TeamMemberJpaDao teamMemberJpaDao;

    @Override
    public Long save(final TeamMember teamMember) {
        return teamMemberJpaDao.save(teamMember)
                .getId();
    }

    @Override
    public Optional<TeamMember> findById(final Long id) {
        return teamMemberJpaDao.findById(id);
    }

    @Override
    public List<TeamMember> findByTeamId(final Long teamId) {
        return teamMemberJpaDao.findByTeamId(teamId);
    }
}
