package com.woowacourse.naepyeon.service;

import com.woowacourse.naepyeon.domain.Member;
import com.woowacourse.naepyeon.exception.NotFoundMemberException;
import com.woowacourse.naepyeon.repository.MemberRepository;
import com.woowacourse.naepyeon.service.dto.MemberResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberService {

    private final MemberRepository memberRepository;

    public Long save(final String username, final String email, final String password) {
        final Member member = new Member(username, email, password);
        return memberRepository.save(member);
    }

    @Transactional(readOnly = true)
    public MemberResponseDto findById(final Long memberId) {
        final Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new NotFoundMemberException(memberId));
        return new MemberResponseDto(
                memberId,
                member.getUsername(),
                member.getEmail(),
                member.getPassword()
        );
    }

    public void updateUsername(final Long memberId, final String username) {
        final Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new NotFoundMemberException(memberId));
        member.changeUsername(username);
    }

    public void delete(final Long memberId) {
        memberRepository.delete(memberId);
    }
}
