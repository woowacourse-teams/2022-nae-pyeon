package com.woowacourse.naepyeon.service;

import com.woowacourse.naepyeon.domain.Member;
import com.woowacourse.naepyeon.repository.MemberRepository;
import com.woowacourse.naepyeon.service.dto.MemberResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    public Long save(final Member member) {
        return memberRepository.save(member);
    }

    public MemberResponse findById(final Long memberId) {
        final Member member = memberRepository.findById(memberId)
                .orElseThrow(IllegalArgumentException::new);
        return MemberResponse.toEntity(member);
    }

    public void updateUsername(Long memberId, final String username) {
        final Member member = memberRepository.findById(memberId)
                .orElseThrow(IllegalArgumentException::new);
        ;
        member.changeUsername(username);
    }

    public void delete(Long memberId) {
        memberRepository.delete(memberId);
    }
}
