package com.woowacourse.naepyeon.support.oauth.naver;

import com.woowacourse.naepyeon.domain.Platform;
import com.woowacourse.naepyeon.service.dto.PlatformUserDto;
import com.woowacourse.naepyeon.support.oauth.dto.AccessTokenResponse;
import com.woowacourse.naepyeon.support.oauth.naver.dto.NaverUserResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

@Component
public class NaverPlatformUserProvider {

    private static final String AUTHORIZATION_SERVER_BASE_URL = "https://nid.naver.com/oauth2.0";
    private static final String RESOURCE_SERVER_BASE_URL = "https://openapi.naver.com";
    private static final String ACCESS_TOKEN_URI = "/token";
    private static final String USER_INFO_URI = "v1/nid/me";

    private final WebClient authorizationWebClient = WebClient.builder()
            .baseUrl(AUTHORIZATION_SERVER_BASE_URL)
            .build();

    private final WebClient resourceWebClient = WebClient.builder()
            .baseUrl(RESOURCE_SERVER_BASE_URL)
            .build();

    private final String naverClientId;
    private final String naverClientSecret;

    public NaverPlatformUserProvider(
            @Value("${naver.client-id}") final String naverClientId,
            @Value("${naver.client-secret}") final String naverClientSecret
    ) {
        this.naverClientId = naverClientId;
        this.naverClientSecret = naverClientSecret;
    }

    public PlatformUserDto getPlatformUser(final String authorizationCode, final String redirectUri, final String state) {
        final AccessTokenResponse accessTokenResponse = requestAccessToken(authorizationCode, redirectUri, state);
        final NaverUserResponse naverUserResponse = requestPlatformUser(accessTokenResponse.getAccessToken());
        return new PlatformUserDto(
                naverUserResponse.getNickname(),
                naverUserResponse.getEmail(),
                Platform.NAVER.name(),
                naverUserResponse.getId()
        );
    }

    private AccessTokenResponse requestAccessToken(final String authorizationCode, final String redirectUri,
                                                   final String state) {
        try {
            return authorizationWebClient.post()
                    .uri(uriBuilder -> uriBuilder.path(ACCESS_TOKEN_URI)
                            .queryParam("grant_type", "authorization_code")
                            .queryParam("client_id", naverClientId)
                            .queryParam("client_secret", naverClientSecret)
                            .queryParam("redirect_uri", redirectUri)
                            .queryParam("code", authorizationCode)
                            .queryParam("state", state)
                            .build()
                    ).retrieve()
                    .bodyToMono(AccessTokenResponse.class)
                    .block();

        } catch (final RuntimeException e) {
            e.printStackTrace();
            throw new IllegalArgumentException();
        }
    }

    private NaverUserResponse requestPlatformUser(final String accessToken) {
        try {
            return resourceWebClient.post()
                    .uri(uriBuilder -> uriBuilder.path(USER_INFO_URI).build())
                    .header(HttpHeaders.AUTHORIZATION, String.format("Bearer %s", accessToken))
                    .contentType(MediaType.APPLICATION_JSON)
                    .retrieve()
                    .bodyToMono(NaverUserResponse.class)
                    .block();
        } catch (final RuntimeException e) {
            e.printStackTrace();
            throw new IllegalArgumentException();
        }
    }
}
