import { useState, useEffect } from 'react';
import { Sparkles, Send, Loader2, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import { sendMessageToClaude } from '@/lib/services/claude';
import { TrackWithDetails } from '@/types/dj';

interface AIAssistantProps {
  tracks: TrackWithDetails[];
  onSuggestTracks?: (tracks: TrackWithDetails[], reason: string) => void;
}

const AIAssistant = ({ tracks, onSuggestTracks }: AIAssistantProps) => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [lastUsed, setLastUsed] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  const handleSuggestion = async (inputPrompt: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await sendMessageToClaude(prompt, tracks);
      if (response?.content?.[0]?.text) {
        setLastUsed(prev => [inputPrompt, ...prev.slice(0, 2)]);
        const suggestions = await parseAIResponse(response.content[0].text, tracks);
        if (suggestions.length > 0) {
          onSuggestTracks?.(
            suggestions.map(s => s.track),
            'AI Suggested Tracks'
          );
        }
      }
    } catch (err) {
      setError('Failed to get suggestions. Please try again.');
      console.error('AI suggestion error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const parseAIResponse = async (text: string, availableTracks: TrackWithDetails[]) => {
    const suggestions = [];
    const lines = text.split('\n').filter(line => line.trim());
    
    for (const line of lines) {
      const patterns = [
        /^\d+\.\s*"([^"]+)"\s*by\s*([^(]+)\s*\((\d+)\s*BPM\)/,
        /"([^"]+)"\s*by\s*([^(]+)\s*\((\d+)\s*BPM\)/,
        /([^"]+)\s*by\s*([^(]+)\s*\((\d+)\s*BPM\)/
      ];

      let match = null;
      for (const pattern of patterns) {
        match = line.match(pattern);
        if (match) break;
      }

      if (match) {
        const [, title, artist] = match;
        const foundTrack = availableTracks.find(track => 
          track.title.toLowerCase() === title.trim().toLowerCase() &&
          track.artist.toLowerCase() === artist.trim().toLowerCase()
        );

        if (foundTrack) {
          const reason = line.split(/\)\s*-?\s*/)[1]?.trim() || 
                        'Selected for BPM and style compatibility';
          suggestions.push({ track: foundTrack, reason });
        }
      }
    }
    
    return suggestions;
  };

  return (
    <div className="mb-8 bg-bg border-2 border-border rounded-lg overflow-hidden">
      <div className="p-6 border-b-2 border-border">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <div className="w-10 h-10 rounded-full bg-main border-2 border-border flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
            </motion.div>
            <div>
              <h2 className="font-medium">DJ Assistant</h2>
              <p className="text-sm text-text/60">Let me help curate your perfect set</p>
            </div>
          </div>
          
          <div className="text-center px-4 py-2 bg-white rounded-lg border-2 border-border">
            <div className="text-sm text-text/60">Tracks</div>
            <div className="font-mono font-medium">{tracks.length}</div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Input
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your ideal set vibe..."
                className="pl-10 h-12 border-2"
              />
              <Sparkles className="absolute left-3 top-3.5 h-4 w-4 text-text/40" />
            </div>
            <Button 
              className="h-12 px-6"
              onClick={() => handleSuggestion(prompt)}
              disabled={isLoading || !prompt.trim()}
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  Suggest Tracks
                  <Send className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>

          {lastUsed.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {lastUsed.map((recentPrompt, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-1 px-3 py-1 bg-white/50 rounded-full text-sm
                            border border-border/50 hover:bg-white transition-colors"
                  onClick={() => {
                    setPrompt(recentPrompt);
                    handleSuggestion(recentPrompt);
                  }}
                >
                  <Clock className="w-3 h-3" />
                  <span className="truncate max-w-[200px]">{recentPrompt}</span>
                </motion.button>
              ))}
            </div>
          )}
          
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-red-500 text-sm"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;