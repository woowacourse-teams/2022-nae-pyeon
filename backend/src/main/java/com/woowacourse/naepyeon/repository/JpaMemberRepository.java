package com.woowacourse.naepyeon.repository;

import com.woowacourse.naepyeon.domain.Member;
import com.woowacourse.naepyeon.repository.jpa.MemberJpaDao;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class JpaMemberRepository implements MemberRepository {

    private final MemberJpaDao memberJpaDao;

    @Override
    public Long save(final Member member) {
        return memberJpaDao.save(member).getId();
    }

    @Override
    public Optional<Member> findById(final Long memberId) {
        return memberJpaDao.findById(memberId);
    }

    @Override
    public Optional<Member> findByEmail(final String email) {
        return memberJpaDao.findByEmail(email);
    }

    @Override
    public void delete(final Long memberId) {
        memberJpaDao.deleteById(memberId);
    }
}
