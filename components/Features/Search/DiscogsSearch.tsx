'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { LoadingSpinner } from '@/components/ui/loading';

interface SearchResult {
  id: number;
  title: string;
  year: string;
  thumb: string;
  country: string;
  format: string[];
  label: string[];
  genre: string[];
  style: string[];
}

interface DiscogsSearchProps {}

const DiscogsSearch = ({}: DiscogsSearchProps) => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/discogs/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error('Search failed');
      }

      const data = await response.json();
      setResults(data.results);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <form onSubmit={handleSearch} className="flex gap-2 mb-8">
        <Input
          type="text"
          placeholder="Search for albums..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <LoadingSpinner className="w-4 h-4" />
          ) : (
            <Search className="w-4 h-4" />
          )}
          <span className="ml-2">Search</span>
        </Button>
      </form>

      {results.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map((result) => (
            <div
              key={result.id}
              className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
            >
              {result.thumb && (
                <img
                  src={result.thumb}
                  alt={result.title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
              )}
              <h3 className="font-semibold text-lg mb-2">{result.title}</h3>
              <div className="text-sm text-muted-foreground">
                <p>Year: {result.year}</p>
                <p>Country: {result.country}</p>
                <p>Format: {result.format?.join(', ')}</p>
                <p>Label: {result.label?.join(', ')}</p>
                <p>Genre: {result.genre?.join(', ')}</p>
                <p>Style: {result.style?.join(', ')}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DiscogsSearch; 