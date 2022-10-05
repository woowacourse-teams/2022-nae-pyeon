CREATE TABLE if not exists shedlock (
                          name VARCHAR(64),
                          lock_until TIMESTAMP(3) NULL,
                          locked_at TIMESTAMP(3) NULL,
                          locked_by VARCHAR(255),
                          PRIMARY KEY (name)
) engine=InnoDB default charset utf8mb4;
