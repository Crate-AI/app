ALTER TABLE public.tracks
ADD CONSTRAINT tracks_id_unique UNIQUE (id);

-- Playlists table
Create table playlists (
  id UUID PRIMARY KEY default gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  title TEXT NOT NULL,
  description TEXT,
  cover_image_url TEXT,
  created_at TIMESTAMPtz DEFAULT NOW(),
  updated_at TIMESTAMPtz DEFAULT NOW()
);

-- Playlist tracks junction table
create table playlist_tracks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  playlist_id UUID REFERENCES playlists(id) ON DELETE CASCADE,
  track_id UUID REFERENCES tracks(id),
  position INTEGER NOT NULL,
  created_at TIMESTAMPtz DEFAULT NOW(),
  UNIQUE(playlist_id, track_id)
)