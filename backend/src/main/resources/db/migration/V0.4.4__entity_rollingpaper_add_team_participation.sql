ALTER TABLE rollingpaper
    ADD team_participation_id bigint;

ALTER TABLE team_participation
    MODIFY COLUMN member_id bigint;

ALTER TABLE team_participation
    MODIFY COLUMN team_id bigint;
