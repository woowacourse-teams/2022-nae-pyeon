package com.woowacourse.naepyeon.controller.auth;

import com.woowacourse.naepyeon.service.dto.RefreshTokenDto;
import com.woowacourse.naepyeon.controller.dto.TokenRequest;
import com.woowacourse.naepyeon.service.AuthService;
import com.woowacourse.naepyeon.service.dto.AccessTokenDto;
import com.woowacourse.naepyeon.service.dto.TokenResponseDto;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/oauth/kakao")
    public ResponseEntity<TokenResponseDto> kakaoLogin(@RequestBody @Valid final TokenRequest tokenRequest) {
        final TokenResponseDto tokenResponseDto =
                authService.createTokenWithKakaoOauth(tokenRequest.toServiceRequest());
        return ResponseEntity.ok(tokenResponseDto);
    }

    @PostMapping("/oauth/google")
    public ResponseEntity<TokenResponseDto> googleLogin(@RequestBody @Valid final TokenRequest tokenRequest) {
        final TokenResponseDto tokenResponseDto =
                authService.createTokenWithGoogleOauth(tokenRequest.toServiceRequest());
        return ResponseEntity.ok(tokenResponseDto);
    }

    @PostMapping("/renewal-token")
    public ResponseEntity<AccessTokenDto> renewalToken(@RequestBody @Valid final RefreshTokenDto renewalRequest) {
        final AccessTokenDto accessTokenDto = authService.renewalToken(renewalRequest.getRefreshToken());
        return ResponseEntity.ok(accessTokenDto);
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(@RequestBody @Valid final RefreshTokenDto refreshTokenDto) {
        authService.logout(refreshTokenDto.getRefreshToken());
        return ResponseEntity.noContent().build();
    }
}
