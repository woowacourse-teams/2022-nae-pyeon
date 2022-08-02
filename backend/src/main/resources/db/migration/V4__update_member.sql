ALTER TABLE member ADD COLUMN platform varchar(255) not null;
ALTER TABLE member ADD COLUMN platform_id varchar(255) not null;
ALTER TABLE member modify COLUMN username varchar(255) not null;
ALTER TABLE member DROP COLUMN password;