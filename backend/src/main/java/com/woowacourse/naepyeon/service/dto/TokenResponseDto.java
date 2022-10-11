package com.woowacourse.naepyeon.service.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
public class TokenResponseDto {

    private String accessToken;
    private String refreshToken;
    private Long id;
}
