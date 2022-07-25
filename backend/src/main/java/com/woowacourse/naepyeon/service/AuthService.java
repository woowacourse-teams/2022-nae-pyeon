package com.woowacourse.naepyeon.service;

import com.woowacourse.naepyeon.domain.Member;
import com.woowacourse.naepyeon.exception.InvalidLoginException;
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
        final Member member = memberRepository.findByEmail(tokenRequestDto.getEmail())
                .orElseThrow(() -> new InvalidLoginException(tokenRequestDto.getEmail()));
        if (!member.checkPassword(tokenRequestDto.getPassword())) {
            throw new InvalidLoginException(tokenRequestDto.getEmail());
        }
        final String accessToken = jwtTokenProvider.createToken(String.valueOf(member.getId()));
        return new TokenResponseDto(accessToken);
    }
}
