CREATE OR REPLACE FUNCTION fetch_discogs_releases_and_tracks (user_id uuid)
    RETURNS SETOF public.tracks
    AS $$
BEGIN
    RETURN QUERY
    SELECT
        t.*
    FROM
        public.user_releases ur
        JOIN public.tracks t ON ur.discogs_release_id = t.discogs_release_id
    WHERE
        ur.user_id = fetch_discogs_releases_and_tracks.user_id;
END;
$$
LANGUAGE plpgsql
SECURITY INVOKER;
