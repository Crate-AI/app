import { jsx } from 'react/jsx-runtime';
import { useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import { u as useAuthStore, L as LoadingSpinner } from './router-1d_kQrZ6.js';
import 'sonner';
import 'zustand';
import 'zustand/middleware';
import 'class-variance-authority';
import 'clsx';
import 'tailwind-merge';
import '@supabase/supabase-js';
import 'lucide-react';
import '@radix-ui/react-avatar';
import '@radix-ui/react-slot';
import '@radix-ui/react-dropdown-menu';
import '@radix-ui/react-icons';
import '@unpic/react';
import '@supabase/ssr';
import 'vinxi/http';
import 'cookie';
import 'ai';
import '@ai-sdk/anthropic';
import '@crate.ai/discogs-sdk';
function ChatPage() {
  const navigate = useNavigate();
  const { userIdentity } = useAuthStore();
  useEffect(() => {
    if (userIdentity?.username) {
      navigate({
        to: `/${userIdentity.username}`,
        replace: true,
      });
    } else {
      navigate({
        to: '/',
        replace: true,
      });
    }
  }, [userIdentity, navigate]);
  return /* @__PURE__ */ jsx('div', {
    className: 'flex items-center justify-center min-h-screen',
    children: /* @__PURE__ */ jsx(LoadingSpinner, {}),
  });
}
export { ChatPage as component };
