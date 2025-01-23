ALTER TABLE public.tracks
ADD CONSTRAINT unique_track_id UNIQUE (id);

CREATE TABLE track_analysis (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid (),
    track_id uuid REFERENCES tracks (id),
    analysis jsonb NOT NULL,
    created_at timestamptz DEFAULT now()
);
