package com.woowacourse.naepyeon.config.logging;

public class LoggingStatus {

    private final String taskId;
    private final long startTimeMillis;
    private int depthLevel = 0;

    public LoggingStatus(final String taskId, final long startTimeMillis) {
        this.taskId = taskId;
        this.startTimeMillis = startTimeMillis;
    }

    public void enterDepth() {
        depthLevel++;
    }

    public void comeOutDepth() {
        depthLevel--;
    }

    public boolean isEndDepth() {
        return depthLevel == 0;
    }

    public String getTaskId() {
        return taskId;
    }

    public long getStartTimeMillis() {
        return startTimeMillis;
    }

    public int getDepthLevel() {
        return depthLevel;
    }
}
