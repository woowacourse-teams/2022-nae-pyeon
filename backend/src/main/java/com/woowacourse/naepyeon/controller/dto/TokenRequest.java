package com.woowacourse.naepyeon.controller.dto;

import com.woowacourse.naepyeon.service.dto.TokenRequestDto;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
@ToString
public class TokenRequest {

    private String authorizationCode;
    private String redirectUri;

    public TokenRequestDto toServiceRequest() {
        return new TokenRequestDto(authorizationCode, redirectUri);
    }
}
