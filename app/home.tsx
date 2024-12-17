'use client';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';

interface HomeClientProps {}

const HomeClient = ({}: HomeClientProps) => {
  const { userIdentity } = useAuthStore();
  const router = useRouter();

    if (userIdentity?.username) {
      router.replace(`/${userIdentity.username}`);
    }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Welcome to Crate
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          Your AI-powered music collection analyzer
        </p>
      </div>
    </div>
  );
};

export default HomeClient;
