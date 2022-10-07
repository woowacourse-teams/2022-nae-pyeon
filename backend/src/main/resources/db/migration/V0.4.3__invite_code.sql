CREATE TABLE invite_code (
                             invite_code_id bigint not null auto_increment,
                             code varchar(255) unique not null,
                             team_id bigint not null,
                             expired datetime not null,
                             primary key (invite_code_id)
) engine=InnoDB default charset utf8mb4;

alter table invite_code
    add constraint fk_invite_code_team_id
        foreign key (team_id)
            references team (team_id) on delete cascade;
