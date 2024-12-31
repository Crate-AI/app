import { createClient as createRedisClient } from 'npm:redis@^4.5';
import { createClient as createSupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';

const supabase = createSupabaseClient(
  Deno.env.get('CRATE_SUPABASE_URL')!,
  Deno.env.get('CRATE_SUPABASE_SERVICE_ROLE_KEY')!,
);

const AUTHENTICATED_RATE_LIMIT = 60; // Max requests allowed for authenticated requests
const TIME_FRAME = 60 * 1000; // Time frame in milliseconds (1 minute)
const RETRY_TIMEOUT = 5000; // Timeout before retrying in milliseconds
const YOUTUBE_API_KEY = Deno.env.get('YOUTUBE_API_KEY');

export async function rateLimitedRequest(url: string, options: any) {
  const redisUrlStr =
    'redis://redis-15393.c14.us-east-1-3.ec2.redns.redis-cloud.com:15393';
  const RedisPassword = 'OBtVWne76brrYWYNQJf3p0mw7CRvoMZu';

  // Create Redis client
  const redisClient = createRedisClient({
    url: redisUrlStr,
    password: RedisPassword,
  });

  try {
    await redisClient.connect();

    const key = 'discogs_rate_limit_key';
    const currentTime = Date.now();

    // Get the current state from Redis
    const state = await redisClient.hGetAll(key);
    const count = parseInt(state.count || '0');
    const firstRequestTime = parseInt(
      state.firstRequestTime || currentTime.toString(),
    );

    // Check if the time frame has expired
    if (currentTime - firstRequestTime < TIME_FRAME) {
      if (count >= AUTHENTICATED_RATE_LIMIT) {
        console.log('Rate limit exceeded, waiting to retry...');
        await redisClient.quit();
        await new Promise((resolve) => setTimeout(resolve, RETRY_TIMEOUT));
        return rateLimitedRequest(url, options); // Retry the request
      }
    } else {
      // Reset the count and timestamp if the time frame has expired
      await redisClient.hSet(key, {
        count: '0',
        firstRequestTime: currentTime.toString(),
      });
    }

    // Increment the request count
    await redisClient.hIncrBy(key, 'count', 1);

    // Make the request to the Discogs API
    try {
      const response = await fetch(url, options);

      // Log rate limit headers
      const rateLimitUsed = response.headers.get('X-Discogs-Ratelimit-Used');
      const rateLimitRemaining = response.headers.get(
        'X-Discogs-Ratelimit-Remaining',
      );
      const rateLimitTotal = response.headers.get('X-Discogs-Ratelimit');

      console.log(
        `Requests Used: ${rateLimitUsed}, Remaining: ${rateLimitRemaining}, Total: ${rateLimitTotal}`,
      );

      await redisClient.quit();
      return response;
    } catch (error) {
      console.error('Request failed:', error);
      await redisClient.quit();
      throw error;
    }
  } catch (error) {
    console.error('Redis operation failed:', error);
    await redisClient.quit();
    throw error;
  }
}

// Server implementation
const DiscogsPAT = Deno.env.get('DISCOGS_CONSUMER_KEY');

Deno.serve(async (req) => {
  const payload: WebhookPayload = await req.json();
  const { discogs_release_id: releaseId, basic_release_data } = payload.record;
  const discogsUrl = `https://api.discogs.com/releases/${releaseId}`;

  const response = await rateLimitedRequest(discogsUrl, {
    headers: {
      Authorization: `Discogs token=${DiscogsPAT}`,
      'User-Agent': 'CrateApp/1.0 +https://crate.ai',
      Accept: 'application/json',
    },
  });

  if (!response?.ok) {
    throw new Error(`Discogs API error: ${response?.status}`);
  }

  const release = await response.json();
  const data = { release };

  // Fetch the videoId for each track in the release, then flatten into an
  // array of tracks for the entire collection
  const releaseTracks = (
    await Promise.all(
      release.tracklist.map(async (track) => {
        const trackInfo = {
          discogs_release_id: release.id.toString(),
          title: track.title,
          position: track.position,
          extra_artists: track.extraartists
            ?.map((artist) => artist.name)
            .join(', '),
          artist: release.artists.map((artist) => artist.name).join(', '),
          duration: track.duration,
          bpm: Math.floor(Math.random() * (140 - 115) + 115),
        };

        try {
          const query = `${track.title} ${release.artists[0]?.name || ''}`;
          const youtubeUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=1&q=${encodeURIComponent(query)}&key=${YOUTUBE_API_KEY}`;

          const response = await fetch(youtubeUrl);
          const youtubeData = await response.json();

          if (!youtubeData.items?.length) {
            console.error('No video found for:', query);
          }

          const youtube_video_id = youtubeData.items[0].id.videoId;
          return {
            ...trackInfo,
            youtube_video_id,
          };
        } catch {
          return {
            ...trackInfo,
            youtube_video_id: null,
          };
        }
      }),
    )
  ).flat();

  const { error: newReleaseError } = await supabase
    .from('discogs_releases')
    .update({
      discogs_release_id: releaseId,
      basic_release_data,
      discogs_release_data: release,
    });

  if (newReleaseError) {
    throw newReleaseError;
  }

  const { error: newTrackError } = await supabase
    .from('tracks')
    .upsert(releaseTracks)
    .select();

  if (newTrackError) {
    throw newTrackError;
  }

  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  });
});
