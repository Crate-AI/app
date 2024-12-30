ALTER TABLE public.tracks
    DROP CONSTRAINT tracks_pkey;

ALTER TABLE public.tracks
    ADD CONSTRAINT tracks_pkey PRIMARY KEY (discogs_release_id, position);
