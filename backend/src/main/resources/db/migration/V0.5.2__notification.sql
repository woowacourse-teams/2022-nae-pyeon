CREATE TABLE notification (
                               notification_id bigint not null auto_increment,
                               member_id bigint not null,
                               content_type varchar(40) not null,
                               team_name varchar(20) not null,
                               rollingpaper_title varchar(20) not null,
                               url varchar(255) not null,
                               is_read tinyint(1) not null,
                               created_at datetime not null,
                               last_modified_at datetime not null,
                               primary key (notification_id)
) engine=InnoDB default charset utf8mb4;


CREATE INDEX notification_read_index ON notification (is_read);
