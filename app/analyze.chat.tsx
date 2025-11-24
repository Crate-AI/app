import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useAuthStore } from '@/stores';
import { LoadingSpinner } from '@/components/ui/loading';

export const Route = createFileRoute('/analyze/chat')({
  component: ChatPage,
});

function ChatPage() {
  const navigate = useNavigate();
  const { userIdentity } = useAuthStore();

  useEffect(() => {
    if (userIdentity?.username) {
      navigate({ to: `/${userIdentity.username}`, replace: true });
    } else {
      navigate({ to: '/', replace: true });
    }
  }, [userIdentity, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <LoadingSpinner />
    </div>
  );
}
