package com.woowacourse.naepyeon.controller.dto;

import com.woowacourse.naepyeon.service.dto.TokenRequestDto;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
public class TokenRequest {

    private String email;
    private String password;

    public TokenRequestDto toServiceRequest() {
        return new TokenRequestDto(email, password);
    }
}
