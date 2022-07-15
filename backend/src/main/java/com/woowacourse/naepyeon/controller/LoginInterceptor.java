package com.woowacourse.naepyeon.controller;

import com.woowacourse.naepyeon.exception.TokenInvalidExpiredException;
import com.woowacourse.naepyeon.exception.TokenInvalidFormException;
import com.woowacourse.naepyeon.support.AuthorizationExtractor;
import com.woowacourse.naepyeon.support.JwtTokenProvider;
import java.util.Objects;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.web.servlet.HandlerInterceptor;

public class LoginInterceptor implements HandlerInterceptor {

    private final JwtTokenProvider jwtTokenProvider;

    public LoginInterceptor(final JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    public boolean preHandle(final HttpServletRequest request, final HttpServletResponse response,
                             final Object handler) {
        if (request.getMethod().equals("OPTIONS")) {
            return true;
        }
        final String token = AuthorizationExtractor.extract(request);
        validateNotToken(token);
        validateAvailableToken(token);
        return true;
    }

    private void validateNotToken(final String token) {
        if (Objects.isNull(token)) {
            throw new TokenInvalidFormException();
        }
    }

    private void validateAvailableToken(final String token) {
        if (jwtTokenProvider.checkExpiredToken(token)) {
            throw new TokenInvalidExpiredException();
        }
    }
}
