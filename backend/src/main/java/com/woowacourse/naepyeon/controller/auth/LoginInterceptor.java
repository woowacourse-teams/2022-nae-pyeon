package com.woowacourse.naepyeon.controller.auth;

import com.woowacourse.naepyeon.support.AuthorizationExtractor;
import com.woowacourse.naepyeon.support.JwtTokenProvider;
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
        jwtTokenProvider.validateAbleToken(token);
        return true;
    }
}
