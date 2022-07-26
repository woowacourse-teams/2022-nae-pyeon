insert into member (email, password, username)
values ('naepyeon2@gmail.com', '1234567aA!', 'naepyeon'),
       ('test1@gmail.com', '1234567aA!', 'test1'),
       ('test2@gmail.com', '1234567aA!', 'test2');


insert into team(color, description, emoji, team_name)
values ('#212121', '우테코 4기 크루원들 모임입니다.', '\uD83D\uDE00', '우테코 4기'),
       ('#452121', '열심히 놀고 먹는 모임입니다.', '\uD83D\uDE00', '술한잔');

insert into team_member (nickname, member_id, team_id)
values ('포비', 2, 1),
       ('테스트유저', 3, 1),
       ('애주가', 2, 2);

insert into rollingpaper (title, member_id, team_id)
values ('테스트유저 환영해', 3, 1),
       ('포비 감사합니다.', 2, 1);

insert into message (content, member_id, rollingpaper_id)
values ('환영합니다', 2, 1),
       ('생일 축하해!', 2, 1),
       ('감사합니다!', 3, 2),
       ('많은 가르침 받았습니다.', 3, 2);






