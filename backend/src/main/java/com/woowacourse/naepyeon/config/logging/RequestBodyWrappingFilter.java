package com.woowacourse.naepyeon.config.logging;

import java.io.IOException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
@RequiredArgsConstructor
public class RequestBodyWrappingFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(
            final HttpServletRequest request,
            final HttpServletResponse response,
            final FilterChain filterChain
    ) throws ServletException, IOException {
        final CustomCachingRequestWrapper wrappingRequest = new CustomCachingRequestWrapper(request);
        filterChain.doFilter(wrappingRequest, response);
    }
}
