package com.woowacourse.naepyeon.support.oauth.kakao.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class KakaoUserResponse {

    private Long id;

    @JsonProperty("kakao_account")
    private KakaoAccount kakaoAccount;

    public String getNickname() {
        return kakaoAccount.getProfile()
                .getNickname();
    }

    public String getEmail() {
        return kakaoAccount.getEmail();
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    @AllArgsConstructor
    private static class KakaoAccount {

        private String email;
        private KakaoProfile profile;
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    @AllArgsConstructor
    private static class KakaoProfile {

        private String nickname;

        @JsonProperty("profile_image_url")
        private String profileImageUrl;
    }
}
