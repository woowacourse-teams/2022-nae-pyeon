package com.woowacourse.naepyeon.controller.auth;

import com.woowacourse.naepyeon.controller.dto.NaverTokenRequest;
import com.woowacourse.naepyeon.controller.dto.TokenRequest;
import com.woowacourse.naepyeon.service.AuthService;
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
@RequestMapping("/api/v1/oauth")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/kakao")
    public ResponseEntity<TokenResponseDto> kakaoLogin(@RequestBody @Valid final TokenRequest tokenRequest) {
        final TokenResponseDto tokenResponseDto =
                authService.createTokenWithKakaoOauth(tokenRequest.toServiceRequest());
        return ResponseEntity.ok(tokenResponseDto);
    }

    @PostMapping("/naver")
    public ResponseEntity<TokenResponseDto> naverLogin(@RequestBody @Valid final NaverTokenRequest naverTokenRequest) {
        final TokenResponseDto tokenResponseDto =
                authService.createTokenWithNaverOauth(
                        naverTokenRequest.getAuthorizationCode(),
                        naverTokenRequest.getRedirectUri(),
                        naverTokenRequest.getState()
                );
        return ResponseEntity.ok(tokenResponseDto);
    }
}
