ALTER TABLE tracks
    ADD COLUMN title text NOT NULL,
    ADD COLUMN artist text NOT NULL,
    ADD COLUMN extra_artists text,
    ADD COLUMN "position" text NOT NULL,
    ADD COLUMN duration text NOT NULL;
