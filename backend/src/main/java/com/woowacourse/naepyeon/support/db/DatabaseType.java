package com.woowacourse.naepyeon.support.db;

public enum DatabaseType {

    SOURCE("SOURCE"),
    REPLICA("REPLICA");

    private final String type;

    DatabaseType(final String type) {
        this.type = type;
    }

    public String getType() {
        return type;
    }
}
