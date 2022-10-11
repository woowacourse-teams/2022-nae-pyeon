package com.woowacourse.naepyeon.service;

import com.woowacourse.naepyeon.domain.Member;
import com.woowacourse.naepyeon.domain.refreshtoken.RefreshToken;
import com.woowacourse.naepyeon.exception.NotFoundTeamMemberException;
import com.woowacourse.naepyeon.exception.TokenInvalidExpiredException;
import com.woowacourse.naepyeon.repository.member.MemberRepository;
import com.woowacourse.naepyeon.repository.refreshtoken.RefreshTokenRepository;
import com.woowacourse.naepyeon.service.dto.AccessTokenDto;
import com.woowacourse.naepyeon.service.dto.PlatformUserDto;
import com.woowacourse.naepyeon.service.dto.TokenRequestDto;
import com.woowacourse.naepyeon.service.dto.TokenResponseDto;
import com.woowacourse.naepyeon.support.JwtTokenProvider;
import com.woowacourse.naepyeon.support.oauth.google.GooglePlatformUserProvider;
import com.woowacourse.naepyeon.support.oauth.kakao.KakaoPlatformUserProvider;
import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthService {

    private static final int MAX_REFRESH_TOKEN_SIZE = 3;

    private final MemberService memberService;
    private final JwtTokenProvider jwtTokenProvider;
    private final KakaoPlatformUserProvider kakaoPlatformUserProvider;
    private final GooglePlatformUserProvider googlePlatformUserProvider;
    private final RefreshTokenRepository refreshTokenRepository;
    private final MemberRepository memberRepository;

    public TokenResponseDto createTokenWithKakaoOauth(final TokenRequestDto tokenRequestDto) {
        final PlatformUserDto platformUser = kakaoPlatformUserProvider.getPlatformUser(
                tokenRequestDto.getAuthorizationCode(),
                tokenRequestDto.getRedirectUri()
        );

        return createTokenResponseDto(platformUser);
    }

    public TokenResponseDto createTokenWithGoogleOauth(final TokenRequestDto tokenRequestDto) {
        final PlatformUserDto platformUser = googlePlatformUserProvider.getPlatformUser(
                tokenRequestDto.getAuthorizationCode(),
                tokenRequestDto.getRedirectUri()
        );

        return createTokenResponseDto(platformUser);
    }

    public AccessTokenDto renewalToken(final String refreshToken) {
        final RefreshToken findRefreshToken = findValidRefreshToken(refreshToken);
        findRefreshToken.extendsExpired();
        final String accessToken = jwtTokenProvider.createToken(String.valueOf(findRefreshToken.getMemberId()));

        return new AccessTokenDto(accessToken);
    }

    private RefreshToken findValidRefreshToken(final String refreshToken) {
        final RefreshToken findRefreshToken = refreshTokenRepository.findByValue(refreshToken)
                .orElseThrow(TokenInvalidExpiredException::new);

        if (findRefreshToken.isExpired()) {
            throw new TokenInvalidExpiredException();
        }

        return findRefreshToken;
    }

    private TokenResponseDto createTokenResponseDto(PlatformUserDto platformUser) {
        final Long memberId = createOrFindMemberId(platformUser);
        final String accessToken = jwtTokenProvider.createToken(String.valueOf(memberId));
        final RefreshToken refreshToken = createRefreshToken(memberId);
        return new TokenResponseDto(accessToken, refreshToken.getValue(), memberId);
    }

    private RefreshToken createRefreshToken(final Long memberId) {
        deleteOverRefreshTokens(memberId);
        final Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new NotFoundTeamMemberException(memberId));
        final RefreshToken refreshToken = RefreshToken.createBy(member, () -> UUID.randomUUID().toString());
        return refreshTokenRepository.save(refreshToken);
    }

    private void deleteOverRefreshTokens(final Long memberId) {
        final List<RefreshToken> memberRefreshTokens = refreshTokenRepository.findByMemberId(memberId);
        if (memberRefreshTokens.size() >= MAX_REFRESH_TOKEN_SIZE) {
            final List<Long> deleteRefreshTokenIds = extractDeleteIds(memberRefreshTokens);
            refreshTokenRepository.deleteAllById(deleteRefreshTokenIds);
        }
    }

    private List<Long> extractDeleteIds(final List<RefreshToken> memberRefreshTokens) {
        return memberRefreshTokens.stream()
                .sorted(Comparator.comparing(RefreshToken::getExpiredTime))
                .limit((long) memberRefreshTokens.size() - (MAX_REFRESH_TOKEN_SIZE - 1))
                .map(RefreshToken::getId)
                .collect(Collectors.toList());
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

    public void logout(final String refreshToken) {
        refreshTokenRepository.deleteByValue(refreshToken);
    }

    public void deleteExpiredRefreshTokens() {
        refreshTokenRepository.deleteExpired(LocalDateTime.now());
    }
}
