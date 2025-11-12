CREATE TABLE public.user_favorites (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid (),
    user_id uuid NOT NULL,
    track_id uuid,
    created_at timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT fk_user_favorites_user FOREIGN KEY (user_id) REFERENCES auth.users (id) ON DELETE CASCADE,
    CONSTRAINT fk_user_favorites_track FOREIGN KEY (track_id) REFERENCES public.tracks (id) ON DELETE SET NULL,
    CONSTRAINT uq_user_favorites_user_track UNIQUE (user_id, track_id)
);

CREATE INDEX IF NOT EXISTS idx_user_favorites_user_id ON public.user_favorites (user_id);

CREATE INDEX IF NOT EXISTS idx_user_favorites_track_id ON public.user_favorites (track_id);
