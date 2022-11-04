package com.woowacourse.naepyeon.config.logging.aspect;

import com.woowacourse.naepyeon.config.logging.LoggingStatusManager;
import com.woowacourse.naepyeon.config.logging.LoggingTracer;
import javax.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Slf4j
@Aspect
@Component
@RequiredArgsConstructor
public class LoggingAspect {

    private final LoggingTracer loggingTracer;
    private final LoggingStatusManager loggingStatusManager;

    @Pointcut("execution(public * com.woowacourse.naepyeon..*(..)) "
            + "&& !execution(public * com.woowacourse.naepyeon.config.logging..*(..))")
    private void allComponents() {
    }

    @Pointcut("@annotation(com.woowacourse.naepyeon.config.logging.annotation.NoLogging)")
    private void noLogging() {
    }

    @Pointcut("execution(public * com.woowacourse.naepyeon.controller..*Controller.*(..))")
    private void allController() {
    }

    @Around("allComponents() && !noLogging()")
    public Object doLogTrace(final ProceedingJoinPoint joinPoint) throws Throwable {
        final String message = joinPoint.getSignature().toShortString();
        final Object[] args = joinPoint.getArgs();
        try {
            loggingTracer.begin(message, args);
            final Object result = joinPoint.proceed();
            loggingTracer.end(message);
            return result;
        } catch (final Exception e) {
            loggingTracer.exception(message, e);
            throw e;
        }
    }

    @Around("allController() && !noLogging()")
    public Object doLogRequest(final ProceedingJoinPoint joinPoint) throws Throwable {
        loggingStatusManager.syncStatus();
        final String taskId = loggingStatusManager.getTaskId();
        final HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes())
                .getRequest();
        final String method = request.getMethod();
        final String requestURI = request.getRequestURI();
        final Object[] args = joinPoint.getArgs();
        log.info("[{}] {} {} args={}", taskId, method, requestURI, args);

        try {
            return joinPoint.proceed();
        } finally {
            loggingStatusManager.release();
        }
    }
}
