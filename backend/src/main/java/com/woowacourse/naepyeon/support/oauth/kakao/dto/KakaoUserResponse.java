package com.woowacourse.naepyeon.support.oauth.kakao.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class KakaoUserResponse {

    private String id;
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
    private static class KakaoAccount {

        private String email;
        private KakaoProfile profile;
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    private static class KakaoProfile {

        private String nickname;
        private String profile_image_url;
    }
}
