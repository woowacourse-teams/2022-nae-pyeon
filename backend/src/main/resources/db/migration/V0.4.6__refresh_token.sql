CREATE TABLE refresh_token (
                             refresh_token_id bigint not null auto_increment,
                             value varchar(255) unique not null,
                             member_id bigint not null,
                             expired_time datetime not null,
                             primary key (refresh_token_id)
) engine=InnoDB default charset utf8mb4;

alter table refresh_token
    add constraint fk_refresh_token_member_id
        foreign key (member_id)
            references member (member_id) on delete cascade;

CREATE INDEX refresh_token_member_id ON refresh_token (member_id);
