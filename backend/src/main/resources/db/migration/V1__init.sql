drop table if exists message;
drop table if exists rollingpaper;
drop table if exists team;
drop table if exists member;
drop table if exists team_member;

CREATE TABLE member
(
    member_id bigint       not null auto_increment,
    email     varchar(255) not null,
    password  varchar(255) not null,
    username  varchar(20)  not null,
    primary key (member_id)
) engine=InnoDB
  default charset utf8mb4;

CREATE TABLE message
(
    message_id      bigint       not null auto_increment,
    content         varchar(500) not null,
    member_id       bigint,
    rollingpaper_id bigint,
    primary key (message_id)
) engine=InnoDB
  default charset utf8mb4;

CREATE TABLE rollingpaper
(
    rollingpaper_id bigint      not null auto_increment,
    title           varchar(20) not null,
    member_id       bigint,
    team_id         bigint      not null,
    primary key (rollingpaper_id)
) engine=InnoDB
  default charset utf8mb4;

CREATE TABLE team
(
    team_id     bigint       not null auto_increment,
    color       varchar(15)  not null,
    description varchar(100) not null,
    emoji       varchar(255) not null,
    team_name   varchar(20)  not null,
    primary key (team_id)
) engine=InnoDB
  default charset utf8mb4;

CREATE TABLE team_member
(
    team_member_id bigint      not null auto_increment,
    nickname       varchar(20) not null,
    member_id      bigint,
    team_id        bigint,
    primary key (team_member_id)
) engine=InnoDB
  default charset utf8mb4;

alter table member
    add constraint uk_member_email unique (email);

alter table team
    add constraint uk_team_name unique (team_name);

alter table team_member
    add constraint uk_participate_duplicate unique (team_id, member_id);

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

alter table team_member
    add constraint fk_team_member_member_id
        foreign key (member_id)
            references member (member_id);

alter table team_member
    add constraint fk_team_member_team_id
        foreign key (team_id)
            references team (team_id);