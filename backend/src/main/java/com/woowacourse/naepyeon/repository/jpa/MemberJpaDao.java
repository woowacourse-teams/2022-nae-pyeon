package com.woowacourse.naepyeon.repository.jpa;

import com.woowacourse.naepyeon.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberJpaDao extends JpaRepository<Member, Long> {
}