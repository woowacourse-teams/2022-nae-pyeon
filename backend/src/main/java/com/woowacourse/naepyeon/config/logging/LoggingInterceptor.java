package com.woowacourse.naepyeon.config.logging;

import com.fasterxml.jackson.databind.ObjectMapper;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.HandlerInterceptor;

@Slf4j
@Component
@RequiredArgsConstructor
public class LoggingInterceptor implements HandlerInterceptor {

    private final ObjectMapper objectMapper;

    @Override
    public boolean preHandle(final HttpServletRequest request, final HttpServletResponse response, final Object handler)
            throws Exception {
        final CustomCachingRequestWrapper cachingRequest = (CustomCachingRequestWrapper) request;

        log.info(
                LogForm.SUCCESS_REQUEST_FORM,
                request.getMethod(),
                request.getRequestURI(),
                StringUtils.hasText(request.getHeader(HttpHeaders.AUTHORIZATION)),
                objectMapper.readTree(cachingRequest.getInputStream())
        );

        return true;
    }
}
