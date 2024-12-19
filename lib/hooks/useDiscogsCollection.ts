import { useState, useEffect } from 'react';
import type { CollectionRelease } from '@/types/discogs';

interface CollectionData {
  collection: CollectionRelease[];
  pagination?: {
    items: number;
    page: number;
    pages: number;
  };
}

export function useDiscogsCollection() {
  const [collectionData, setCollectionData] = useState<CollectionData>({ collection: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCollection = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/discogs/collection');
      if (!response.ok) throw new Error('Failed to fetch collection');
      
      const data = await response.json();
      setCollectionData({
        collection: data.releases,
        pagination: data.pagination
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
    refetch: fetchCollection 
  };
} 