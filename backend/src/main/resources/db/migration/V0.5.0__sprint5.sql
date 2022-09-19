CREATE INDEX member_email_index ON member (email);
CREATE INDEX member_oauth_index ON member (platform, platform_id);
CREATE INDEX message_rollingpaper_index ON message (rollingpaper_id);
CREATE INDEX rollingpaper_team_index ON rollingpaper (team_id);

CREATE INDEX team_participatiON_team_index ON team_participation (team_id);
CREATE INDEX team_participatiON_member_index ON team_participation (member_id);
