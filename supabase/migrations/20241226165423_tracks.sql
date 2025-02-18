CREATE TABLE tracks (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid (),
    created_at timestamptz DEFAULT now(),
    discogs_release_id text NOT NULL,
    youtube_video_id text,
    bpm integer
);

ALTER TABLE tracks ENABLE ROW LEVEL SECURITY;

CREATE TABLE discogs_releases (
    discogs_release_id text PRIMARY KEY,
    discogs_release_data jsonb NOT NULL
);

ALTER TABLE discogs_releases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow users to select their own releases" ON public.discogs_releases
    FOR SELECT TO authenticated
        USING (TRUE);

CREATE POLICY "Allow users to insert their own releases" ON public.discogs_releases
    FOR INSERT TO authenticated
        WITH CHECK (TRUE);

CREATE POLICY "Allow users to update their own releases" ON public.discogs_releases
    FOR UPDATE TO authenticated
        WITH CHECK (TRUE);

CREATE POLICY "Allow users to select their own tracks" ON public.tracks
    FOR SELECT TO authenticated
        USING (TRUE);

CREATE POLICY "Allow users to insert their own tracks" ON public.tracks
    FOR INSERT TO authenticated
        WITH CHECK (TRUE);

CREATE POLICY "Allow users to update their own tracks" ON public.tracks
    FOR UPDATE TO authenticated
        USING (TRUE)
        WITH CHECK (TRUE);
