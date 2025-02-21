'use client';

import { useAuthStore } from '@/stores';
import { redirect } from 'next/navigation';
import SearchBar from '@/features/crate-explorer/components/SearchBar';
import useDiscogsSearch from '@/lib/hooks/useDiscogsSearch';
interface UserProfileProps {
  username: string;
}

const UserProfile = ({ username }: UserProfileProps) => {
  const { userIdentity } = useAuthStore();
  const { query, setQuery, isLoading } = useDiscogsSearch();
  if (!userIdentity) {
    redirect('/');
  }

  return (
    <div className="container mx-auto px-4 py-8">
    </div>
  );
};

export default UserProfile;
