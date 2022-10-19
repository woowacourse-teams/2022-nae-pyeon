package com.woowacourse.naepyeon.config.logging.trace.aspect;

import com.woowacourse.naepyeon.config.logging.trace.LoggingTracer;
import lombok.RequiredArgsConstructor;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

@Aspect
@Component
@RequiredArgsConstructor
public class LogTraceAspect {

    private final LoggingTracer loggingTracer;

    @Pointcut("execution(public * com.woowacourse.naepyeon..*(..)) "
            + "&& !@annotation(com.woowacourse.naepyeon.config.logging.trace.annotation.NoTracing) "
            + "&& !execution(public * com.woowacourse.naepyeon.config.logging..*(..))")
    private void allComponents() {
    }

    @Around("allComponents()")
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
}
