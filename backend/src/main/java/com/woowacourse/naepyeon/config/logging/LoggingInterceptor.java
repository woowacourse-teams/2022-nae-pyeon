package com.woowacourse.naepyeon.config.logging;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.HandlerInterceptor;

@Slf4j
@Component
@RequiredArgsConstructor
public class LoggingInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(final HttpServletRequest request, final HttpServletResponse response, final Object handler)
            throws Exception {
        final CustomCachingRequestWrapper cachingRequest;
        try {
            cachingRequest = (CustomCachingRequestWrapper) request;
        } catch (final ClassCastException e) {
            log.info("로깅 필터가 동작했는지 확인해주세요.");
            return true;
        }

        log.info(
                LogForm.SUCCESS_REQUEST_FORM,
                request.getMethod(),
                request.getRequestURI(),
                StringUtils.hasText(request.getHeader(HttpHeaders.AUTHORIZATION)),
                new String(cachingRequest.getInputStream().readAllBytes())
        );

        return true;
    }
}
