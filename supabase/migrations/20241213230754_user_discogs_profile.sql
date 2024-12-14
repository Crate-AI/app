CREATE TABLE public.user_discogs_profile (
    username text PRIMARY KEY,
    resource_url text NOT NULL,
    consumer_name text NOT NULL,
    avatar_url text NOT NULL,
    email text
);

ALTER TABLE public.user_discogs_profile ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow users to view their own Discogs profile" ON public.user_discogs_profile
    FOR SELECT TO authenticated
        USING (email = (
            SELECT
                email
            FROM
                auth.users
            WHERE
                id = auth.uid ()));
