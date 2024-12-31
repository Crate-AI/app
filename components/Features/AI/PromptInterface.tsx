import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, Sparkles, X } from 'lucide-react';

const BPM_RANGES = [
  { label: 'Warm-up', range: '115-124 BPM' },
  { label: 'Peak Time', range: '124-130 BPM' },
  { label: 'Closing', range: '118-124 BPM' }
];

interface AIPromptInterfaceProps {
  onSearch: (prompt: string) => void;
  isLoading: boolean;
}

const AIPromptInterface = ({ onSearch, isLoading }: AIPromptInterfaceProps) => {
  const [prompt, setPrompt] = useState('');
  const [recentPrompts, setRecentPrompts] = useState<string[]>([]);

  const handleSearch = () => {
    if (!prompt.trim()) return;
    setRecentPrompts(prev => [prompt, ...prev.slice(0, 2)]);
    onSearch(prompt);
  };

  const removePrompt = (index: number) => {
    setRecentPrompts(prev => prev.filter((_, i) => i !== index));
  };

  const handleBPMRangeClick = (label: string, range: string) => {
    setPrompt(`${label} set: Opening set, gentle progression, ${range}`);
  };

  return (
    <div className="space-y-3">
      {/* Main Search */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Sparkles className="absolute left-3 top-3 h-4 w-4 text-text/40" />
          <Input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="pl-10 h-12 border-2 rounded-lg"
            placeholder="Warm-up set: Opening set, gentle progression, 115-124 BPM"
          />
        </div>
        <Button
          onClick={handleSearch}
          disabled={isLoading || !prompt.trim()}
          className="h-12 px-6"
        >
          {isLoading ? 'Thinking...' : 'Suggest Tracks'}
          <Send className="ml-2 h-4 w-4" />
        </Button>
      </div>

      {/* BPM Range Buttons */}
      <div className="flex gap-2">
        {BPM_RANGES.map(({ label, range }) => (
          <button
            key={label}
            onClick={() => handleBPMRangeClick(label, range)}
            className="px-4 py-2 rounded-full border-2 border-border hover:bg-gray-50 transition-colors"
          >
            <div className="text-center">
              <div className="font-medium">{label}</div>
              <div className="text-xs text-text/60">{range}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Recent Prompts as Tags */}
      {recentPrompts.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {recentPrompts.map((recentPrompt, index) => (
            <div
              key={index}
              className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-sm"
            >
              <span className="truncate max-w-md">
                {recentPrompt.length > 50 
                  ? `${recentPrompt.substring(0, 50)}...` 
                  : recentPrompt}
              </span>
              <button
                onClick={() => removePrompt(index)}
                className="p-1 hover:bg-gray-200 rounded-full"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AIPromptInterface;