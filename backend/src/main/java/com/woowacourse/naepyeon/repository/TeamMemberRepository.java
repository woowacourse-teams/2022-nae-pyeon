package com.woowacourse.naepyeon.repository;

import com.woowacourse.naepyeon.domain.TeamMember;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamMemberRepository extends JpaRepository<TeamMember, Long> {
}