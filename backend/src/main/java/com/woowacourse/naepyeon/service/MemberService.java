package com.woowacourse.naepyeon.service;

import com.woowacourse.naepyeon.domain.Member;
import com.woowacourse.naepyeon.domain.Platform;
import com.woowacourse.naepyeon.exception.NotFoundMemberException;
import com.woowacourse.naepyeon.repository.MemberRepository;
import com.woowacourse.naepyeon.service.dto.MemberResponseDto;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberService {

    private final MemberRepository memberRepository;

    public Long save(final String username, final String email, final String platformType, final String platformId) {
        final Member member = new Member(username, email, Platform.valueOf(platformType), platformId);
        return memberRepository.save(member)
                .getId();
    }

    @Transactional(readOnly = true)
    public MemberResponseDto findById(final Long memberId) {
        final Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new NotFoundMemberException(memberId));
        return new MemberResponseDto(
                member.getId(),
                member.getUsername(),
                member.getEmail()
        );
    }

    public void updateUsername(final Long memberId, final String username) {
        final Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new NotFoundMemberException(memberId));
        member.changeUsername(username);
    }

    public void delete(final Long memberId) {
        memberRepository.findById(memberId)
                .orElseThrow(() -> new NotFoundMemberException(memberId));
        memberRepository.deleteById(memberId);
    }

    public Optional<Long> findMemberIdByPlatformAndPlatformId(final String platform, final String platformId) {
        return memberRepository.findMemberIdByPlatformAndPlatformId(Platform.valueOf(platform), platformId);
    }
}
