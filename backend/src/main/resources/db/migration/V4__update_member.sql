ALTER TABLE member ADD COLUMN platform varchar(255);
ALTER TABLE member ADD COLUMN platform_id bigint;
ALTER TABLE member DROP COLUMN password;