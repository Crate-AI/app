import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, Sparkles, Clock, X } from 'lucide-react';

const AIPromptInterface = ({ onSearch, isLoading }: { onSearch: (prompt: string) => void; isLoading: boolean }) => {
  const [prompt, setPrompt] = useState('');
  const [showExamples, setShowExamples] = useState(false);
  const [recentSearches, setRecentSearches] = useState(() => {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem('recentDJSearches') || '[]');
    }
    return [];
  });

  const saveRecentSearch = (searchPrompt: string) => {
    const updatedSearches = [
      searchPrompt,
      ...recentSearches.filter((s: string) => s !== searchPrompt)
    ].slice(0, 5);
    setRecentSearches(updatedSearches);
    localStorage.setItem('recentDJSearches', JSON.stringify(updatedSearches));
  };

  const handleSearch = () => {
    if (!prompt.trim()) return;
    saveRecentSearch(prompt);
    onSearch(prompt);
  };

  return (
    <div className="space-y-4">
      {/* Main Search Input */}
      <div className="relative">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Sparkles className="absolute left-2 top-2.5 h-4 w-4 text-text/40" />
            <Input
              placeholder="Describe the vibe you want to play..."
              className="pl-8"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onFocus={() => setShowExamples(true)}
            />
          </div>
          <Button 
            onClick={handleSearch}
            disabled={isLoading || !prompt.trim()}
          >
            {isLoading ? 'Thinking...' : 'Suggest Tracks'}
            <Send className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Recent Searches */}
      {recentSearches.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {recentSearches.map((search: string, index: number) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="text-xs flex items-center gap-1"
              onClick={() => setPrompt(search)}
            >
              <Clock className="w-3 h-3" />
              {search.length > 30 ? `${search.substring(0, 30)}...` : search}
              <X
                className="w-3 h-3 ml-1 hover:text-red-500"
                onClick={(e) => {
                  e.stopPropagation();
                  const updatedSearches = recentSearches.filter((search: string, i: number) => i !== index);
                  setRecentSearches(updatedSearches);
                  localStorage.setItem('recentDJSearches', JSON.stringify(updatedSearches));
                }}
              />
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}; 

export default AIPromptInterface;