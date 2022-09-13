package com.woowacourse.naepyeon.support.oauth.naver.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class NaverUserResponse {

    @JsonProperty("resultcode")
    private String resultCode;

    private String message;
    
    @JsonProperty("response")
    private NaverAccount naverAccount;

    public String getNickname() {
        return naverAccount.getNickname();
    }

    public String getEmail() {
        return naverAccount.getEmail();
    }

    public String getId() {
        return naverAccount.getId();
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    @AllArgsConstructor
    private static class NaverAccount {

        private String id;
        private String nickname;
        private String email;
    }
}
