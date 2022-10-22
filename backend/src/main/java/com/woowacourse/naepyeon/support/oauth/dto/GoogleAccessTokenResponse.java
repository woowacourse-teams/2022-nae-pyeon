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
public class GoogleAccessTokenResponse {

    private String access_token;
    private Long expires_in;
    private String scope;
    private String token_type;
    private String id_token;
}
