package com.woowacourse.naepyeon.repository;

import com.woowacourse.naepyeon.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {
}