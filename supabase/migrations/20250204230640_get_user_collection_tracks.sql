DROP FUNCTION IF EXISTS fetch_discogs_releases_and_tracks (uuid);

DROP VIEW IF EXISTS releases_and_tracks;

CREATE VIEW user_releases_and_tracks AS
SELECT
    ur.user_id,
    t.*,
    ta.bpm
FROM
    public.user_releases ur
    JOIN public.tracks t ON ur.discogs_release_id = t.discogs_release_id
    LEFT JOIN public.track_analysis ta ON t.id = ta.track_id;

CREATE OR REPLACE FUNCTION fetch_discogs_releases_and_tracks (user_id uuid)
    RETURNS SETOF user_releases_and_tracks
    AS $$
BEGIN
    RETURN QUERY
    SELECT
        *
    FROM
        user_releases_and_tracks rt
    WHERE
        rt.user_id = fetch_discogs_releases_and_tracks.user_id;
END;
$$
LANGUAGE plpgsql
SECURITY INVOKER;
