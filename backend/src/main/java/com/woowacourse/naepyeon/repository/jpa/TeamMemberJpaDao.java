package com.woowacourse.naepyeon.repository.jpa;

import com.woowacourse.naepyeon.domain.TeamMember;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamMemberJpaDao extends JpaRepository<TeamMember, Long> {
}