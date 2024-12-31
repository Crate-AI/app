import { createClient as createRedisClient } from 'npm:redis@^4.5';
import { createClient as createSupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';

const supabase = createSupabaseClient(
  Deno.env.get('CRATE_SUPABASE_URL')!,
  Deno.env.get('CRATE_SUPABASE_SERVICE_ROLE_KEY')!,
);

const AUTHENTICATED_RATE_LIMIT = 60; // Max requests per minute
const BATCH_SIZE = AUTHENTICATED_RATE_LIMIT; // Process up to rate limit per run
const YOUTUBE_API_KEY = Deno.env.get('YOUTUBE_API_KEY');
const DiscogsPAT = Deno.env.get('DISCOGS_CONSUMER_KEY');

interface ReleaseRecord {
  discogs_release_id: string;
  basic_release_data: any;
  discogs_release_data: any;
  uploaded_at: string;
}

// TODO: use redis to store rate limit data
async function createRedisConnection() {
  const redisUrlStr =
    'redis://redis-15393.c14.us-east-1-3.ec2.redns.redis-cloud.com:15393';
  const RedisPassword = 'OBtVWne76brrYWYNQJf3p0mw7CRvoMZu';

  const redisClient = createRedisClient({
    url: redisUrlStr,
    password: RedisPassword,
  });

  await redisClient.connect();
  return redisClient;
}

async function fetchReleaseFromDiscogs(releaseId: string) {
  const discogsUrl = `https://api.discogs.com/releases/${releaseId}`;
  const response = await fetch(discogsUrl, {
    headers: {
      Authorization: `Discogs token=${DiscogsPAT}`,
      'User-Agent': 'CrateApp/1.0 +https://crate.ai',
      Accept: 'application/json',
    },
  });

  // TODO: do something with rate limit headers
  const rateLimitUsed = response.headers.get('X-Discogs-Ratelimit-Used');
  const rateLimitRemaining = response.headers.get(
    'X-Discogs-Ratelimit-Remaining',
  );
  const rateLimitTotal = response.headers.get('X-Discogs-Ratelimit');

  if (!response.ok) {
    throw new Error(`Discogs API error: ${response.status}`);
  }

  return response.json();
}

async function getTrackYoutubeId(track, release) {
  try {
    const matchingVideo = release.videos?.find(
      (video) =>
        video.title.toLowerCase() === track.title.toLowerCase() ||
        video.title.toLowerCase().includes(track.title.toLowerCase()),
    );

    if (matchingVideo?.uri) {
      const videoId = new URL(matchingVideo.uri).searchParams.get('v');
      if (videoId) return videoId;
    }
    const query = `${track.title} ${release.artists[0]?.name || ''}`;
    const youtubeUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=1&q=${encodeURIComponent(query)}&key=${YOUTUBE_API_KEY}`;

    const response = await fetch(youtubeUrl);
    const youtubeData = await response.json();

    return Object.keys(youtubeData).length === 0
      ? null
      : (youtubeData.items?.[0]?.id?.videoId ?? null);
  } catch {
    return null;
  }
}

async function processReleaseTracks(release: any) {
  return Promise.all(
    release.tracklist.map(async (track: any) => {
      const trackInfo = {
        discogs_release_id: release.id.toString(),
        title: track.title,
        position: track.position,
        extra_artists: track.extraartists
          ?.map((artist: any) => artist.name)
          .join(', '),
        artist: release.artists.map((artist: any) => artist.name).join(', '),
        duration: track.duration,
        bpm: Math.floor(Math.random() * (140 - 115) + 115),
      };

      const videoId = await getTrackYoutubeId(track, release);
      return {
        ...trackInfo,
        youtube_video_id: videoId,
      };
    }),
  );
}

async function processRelease(release: ReleaseRecord) {
  try {
    const discogsData = await fetchReleaseFromDiscogs(
      release.discogs_release_id,
    );
    const tracks = await processReleaseTracks(discogsData);

    // Update release data
    const { error: releaseError } = await supabase
      .from('discogs_releases')
      .update({
        discogs_release_id: release.discogs_release_id,
        basic_release_data: release.basic_release_data,
        discogs_release_data: discogsData,
      })
      .eq('discogs_release_id', release.discogs_release_id);

    if (releaseError) throw releaseError;

    // Update tracks
    const { error: tracksError } = await supabase
      .from('tracks')
      .upsert(tracks)
      .select();

    if (tracksError) throw tracksError;

    return true;
  } catch (error) {
    console.error(
      `Failed to process release ${release.discogs_release_id}:`,
      error,
    );
    return false;
  }
}

async function processBatch() {
  const summary = {
    processedCount: 0,
    errors: [],
    remainingCount: 0,
  };

  // Get unprocessed releases ordered by creation date (FIFO)
  const { data: pendingReleases, error } = await supabase
    .from('discogs_releases')
    .select('*')
    .is('discogs_release_data', null)
    .order('uploaded_at', { ascending: true })
    .limit(BATCH_SIZE);

  if (error) throw error;
  if (!pendingReleases?.length) {
    return summary;
  }

  // Get count of remaining releases after this batch
  const { count: totalPending, error: countError } = await supabase
    .from('discogs_releases')
    .select('*', { count: 'exact', head: true })
    .is('discogs_release_data', null);

  if (countError) throw countError;
  summary.remainingCount = (totalPending || 0) - pendingReleases.length;

  // Get the current rate limit count once before processing
  const remainingSlots = AUTHENTICATED_RATE_LIMIT;

  // Only take as many releases as we have rate limit slots for
  const releasesToProcess = pendingReleases.slice(0, remainingSlots);

  await Promise.all(
    releasesToProcess.map((release) => {
      try {
        processRelease(release);
      } catch (error) {
        summary.errors.push(
          `Failed to process release ${release.discogs_release_id}: ${error.message}`,
        );
      }
    }),
  );

  summary.processedCount = pendingReleases.length - summary.errors.length;

  return summary;
}

// Edge function handler
Deno.serve(async (req) => {
  try {
    const summary = await processBatch();

    return new Response(
      JSON.stringify({
        success: true,
        summary: {
          processed: summary.processedCount,
          remaining: summary.remainingCount,
          errors: summary.errors,
        },
      }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
      },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 500,
      },
    );
  }
});
