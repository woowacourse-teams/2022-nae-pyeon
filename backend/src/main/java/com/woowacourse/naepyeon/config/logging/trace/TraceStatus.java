package com.woowacourse.naepyeon.config.logging.trace;

public class TraceStatus {

    private final String traceId;
    private final long startTimeMillis;
    private int depthLevel = 0;

    public TraceStatus(final String traceId, final long startTimeMillis) {
        this.traceId = traceId;
        this.startTimeMillis = startTimeMillis;
    }

    public void enterDepth() {
        depthLevel++;
    }

    public void comeOutDepth() {
        depthLevel--;
    }

    public boolean isFirstTrace() {
        return depthLevel == 0;
    }

    public String getTraceId() {
        return traceId;
    }

    public long getStartTimeMillis() {
        return startTimeMillis;
    }

    public int getDepthLevel() {
        return depthLevel;
    }
}
