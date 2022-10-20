package com.woowacourse.naepyeon.config;

import com.woowacourse.naepyeon.controller.auth.AuthenticationPrincipalArgumentResolver;
import com.woowacourse.naepyeon.controller.auth.LoginInterceptor;
import com.woowacourse.naepyeon.support.JwtTokenProvider;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@RequiredArgsConstructor
public class AuthenticationPrincipalConfig implements WebMvcConfigurer {

    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public void addInterceptors(final InterceptorRegistry registry) {
        registry.addInterceptor(new LoginInterceptor(jwtTokenProvider))
                .addPathPatterns("/api/v1/**")
                .excludePathPatterns("/api/v1/oauth/*")
                .excludePathPatterns("/api/v1/members")
                .excludePathPatterns("/api/v1/renewal-token")
                .excludePathPatterns("/api/v1/logout")
                .excludePathPatterns("/api/v1/subscribe");
    }

    @Override
    public void addArgumentResolvers(final List<HandlerMethodArgumentResolver> argumentResolvers) {
        argumentResolvers.add(new AuthenticationPrincipalArgumentResolver(jwtTokenProvider));
    }
}
