package com.woowacourse.naepyeon.service;

import com.woowacourse.naepyeon.domain.Member;
import com.woowacourse.naepyeon.domain.Platform;
import com.woowacourse.naepyeon.repository.MemberRepository;
import com.woowacourse.naepyeon.service.dto.PlatformUserDto;
import com.woowacourse.naepyeon.service.dto.TokenRequestDto;
import com.woowacourse.naepyeon.service.dto.TokenResponseDto;
import com.woowacourse.naepyeon.support.JwtTokenProvider;
import com.woowacourse.naepyeon.support.oauth.kakao.KakaoPlatformUserProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthService {

    private final MemberRepository memberRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final KakaoPlatformUserProvider kakaoPlatformUserProvider;


    public TokenResponseDto createTokenWithKakaoOauth(final TokenRequestDto tokenRequestDto) {
        final PlatformUserDto platformUser = kakaoPlatformUserProvider.getPlatformUser(
                tokenRequestDto.getAuthorizationCode(),
                tokenRequestDto.getRedirectUri()
        );

        final Long memberId = createOrFindMemberId(platformUser);
        final String accessToken = jwtTokenProvider.createToken(String.valueOf(memberId));
        return new TokenResponseDto(accessToken, memberId);
    }

    private Long createOrFindMemberId(final PlatformUserDto platformUser) {
        return memberRepository.findMemberIdByPlatformAndPlatformId(
                Platform.valueOf(platformUser.getPlatform()),
                platformUser.getPlatformId()
        ).orElseGet(() -> memberRepository.save(
                new Member(
                        platformUser.getUsername(),
                        platformUser.getEmail(),
                        Platform.valueOf(platformUser.getPlatform()),
                        platformUser.getPlatformId()
                )
        ));
    }
}
