package com.woowacourse.naepyeon.support.oauth.google;

import com.woowacourse.naepyeon.domain.Platform;
import com.woowacourse.naepyeon.exception.GoogleAuthorizationException;
import com.woowacourse.naepyeon.exception.GoogleResourceException;
import com.woowacourse.naepyeon.service.dto.PlatformUserDto;
import com.woowacourse.naepyeon.support.oauth.PlatformUserProvider;
import com.woowacourse.naepyeon.support.oauth.dto.GoogleAccessTokenResponse;
import com.woowacourse.naepyeon.support.oauth.dto.GoogleUserResponse;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

@Component
public class GooglePlatformUserProvider implements PlatformUserProvider {

    private static final String AUTHORIZATION_SERVER_BASE_URL = "https://oauth2.googleapis.com";
    private static final String RESOURCE_SERVER_BASE_URL = "https://www.googleapis.com";
    private static final String ACCESS_TOKEN_URI = "/token";
    private static final String USER_INFO_URI = "/oauth2/v1/userinfo";


    private final String googleClientId;
    private final String googleClientSecret;

    private final WebClient authorizationWebClient = WebClient.builder()
            .baseUrl(AUTHORIZATION_SERVER_BASE_URL)
            .build();

    private final WebClient resourceWebClient = WebClient.builder()
            .baseUrl(RESOURCE_SERVER_BASE_URL)
            .build();

    public GooglePlatformUserProvider(
            @Value("${google.client-id}") final String googleClientId,
            @Value("${google.client-secret}") final String googleClientSecret
    ) {
        this.googleClientId = googleClientId;
        this.googleClientSecret = googleClientSecret;
    }

    @Override
    public PlatformUserDto getPlatformUser(String authorizationCode, String redirectUri) {
        final GoogleAccessTokenResponse accessTokenResponse = requestAccessToken(authorizationCode, redirectUri);
        final GoogleUserResponse googleUserResponse = requestPlatformUser(accessTokenResponse.getAccess_token());
        return new PlatformUserDto(
                googleUserResponse.getNickname(),
                googleUserResponse.getEmail(),
                Platform.GOOGLE.name(),
                String.valueOf(googleUserResponse.getId())
        );
    }

    private GoogleAccessTokenResponse requestAccessToken(final String authorizationCode, final String redirectUri) {
        Map<String, String> bodyMap = new HashMap();
        bodyMap.put("client_id", googleClientId);
        bodyMap.put("client_secret", googleClientSecret);
        bodyMap.put("grant_type", "authorization_code");
        bodyMap.put("redirect_uri", redirectUri);
        try {
            WebClient.ResponseSpec retrieve = authorizationWebClient.post()
                    .uri(uriBuilder -> uriBuilder.path(ACCESS_TOKEN_URI)
                            .queryParam("code", authorizationCode)
                            .queryParam("client_id", googleClientId)
                            .queryParam("client_secret", googleClientSecret)
                            .queryParam("grant_type", "authorization_code")
                            .queryParam("redirect_uri", redirectUri)
                            .build()
                    )
                    .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                    .retrieve();
            return retrieve
                    .bodyToMono(GoogleAccessTokenResponse.class)
                    .block();
        } catch (final RuntimeException e) {
            WebClientResponseException exception = (WebClientResponseException) e;
            System.out.println(exception.getResponseBodyAsString());
            throw new GoogleAuthorizationException(e);
        }
    }

    private GoogleUserResponse requestPlatformUser(final String accessToken) {
        try {
            return resourceWebClient.get()
                    .uri(uriBuilder -> uriBuilder.path(USER_INFO_URI)
                            .queryParam("access_token", accessToken)
                            .build())
                    .retrieve()
                    .bodyToMono(GoogleUserResponse.class)
                    .block();
        } catch (final RuntimeException e) {
            throw new GoogleResourceException(e, accessToken);
        }
    }
}
