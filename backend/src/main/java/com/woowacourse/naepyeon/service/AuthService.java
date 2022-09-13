package com.woowacourse.naepyeon.service;

import com.woowacourse.naepyeon.service.dto.PlatformUserDto;
import com.woowacourse.naepyeon.service.dto.TokenRequestDto;
import com.woowacourse.naepyeon.service.dto.TokenResponseDto;
import com.woowacourse.naepyeon.support.JwtTokenProvider;
import com.woowacourse.naepyeon.support.oauth.kakao.KakaoPlatformUserProvider;
import com.woowacourse.naepyeon.support.oauth.naver.NaverPlatformUserProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthService {

    private final MemberService memberService;
    private final JwtTokenProvider jwtTokenProvider;
    private final KakaoPlatformUserProvider kakaoPlatformUserProvider;
    private final NaverPlatformUserProvider naverPlatformUserProvider;

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
        return memberService.findMemberIdByPlatformAndPlatformId(
                platformUser.getPlatform(),
                platformUser.getPlatformId()
        ).orElseGet(() -> saveMember(platformUser));
    }

    private Long saveMember(final PlatformUserDto platformUser) {
        return memberService.save(
                platformUser.getUsername(),
                platformUser.getEmail(),
                platformUser.getPlatform(),
                platformUser.getPlatformId()
        );
    }

    public TokenResponseDto createTokenWithNaverOauth(final String authorizationCode, final String redirectUri,
                                                      final String state) {
        final PlatformUserDto platformUser = naverPlatformUserProvider.getPlatformUser(
                authorizationCode,
                redirectUri,
                state
        );
        final Long memberId = createOrFindMemberId(platformUser);
        final String accessToken = jwtTokenProvider.createToken(String.valueOf(memberId));
        return new TokenResponseDto(accessToken, memberId);
    }
}
