package com.woowacourse.naepyeon.config;

import com.woowacourse.naepyeon.support.db.DatabaseType;
import com.woowacourse.naepyeon.support.db.RoutingDataSource;
import java.util.HashMap;
import javax.sql.DataSource;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.DependsOn;
import org.springframework.context.annotation.Primary;
import org.springframework.jdbc.datasource.LazyConnectionDataSourceProxy;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableTransactionManagement
@RequiredArgsConstructor
@ComponentScan(basePackages = {"com.woowacourse.naepyeon"})
public class DataSourceConfig {

    @Bean
    @ConfigurationProperties(prefix = "spring.datasource.source.hikari")
    public DataSource sourceDataSource() {
        return DataSourceBuilder.create()
                .build();
    }

    @Bean
    @ConfigurationProperties(prefix = "spring.datasource.replica.hikari")
    public DataSource replicaDataSource() {
        return DataSourceBuilder.create()
                .build();
    }

    @Bean
    public DataSource routingDataSource() {
        final RoutingDataSource routingDataSource = new RoutingDataSource();
        final HashMap<Object, Object> dataSources = new HashMap<>();

        dataSources.put(DatabaseType.SOURCE, sourceDataSource());
        dataSources.put(DatabaseType.REPLICA, replicaDataSource());

        routingDataSource.setDefaultTargetDataSource(sourceDataSource());
        routingDataSource.setTargetDataSources(dataSources);

        return routingDataSource;
    }

    @Primary
    @Bean
    @DependsOn({"sourceDataSource", "replicaDataSource", "routingDataSource"})
    public DataSource dataSource() {
        return new LazyConnectionDataSourceProxy(routingDataSource());
    }
}
