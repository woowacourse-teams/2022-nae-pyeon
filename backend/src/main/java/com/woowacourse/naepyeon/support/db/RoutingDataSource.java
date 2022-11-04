package com.woowacourse.naepyeon.support.db;

import static com.woowacourse.naepyeon.support.db.DatabaseType.REPLICA;
import static com.woowacourse.naepyeon.support.db.DatabaseType.SOURCE;

import org.springframework.jdbc.datasource.lookup.AbstractRoutingDataSource;
import org.springframework.transaction.support.TransactionSynchronizationManager;

public class RoutingDataSource extends AbstractRoutingDataSource {

    @Override
    protected Object determineCurrentLookupKey() {
        if (TransactionSynchronizationManager.isCurrentTransactionReadOnly()) {
            return REPLICA;
        }
        return SOURCE;
    }
}
