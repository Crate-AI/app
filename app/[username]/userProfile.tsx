// 'use client';

// import { useAuthStore } from '@/lib/store/authStore';
// import CrateExplorer from '@/components/Features/CrateExplorer/CrateExplorer';
// import AIAssistant from '@/components/Features/AI/Assistant';
// import { redirect } from 'next/navigation';
// import { useState, useEffect } from 'react';
// import { TrackWithDetails } from '@/types/dj';
// import { useDiscogsCollection } from '@/lib/hooks/useDiscogsCollection';
// import { createClient } from '@/lib/supabase/client';

// interface UserProfileProps {
//   username: string;
// }

// const UserProfile = ({ username }: UserProfileProps) => {
//   const { userIdentity } = useAuthStore();
//   const { collection } = useDiscogsCollection();
//   const [tracks, setTracks] = useState<TrackWithDetails[]>([]);
//   const [suggestedTracks, setSuggestedTracks] = useState<TrackWithDetails[]>([]);

//   useEffect(() => {
//     const fetchTracksFromCollection = async () => {
//       if (!collection.length) return;
      
//       try {
//         const supabase = createClient();
//         const releaseIds = collection.map(r => r.basic_information.id);
        
//         const { data: supabaseTracks, error } = await supabase
//           .from('tracks')
//           .select('*')
//           .in('discogs_release_id', releaseIds.map(String));

//         if (error) {
//           console.error('Supabase query error:', error);
//           return;
//         }

//         if (!supabaseTracks) return;

//         // Map collection releases to track format
//         const mappedTracks = collection.flatMap(release => {
//           const releaseTracks = supabaseTracks.filter(
//             t => String(t.discogs_release_id) === String(release.basic_information.id)
//           );

//           return releaseTracks.map(track => ({
//             id: track.id,
//             title: track.title,
//             artist: release.basic_information.artists[0]?.name || 'Unknown Artist',
//             position: track.position,
//             duration: track.duration,
//             bpm: track.bpm || Math.floor(Math.random() * (140 - 115) + 115),
//             key: 'Am', // Default value - replace with actual key if available
//             releaseId: release.basic_information.id,
//             releaseTitle: release.basic_information.title,
//             releaseYear: String(release.basic_information.year),
//             thumb: release.basic_information.thumb,
//             genre: release.basic_information.genres,
//             style: release.basic_information.styles,
//             youtubeVideoId: track.youtube_video_id,
//             extraArtists: track.extra_artists
//           }));
//         });

//         setTracks(mappedTracks);
//       } catch (error) {
//         console.error('Error fetching tracks:', error);
//       }
//     };

//     fetchTracksFromCollection();
//   }, [collection]);

//   if (!userIdentity) {
//     redirect('/');
//   }

//   const handleSuggestedTracks = (tracks: TrackWithDetails[], reason: string) => {
//     setSuggestedTracks(tracks);
//     // You can pass these suggested tracks to CrateExplorer or handle them as needed
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <AIAssistant 
//         tracks={tracks}
//         onSuggestTracks={handleSuggestedTracks}
//       />
//       <CrateExplorer 
//         suggestedTracks={suggestedTracks} // Add this prop to CrateExplorer
//       />
//     </div>
//   );
// };

// export default UserProfile;

'use client';

import { useAuthStore } from '@/lib/store/authStore';
import CrateExplorer from '@/components/Features/CrateExplorer/CrateExplorer';
import AISuggestionView from '@/components/Features/AI/SugesstionView';
import { redirect } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useDiscogsCollection } from '@/lib/hooks/useDiscogsCollection';
import { TrackWithDetails } from '@/types/dj';
import { createClient } from '@/lib/supabase/client';

interface UserProfileProps {
  username: string;
}

const UserProfile = ({ username }: UserProfileProps) => {
  const { userIdentity } = useAuthStore();
  const { collection } = useDiscogsCollection();
  const [tracks, setTracks] = useState<TrackWithDetails[]>([]);
  const [playingTrackId, setPlayingTrackId] = useState<string | null>(null);

  // Add useEffect to fetch tracks from Supabase
  useEffect(() => {
    const fetchTracks = async () => {
      if (!collection.length) return;

      try {
        const supabase = createClient();
        const releaseIds = collection.map(r => r.basic_information.id);
        
        const { data: supabaseTracks, error } = await supabase
          .from('tracks')
          .select('*')
          .in('discogs_release_id', releaseIds.map(String));

        if (error) throw error;
        if (!supabaseTracks) return;

        // Map tracks with details
        const mappedTracks = collection.flatMap(release => {
          const releaseTracks = supabaseTracks.filter(
            t => String(t.discogs_release_id) === String(release.basic_information.id)
          );

          return releaseTracks.map(track => ({
            id: track.id,
            title: track.title,
            artist: release.basic_information.artists[0]?.name || 'Unknown Artist',
            position: track.position,
            duration: track.duration,
            bpm: track.bpm || Math.floor(Math.random() * (140 - 115) + 115),
            key: 'Am',
            releaseId: release.basic_information.id,
            releaseTitle: release.basic_information.title,
            releaseYear: String(release.basic_information.year),
            thumb: release.basic_information.thumb,
            genre: release.basic_information.genres,
            style: release.basic_information.styles,
            youtubeVideoId: track.youtube_video_id,
            extraArtists: track.extra_artists
          }));
        });

        setTracks(mappedTracks);
      } catch (error) {
        console.error('Error fetching tracks:', error);
      }
    };

    fetchTracks();
  }, [collection]);

  if (!userIdentity) {
    redirect('/');
  }

  const handlePlayToggle = (id: string) => {
    setPlayingTrackId(id === playingTrackId ? null : id);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <AISuggestionView
        tracks={tracks}
        playingTrackId={playingTrackId}
        onPlayToggle={handlePlayToggle}
      />
      <CrateExplorer />
    </div>
  );
};

export default UserProfile;