CREATE TABLE user_releases (
    user_id uuid REFERENCES auth.users (id),
    discogs_release_id text REFERENCES discogs_releases (discogs_release_id),
    PRIMARY KEY (user_id, discogs_release_id)
);
