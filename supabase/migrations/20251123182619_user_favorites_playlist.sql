DROP TABLE user_favorites;

ALTER TABLE playlists
    ADD COLUMN is_favorites boolean DEFAULT FALSE;
