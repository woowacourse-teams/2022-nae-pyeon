package com.woowacourse.naepyeon.support.oauth.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@ToString
public class KakaoUserResponse {

    private Long id;
    private KakaoAccount kakao_account;

    public String getNickname() {
        return kakao_account.getProfile()
                .getNickname();
    }

    public String getEmail() {
        return kakao_account.getEmail();
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    @AllArgsConstructor
    @ToString
    private static class KakaoAccount {

        private String email;
        private KakaoProfile profile;
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    @AllArgsConstructor
    @ToString
    private static class KakaoProfile {

        private String nickname;
        private String profile_image_url;
    }
}
