package com.woowacourse.naepyeon.acceptance.support;

import java.util.List;
import java.util.stream.Collectors;
import javax.persistence.EntityManager;
import javax.persistence.Table;
import javax.persistence.metamodel.Type;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class DatabaseCleaner {

    private static final String FOREIGN_KEY_RULE_UPDATE_FORMAT = "SET REFERENTIAL_INTEGRITY %s";
    private static final String TRUNCATE_FORMAT = "TRUNCATE TABLE %s";
    private static final String ID_RESET_FORMAT = "ALTER TABLE %s ALTER COLUMN %s_id RESTART WITH 1";

    private final EntityManager entityManager;
    private final List<String> tableNames;

    public DatabaseCleaner(final EntityManager entityManager) {
        this.entityManager = entityManager;
        this.tableNames = entityManager.getMetamodel()
                .getEntities()
                .stream()
                .map(Type::getJavaType)
                .map(javaType -> javaType.getAnnotation(Table.class))
                .map(Table::name)
                .collect(Collectors.toUnmodifiableList());
    }

    @Transactional
    public void execute() {
        entityManager.flush();
        entityManager.createNativeQuery(String.format(FOREIGN_KEY_RULE_UPDATE_FORMAT, "FALSE"))
                .executeUpdate();
        for (final String tableName : tableNames) {
            entityManager.createNativeQuery(String.format(TRUNCATE_FORMAT, tableName)).executeUpdate();
            entityManager.createNativeQuery(String.format(ID_RESET_FORMAT, tableName, tableName)).executeUpdate();
        }
        entityManager.createNativeQuery(String.format(FOREIGN_KEY_RULE_UPDATE_FORMAT, "TRUE"))
                .executeUpdate();
    }
}
