import { useState, useEffect } from 'react';
import type { CollectionRelease } from '@/types';

interface CollectionData {
  collection: CollectionRelease[];
  pagination?: {
    items: number;
    page: number;
    pages: number;
  };
}

// FIXME: make this param optional
export function useDiscogsCollection() {
  const [collectionData, setCollectionData] = useState<CollectionData>({
    collection: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCollection = async (options?: { refreshCollection?: boolean }) => {
    try {
      setLoading(true);
      setError(null);
      // Create URL with query parameter if refreshCollection is provided
      const url = new URL(
        '/api/external/discogs/collection',
        window.location.origin,
      );
      if (options?.refreshCollection !== undefined) {
        url.searchParams.append(
          'refreshCollection',
          options.refreshCollection.toString(),
        );
      }
      const response = await fetch(url.toString(), {
        method: 'GET', // Explicitly setting GET method since we're using query params
      });
      if (!response.ok) throw new Error('Failed to fetch collection');

      const data = await response.json();
      setCollectionData({
        collection: data.releases,
        pagination: data.pagination,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollection();
  }, []);

  return {
    collection: collectionData.collection,
    pagination: collectionData.pagination,
    loading,
    error,
    refetch: fetchCollection,
  };
}
