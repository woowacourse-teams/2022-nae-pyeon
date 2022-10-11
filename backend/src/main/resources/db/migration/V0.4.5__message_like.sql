ALTER TABLE message
    ADD likes bigint not null
        default 0;

CREATE TABLE message_like
(
    message_like_id bigint not null auto_increment,
    member_id       bigint not null,
    rollingpaper_id bigint not null,
    message_id      bigint not null,
    created_at datetime not null,
    last_modified_at datetime not null,
    primary key (message_like_id)
) engine=InnoDB default charset utf8mb4;