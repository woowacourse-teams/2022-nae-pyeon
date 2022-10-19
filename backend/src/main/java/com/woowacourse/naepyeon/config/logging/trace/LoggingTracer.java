package com.woowacourse.naepyeon.config.logging.trace;

import com.woowacourse.naepyeon.support.SecureRandomStringUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class LoggingTracer {

    private static final String TRACE_DEPTH_SPACE = "--";
    private final ThreadLocal<TraceStatus> statusContainer = new ThreadLocal<>();

    public void begin(final String message, final Object[] args) {
        syncTrace();
        final TraceStatus status = statusContainer.get();
        log.info("[{}] {}--> {} args={}", status.getTraceId(), getDepthSpace(status), message, args);
    }

    private void syncTrace() {
        final TraceStatus status = statusContainer.get();
        if (status == null) {
            final String traceId = SecureRandomStringUtils.createRandomAlphanumericSecure(10);
            final long startTimeMillis = System.currentTimeMillis();
            final TraceStatus firstTraceStatus = new TraceStatus(traceId, startTimeMillis);
            statusContainer.set(firstTraceStatus);
            return;
        }
        status.enterDepth();
    }

    public void end(final String message) {
        final TraceStatus status = statusContainer.get();
        final long stopTimeMillis = System.currentTimeMillis();
        final long resultTimeMillis = stopTimeMillis - status.getStartTimeMillis();

        log.info(
                "[{}] {}<-- {} time={}ms",
                status.getTraceId(),
                getDepthSpace(status),
                message,
                resultTimeMillis
        );

        releaseTrace();
    }

    public void exception(final String message, final Exception e) {
        final TraceStatus status = statusContainer.get();
        final long stopTimeMillis = System.currentTimeMillis();
        final long resultTimeMillis = stopTimeMillis - status.getStartTimeMillis();

        log.info(
                "[{}] <X-{} {} time={}ms ex={}",
                status.getTraceId(),
                getDepthSpace(status),
                message,
                resultTimeMillis,
                e.toString()
        );
        releaseTrace();
    }

    private String getDepthSpace(final TraceStatus status) {
        return TRACE_DEPTH_SPACE.repeat(status.getDepthLevel());
    }

    private void releaseTrace() {
        final TraceStatus status = statusContainer.get();
        if (status.isFirstTrace()) {
            statusContainer.remove();
        } else {
            status.comeOutDepth();
        }
    }
}
