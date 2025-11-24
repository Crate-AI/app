import { Release, Track } from '@/types';

const baseUrl = import.meta.env.VITE_BASE_URL || 'http://localhost:3000';
export async function searchVideo(query: string): Promise<string | null> {
  try {
    const response = await fetch(
      `${baseUrl}/api/external/youtube/search?q=${encodeURIComponent(query)}`,
    );

    if (!response.ok) throw new Error('YouTube search failed');
    const data = await response.json();
    return data.videoId;
  } catch (err) {
    console.error('YouTube search failed:', err);
    return null;
  }
}

export async function findTrackVideo(
  track: Track,
  release: Release,
): Promise<string | null> {
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
  return searchVideo(query);
}
