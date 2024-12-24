import type { Track, Release } from '@/types/discogs';

export async function searchYouTube(searchQuery: string) {
  try {
    const response = await fetch(`/api/youtube/search?q=${encodeURIComponent(searchQuery)}`);
    if (!response.ok) throw new Error('Failed to search YouTube');
    const data = await response.json();
    return data.videoId;
  } catch (err) {
    console.error('YouTube search failed:', err);
    return null;
  }
}

export async function findVideoForTrack(track: Track, release: Release, searchedTracks: Set<string>) {
  // Try Discogs videos first
  const matchingVideo = release.videos?.find(video => 
    video.title.toLowerCase() === track.title.toLowerCase() ||
    video.title.toLowerCase().includes(track.title.toLowerCase())
  );

  let videoId = matchingVideo?.uri 
    ? new URL(matchingVideo.uri).searchParams.get('v')
    : null;

  // Fallback to YouTube search if no match found
  if (!videoId && !searchedTracks.has(track.position)) {
    const searchQuery = `${track.title} ${release.artists[0]?.name || ''}`; 
    videoId = await searchYouTube(searchQuery);
  }

  return {
    videoId,
    matchingVideo
  };
} 