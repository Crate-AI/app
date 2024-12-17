'use client';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';

interface ClientPageProps {
  username: string;
}

const UserProfile = ({ username }: ClientPageProps) => {
  const { userIdentity } = useAuthStore();
  const router = useRouter();
    const isValidUser = userIdentity?.username && 
      userIdentity.username.toLowerCase() === username.toLowerCase();

    if (!isValidUser) {
      router.replace('/');
    }


  return (
    <div>
      <h1>Welcome, {userIdentity?.username}!</h1>
    </div>
  );
};

export default UserProfile;
