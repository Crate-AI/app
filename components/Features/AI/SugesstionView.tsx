import React, { useState } from 'react';
import { TrackWithDetails } from '@/types/dj';
import { TrackContext } from '@/components/Features/CrateExplorer/TrackContext';
import TrackView from '@/components/Features/CrateExplorer/TrackView';
import AIPromptInterface from './PromptInterface';
import { sendMessageToClaude } from '@/lib/services/claude';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { XCircle } from 'lucide-react';

interface AISuggestionViewProps {
  tracks: TrackWithDetails[];
  playingTrackId: string | null;
  onPlayToggle: (id: string) => void;
}

interface TrackSuggestion {
  track: TrackWithDetails;
  reason: string;
}

const AISuggestionView = ({ tracks, playingTrackId, onPlayToggle }: AISuggestionViewProps) => {
  const [suggestions, setSuggestions] = useState<TrackSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleAISearch = async (prompt: string) => {
    setIsLoading(true);
    try {
      const response = await sendMessageToClaude(prompt, tracks);
      if (response?.content?.[0]?.text) {
        const newSuggestions = await parseAIResponse(response.content[0].text, tracks);
        setSuggestions(newSuggestions);
      }
    } catch (error) {
      console.error('AI suggestion error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const parseAIResponse = async (text: string, availableTracks: TrackWithDetails[]): Promise<TrackSuggestion[]> => {
    const suggestions: TrackSuggestion[] = [];
    // Skip the analysis section
    const mainContent = text.split('Now for my track selection recommendations:')[1] || text;
    const lines = mainContent.split('\n').filter(line => line.trim());
    
    // Keep track of used releases to avoid duplicates
    const usedReleaseIds = new Set<number>();
    
    for (const line of lines) {
      const patterns = [
        /^"([^"]+)"\s*by\s*([^(]+)\s*\(BPM\s*(\d+)\)\s*-\s*\[(.*?)\]/,
        /^"([^"]+)"\s*by\s*([^(]+)\s*\((\d+)\s*BPM\)\s*-\s*\[(.*?)\]/,
        /"([^"]+)"\s*by\s*([^(]+)\s*\(BPM\s*(\d+)\)\s*-\s*(.*)/,
        /"([^"]+)"\s*by\s*([^(]+)\s*\((\d+)\s*BPM\)\s*-\s*(.*)/
      ];
  
      let match = null;
      for (const pattern of patterns) {
        match = line.match(pattern);
        if (match) break;
      }
  
      if (match) {
        const [, title, artist, bpm, reason] = match;
        const foundTrack = availableTracks.find(track => 
          track.title.toLowerCase() === title.trim().toLowerCase() &&
          track.artist.toLowerCase() === artist.trim().toLowerCase() &&
          !usedReleaseIds.has(track.releaseId)
        );
  
        if (foundTrack) {
          usedReleaseIds.add(foundTrack.releaseId);
          suggestions.push({
            track: foundTrack,
            reason: reason?.trim().replace(/[\[\]]/g, '') || 
                    'Selected for style and energy compatibility'
          });
        }
      }
    }
  
    console.log('Parsed suggestions:', suggestions);
    return suggestions;
  };

  return (
    <div className="space-y-6">
      {/* AI Interface */}
      <div className="max-w-4xl mx-auto">
        <AIPromptInterface 
          onSearch={handleAISearch}
          isLoading={isLoading}
        />
      </div>

      {/* Suggestions Panel */}
      <AnimatePresence>
        {suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="border-2 border-border rounded-lg overflow-hidden bg-white"
          >
            {/* Header */}
            <div className="p-4 border-b border-border bg-bg">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Suggested Tracks</h3>
                  <p className="text-sm text-text/60">
                    {suggestions.length} tracks selected for your set
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setSuggestions([])}
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Clear
                </Button>
              </div>
            </div>

            {/* Tracks List */}
            <div className="divide-y divide-border">
              {suggestions.map((suggestion, index) => (
                <div key={suggestion.track.id} className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 mt-2 rounded-full bg-main/20 flex items-center justify-center text-sm font-medium flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <TrackContext.Provider 
                        value={{
                          result: suggestion.track,
                          isPlaying: playingTrackId === suggestion.track.youtubeVideoId,
                          onPlayToggle: () => {
                            if (!suggestion.track.youtubeVideoId) return;
                            if (playingTrackId === suggestion.track.youtubeVideoId) {
                              onPlayToggle('');
                            } else {
                              onPlayToggle(suggestion.track.youtubeVideoId);
                            }
                          },
                          dateAdded: ''
                        }}
                      >
                        <TrackView track={suggestion.track} isPlaying={playingTrackId === suggestion.track.youtubeVideoId} onPlayToggle={() => {
                          if (!suggestion.track.youtubeVideoId) return;
                          if (playingTrackId === suggestion.track.youtubeVideoId) {
                            onPlayToggle('');
                          } else {
                            onPlayToggle(suggestion.track.youtubeVideoId);
                          }
                        }} />
                      </TrackContext.Provider>
                      <div className="mt-2 text-sm text-text/60 italic pl-2 border-l-2 border-main/20">
                        {suggestion.reason}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AISuggestionView;