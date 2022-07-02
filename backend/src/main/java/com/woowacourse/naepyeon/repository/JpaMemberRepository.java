package com.woowacourse.naepyeon.repository;

import com.woowacourse.naepyeon.domain.Member;
import com.woowacourse.naepyeon.repository.jpa.MemberJpaDao;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class JpaMemberRepository implements MemberRepository {

    private final MemberJpaDao memberJpaDao;

    public Long save(final Member member) {
        return memberJpaDao.save(member).getId();
    }

    public Optional<Member> findById(final Long memberId) {
        return memberJpaDao.findById(memberId);
    }

    public void delete(final Long memberId) {
        memberJpaDao.deleteById(memberId);
    }
}
