import { useState, useEffect } from 'react';
import useDebounce from './useDebounce';
import type { DiscogsSearchResult } from '@/types';

interface UseDiscogsSearchReturn {
  query: string;
  setQuery: (query: string) => void;
  results: DiscogsSearchResult[];
  isLoading: boolean;
  error: string | null;
  isQueryValid: boolean;
}

const MIN_SEARCH_LENGTH = 3;

const useDiscogsSearch = (): UseDiscogsSearchReturn => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<DiscogsSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedQuery = useDebounce(query, 300);
  const isQueryValid = debouncedQuery.length >= MIN_SEARCH_LENGTH;

  useEffect(() => {
    const searchDiscogs = async () => {
      if (!isQueryValid) {
        setResults([]);
        setError(null);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/external/discogs/search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query: debouncedQuery }),
        });

        if (!response.ok) {
          throw new Error('Search request failed');
        }

        const data = await response.json();
        setResults(data.results);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'An error occurred during search',
        );
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    searchDiscogs();
  }, [debouncedQuery, isQueryValid]);

  return {
    query,
    setQuery,
    results,
    isLoading,
    error,
    isQueryValid,
  };
};

export default useDiscogsSearch;
