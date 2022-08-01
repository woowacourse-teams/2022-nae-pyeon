package com.woowacourse.naepyeon.controller.dto;

import com.woowacourse.naepyeon.service.dto.TokenRequestDto;
import javax.validation.constraints.NotBlank;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
public class TokenRequest {

    private String platformType;
    private Long platformId;
    @NotBlank(message = "3001:이메일은 공백일 수 없습니다.")
    private String email;
    @NotBlank(message = "3004:유저네임은 공백일 수 없습니다.")
    private String username;
    private String profileImageUrl;


    public TokenRequestDto toServiceRequest() {
        return new TokenRequestDto(platformType, platformId, email, username, profileImageUrl);
    }
}
