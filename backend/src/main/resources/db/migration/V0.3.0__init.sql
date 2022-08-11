create table member (
                        member_id bigint not null auto_increment,
                        created_at datetime not null,
                        last_modified_at datetime not null,
                        email varchar(255) not null,
                        platform varchar(255) not null,
                        platform_id varchar(255) not null,
                        username varchar(255) not null,
                        primary key (member_id)
) engine=InnoDB default charset utf8mb4;
create table message (
                         message_id bigint not null auto_increment,
                         created_at datetime not null,
                         last_modified_at datetime not null,
                         color varchar(255),
                         content varchar(500) not null,
                         member_id bigint not null,
                         rollingpaper_id bigint not null,
                         primary key (message_id)
) engine=InnoDB default charset utf8mb4;
create table rollingpaper (
                              rollingpaper_id bigint not null auto_increment,
                              created_at datetime not null,
                              last_modified_at datetime not null,
                              title varchar(20) not null,
                              member_id bigint not null,
                              team_id bigint not null,
                              primary key (rollingpaper_id)
) engine=InnoDB default charset utf8mb4;
create table team (
                      team_id bigint not null auto_increment,
                      created_at datetime not null,
                      last_modified_at datetime not null,
                      color varchar(15) not null,
                      description varchar(100) not null,
                      emoji varchar(255) not null,
                      team_name varchar(20) not null,
                      primary key (team_id)
) engine=InnoDB default charset utf8mb4;
create table team_participation (
                                    team_participation_id bigint not null auto_increment,
                                    created_at datetime not null,
                                    last_modified_at datetime not null,
                                    nickname varchar(20) not null,
                                    member_id bigint not null,
                                    team_id bigint not null,
                                    primary key (team_participation_id)
) engine=InnoDB default charset utf8mb4;
alter table team
    add constraint uk_team_team_name unique (team_name);
alter table team_participation
    add constraint participate_duplicate unique (team_id, member_id);
alter table message
    add constraint fk_message_member_id
        foreign key (member_id)
            references member (member_id);
alter table message
    add constraint fk_message_rollingpaper_id
        foreign key (rollingpaper_id)
            references rollingpaper (rollingpaper_id);
alter table rollingpaper
    add constraint fk_rollingpaper_member_id
        foreign key (member_id)
            references member (member_id);
alter table rollingpaper
    add constraint fk_rollingpaper_team_id
        foreign key (team_id)
            references team (team_id);
alter table team_participation
    add constraint fk_team_participation_member_id
        foreign key (member_id)
            references member (member_id);
alter table team_participation
    add constraint fk_team_participation_team_id
        foreign key (team_id)
            references team (team_id);
