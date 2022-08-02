package com.woowacourse.naepyeon.service;

import com.woowacourse.naepyeon.domain.Member;
import com.woowacourse.naepyeon.domain.Platform;
import com.woowacourse.naepyeon.repository.MemberRepository;
import com.woowacourse.naepyeon.service.dto.TokenRequestDto;
import com.woowacourse.naepyeon.service.dto.TokenResponseDto;
import com.woowacourse.naepyeon.support.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthService {

    private final MemberRepository memberRepository;
    private final JwtTokenProvider jwtTokenProvider;

    public TokenResponseDto createToken(final TokenRequestDto tokenRequestDto) {
        final Long memberId = memberRepository.findMemberIdByPlatformAndPlatformId(
                Platform.valueOf(tokenRequestDto.getPlatformType()),
                tokenRequestDto.getPlatformId()
        ).orElseGet(() -> memberRepository.save(
                new Member(
                        tokenRequestDto.getUsername(),
                        tokenRequestDto.getEmail(),
                        Platform.valueOf(tokenRequestDto.getPlatformType()),
                        tokenRequestDto.getPlatformId()
                )
        ));
        final String accessToken = jwtTokenProvider.createToken(String.valueOf(memberId));
        return new TokenResponseDto(accessToken, memberId);
    }
}
