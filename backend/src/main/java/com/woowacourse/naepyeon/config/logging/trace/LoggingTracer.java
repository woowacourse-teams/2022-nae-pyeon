package com.woowacourse.naepyeon.config.logging.trace;

import com.woowacourse.naepyeon.config.logging.LoggingStatusManager;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Component
@Slf4j
@RequiredArgsConstructor
public class LoggingTracer {

    private static final String TRACE_DEPTH_SPACE = "--";
    private final LoggingStatusManager loggingStatusManager;

    public void begin(final String message, final Object[] args) {
        loggingStatusManager.syncStatus();
        if (log.isDebugEnabled()) {
            log.debug(
                    "[{}] {}--> {} args={}",
                    loggingStatusManager.getTaskId(),
                    getDepthSpace(loggingStatusManager.getDepthLevel()),
                    message,
                    args
            );
        }
    }

    public void end(final String message) {
        final long stopTimeMillis = System.currentTimeMillis();
        final long resultTimeMillis = stopTimeMillis - loggingStatusManager.getStartTimeMillis();

        if (log.isDebugEnabled()) {
            log.debug(
                    "[{}] {}<-- {} time={}ms",
                    loggingStatusManager.getTaskId(),
                    getDepthSpace(loggingStatusManager.getDepthLevel()),
                    message,
                    resultTimeMillis
            );
        }

        loggingStatusManager.release();
    }

    public void exception(final String message, final Exception e) {
        final long stopTimeMillis = System.currentTimeMillis();
        final long resultTimeMillis = stopTimeMillis - loggingStatusManager.getStartTimeMillis();

        if (log.isDebugEnabled()) {
            log.debug(
                    "[{}] <X-{} {} time={}ms ex={}",
                    loggingStatusManager.getTaskId(),
                    getDepthSpace(loggingStatusManager.getDepthLevel()),
                    message,
                    resultTimeMillis,
                    e.toString()
            );
        }
        loggingStatusManager.release();
    }

    private String getDepthSpace(final int depthLevel) {
        return TRACE_DEPTH_SPACE.repeat(depthLevel);
    }
}
