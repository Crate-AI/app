ALTER TABLE discogs_releases
    ADD COLUMN uploaded_at timestamptz DEFAULT now();

-- create a cron job to fetch discogs data using pg_cron
-- taken from https://supabase.com/docs/guides/functions/schedule-functions
SELECT
    cron.schedule ('check-releases-every-minute', '* * * * *', -- every minute
        $$
        SELECT
            net.http_post (url := 'https://olxynjdxmipslgseupxc.supabase.co/functions/v1/fetch_tracks', headers := '{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9seHluamR4bWlwc2xnc2V1cHhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM3MjM1NjcsImV4cCI6MjA0OTI5OTU2N30.NLdZXkEphv1SQl8AvWtulgHxKSNHgt-IsByE2r_w0CE"}'::jsonb) AS request_id;

$$);
