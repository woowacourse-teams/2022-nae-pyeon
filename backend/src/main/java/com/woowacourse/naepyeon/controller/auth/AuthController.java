package com.woowacourse.naepyeon.controller.auth;

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
@RequestMapping("/api/v1/login")
public class AuthController {

    private final AuthService authService;

    @PostMapping
    public ResponseEntity<TokenResponseDto> login(@RequestBody @Valid final TokenRequest tokenRequest) {
        final TokenResponseDto tokenResponseDto = authService.createToken(tokenRequest.toServiceRequest());
        return ResponseEntity.ok(tokenResponseDto);
    }
}
