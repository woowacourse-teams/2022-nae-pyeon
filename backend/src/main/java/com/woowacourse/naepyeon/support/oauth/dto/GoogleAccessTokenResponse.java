package com.woowacourse.naepyeon.support.oauth.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class GoogleAccessTokenResponse {

    private String access_token;
    private Long expires_in;
    private String scope;
    private String token_type;
    private String id_token;
}
