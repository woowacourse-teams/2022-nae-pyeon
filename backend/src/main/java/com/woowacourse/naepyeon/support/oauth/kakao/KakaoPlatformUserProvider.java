package com.woowacourse.naepyeon.support.oauth.kakao;

import com.woowacourse.naepyeon.config.logging.trace.annotation.NoLogging;
import com.woowacourse.naepyeon.domain.Platform;
import com.woowacourse.naepyeon.exception.KakaoAuthorizationException;
import com.woowacourse.naepyeon.exception.KakaoResourceException;
import com.woowacourse.naepyeon.service.dto.PlatformUserDto;
import com.woowacourse.naepyeon.support.oauth.PlatformUserProvider;
import com.woowacourse.naepyeon.support.oauth.dto.AccessTokenResponse;
import com.woowacourse.naepyeon.support.oauth.dto.KakaoUserResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

@Component
public class KakaoPlatformUserProvider implements PlatformUserProvider {

    private static final String AUTHORIZATION_SERVER_BASE_URL = "https://kauth.kakao.com";
    private static final String RESOURCE_SERVER_BASE_URL = "https://kapi.kakao.com";
    private static final String ACCESS_TOKEN_URI = "/oauth/token";
    private static final String USER_INFO_URI = "/v2/user/me";

    private final WebClient authorizationWebClient = WebClient.builder()
            .baseUrl(AUTHORIZATION_SERVER_BASE_URL)
            .build();

    private final WebClient resourceWebClient = WebClient.builder()
            .baseUrl(RESOURCE_SERVER_BASE_URL)
            .build();

    private final String kakaoAdminKey;
    private final String kakaoClientId;
    private final String kakaoClientSecret;

    public KakaoPlatformUserProvider(
            @Value("${kakao.admin-key}") final String kakaoAdminKey,
            @Value("${kakao.client-id}") final String kakaoClientId,
            @Value("${kakao.client-secret}") final String kakaoClientSecret
    ) {
        this.kakaoAdminKey = kakaoAdminKey;
        this.kakaoClientId = kakaoClientId;
        this.kakaoClientSecret = kakaoClientSecret;
    }

    @Override
    @NoLogging
    public PlatformUserDto getPlatformUser(final String authorizationCode, final String redirectUri) {
        final AccessTokenResponse accessTokenResponse = requestAccessToken(authorizationCode, redirectUri);
        final KakaoUserResponse kakaoUserResponse = requestPlatformUser(accessTokenResponse.getAccess_token());
        return new PlatformUserDto(
                kakaoUserResponse.getNickname(),
                kakaoUserResponse.getEmail(),
                Platform.KAKAO.name(),
                String.valueOf(kakaoUserResponse.getId())
        );
    }

    private AccessTokenResponse requestAccessToken(final String authorizationCode, final String redirectUri) {
        try {
            return authorizationWebClient.post()
                    .uri(uriBuilder -> uriBuilder.path(ACCESS_TOKEN_URI)
                            .queryParam("grant_type", "authorization_code")
                            .queryParam("client_id", kakaoClientId)
                            .queryParam("redirect_uri", redirectUri)
                            .queryParam("code", authorizationCode)
                            .queryParam("client_secret", kakaoClientSecret)
                            .build()
                    ).contentType(MediaType.APPLICATION_FORM_URLENCODED)
                    .retrieve()
                    .bodyToMono(AccessTokenResponse.class)
                    .block();
        } catch (final RuntimeException e) {
            throw new KakaoAuthorizationException(e);
        }
    }

    private KakaoUserResponse requestPlatformUser(final String accessToken) {
        try {
            return resourceWebClient.post()
                    .uri(uriBuilder -> uriBuilder.path(USER_INFO_URI)
                            .queryParam("secure_resource", "true")
                            .queryParam("property_keys", "[\"kakao_account.profile\",\"kakao_account.email\"]")
                            .build()
                    ).header(HttpHeaders.AUTHORIZATION, String.format("Bearer %s", accessToken))
                    .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                    .retrieve()
                    .bodyToMono(KakaoUserResponse.class)
                    .block();
        } catch (final RuntimeException e) {
            throw new KakaoResourceException(e, accessToken);
        }
    }
}
