CREATE TABLE public.user_discogs_profile (
    username text PRIMARY KEY,
    user_id uuid REFERENCES auth.users (id)
);

ALTER TABLE public.user_discogs_profile ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users can upsert" ON public.user_discogs_profile
    FOR ALL TO authenticated
        USING (user_id = auth.uid ());
