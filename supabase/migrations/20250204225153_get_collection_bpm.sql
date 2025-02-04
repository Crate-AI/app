DROP FUNCTION IF EXISTS fetch_discogs_releases_and_tracks (uuid);

CREATE VIEW releases_and_tracks AS
SELECT
    t.*,
    ta.bpm
FROM
    public.user_releases ur
    JOIN public.tracks t ON ur.discogs_release_id = t.discogs_release_id
    LEFT JOIN public.track_analysis ta ON t.id = ta.track_id;

CREATE OR REPLACE FUNCTION fetch_discogs_releases_and_tracks (user_id uuid)
    RETURNS SETOF releases_and_tracks
    AS $$
BEGIN
    RETURN QUERY
    SELECT
        *
    FROM
        releases_and_tracks
    WHERE
        user_id = fetch_discogs_releases_and_tracks.user_id;
END;
$$
LANGUAGE plpgsql
SECURITY INVOKER;
