import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useEffect, Suspense } from 'react';
import { useNavigate } from '@tanstack/react-router';
import {
  B as Button,
  u as useAuthStore,
  L as LoadingSpinner,
} from './router-1d_kQrZ6.js';
import { LoaderCircle } from 'lucide-react';
import 'sonner';
import 'zustand';
import 'zustand/middleware';
import 'class-variance-authority';
import 'clsx';
import 'tailwind-merge';
import '@supabase/supabase-js';
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
const SignInButton = ({}) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      const redirectUrl = window.location.pathname;
      if (redirectUrl !== '/') {
        await fetch('/api/auth/set-redirect', {
          method: 'POST',
          body: JSON.stringify({ redirectUrl }),
        });
      }
      const response = await fetch('/api/auth/discogs/request-token');
      if (!response.ok) {
        throw new Error('Failed to get authorization URL');
      }
      const { authUrl } = await response.json();
      window.location.href = authUrl;
    } catch (error) {
      console.error('Authentication error:', error);
      setIsLoading(false);
      throw error instanceof Error
        ? error.message
        : 'Failed to start authentication';
    }
  };
  return /* @__PURE__ */ jsxs(Button, {
    onClick: handleSignIn,
    disabled: isLoading,
    className: 'w-full sm:w-auto flex items-center gap-2',
    children: [
      isLoading &&
        /* @__PURE__ */ jsx(LoaderCircle, {
          className: 'h-4 w-4 animate-spin',
        }),
      isLoading ? 'Connecting to Discogs...' : 'Sign In with Discogs',
    ],
  });
};
const HomeClient = ({}) => {
  const { userIdentity, isLoading } = useAuthStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (userIdentity?.username) {
      navigate({ to: `/${userIdentity.username}`, replace: true });
    }
  }, [userIdentity, navigate]);
  if (isLoading) {
    return /* @__PURE__ */ jsx('div', {
      className: 'flex items-center justify-center min-h-screen',
      children: /* @__PURE__ */ jsx(LoadingSpinner, {}),
    });
  }
  if (userIdentity?.username) {
    return /* @__PURE__ */ jsx('div', {
      className: 'flex items-center justify-center min-h-screen',
      children: /* @__PURE__ */ jsx(LoadingSpinner, {}),
    });
  }
  return /* @__PURE__ */ jsxs('div', {
    className: 'min-h-screen flex flex-col',
    children: [
      /* @__PURE__ */ jsxs('header', {
        className:
          'bg-transparent text-black p-6 flex justify-between items-center',
        children: [
          /* @__PURE__ */ jsx('div', {
            className: 'flex items-center',
            children: /* @__PURE__ */ jsx('img', {
              src: '/logo.svg',
              alt: 'Crate Logo',
              width: 64,
              height: 64,
              className: 'w-16 h-16',
            }),
          }),
          /* @__PURE__ */ jsx('div', {
            className: 'flex items-center space-x-4',
            children: /* @__PURE__ */ jsx(SignInButton, {}),
          }),
        ],
      }),
      /* @__PURE__ */ jsx('div', {
        className: 'flex-1 flex flex-col items-center justify-center px-4',
        children: /* @__PURE__ */ jsxs('div', {
          className: 'max-w-2xl text-center',
          children: [
            /* @__PURE__ */ jsx('h1', {
              className: 'text-4xl font-bold tracking-tight sm:text-6xl mb-6',
              children: 'Discover, Curate, Share Your Music',
            }),
            /* @__PURE__ */ jsx('p', {
              className: 'text-lg leading-8 text-muted-foreground mb-8',
              children:
                'Connect your Discogs and Spotify collections. Create playlists and share them with the world.',
            }),
            /* @__PURE__ */ jsx('p', {
              className: 'text-base text-muted-foreground mb-8',
              children:
                'Sync your libraries in one place. Browse, search, and organize your music effortlessly.',
            }),
            /* @__PURE__ */ jsxs('div', {
              className:
                'grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 text-left',
              children: [
                /* @__PURE__ */ jsxs('div', {
                  className: 'p-4 rounded-lg border bg-card',
                  children: [
                    /* @__PURE__ */ jsx('h3', {
                      className: 'font-semibold mb-2',
                      children: '🎵 Collection Management',
                    }),
                    /* @__PURE__ */ jsx('p', {
                      className: 'text-sm text-muted-foreground',
                      children:
                        'Sync your Discogs and Spotify libraries in one place. Browse, search, and organize your music.',
                    }),
                  ],
                }),
                /* @__PURE__ */ jsxs('div', {
                  className: 'p-4 rounded-lg border bg-card',
                  children: [
                    /* @__PURE__ */ jsx('h3', {
                      className: 'font-semibold mb-2',
                      children: '🎧 Smart Playlists',
                    }),
                    /* @__PURE__ */ jsx('p', {
                      className: 'text-sm text-muted-foreground',
                      children:
                        'Create custom playlists from your collection. Add favorites and organize tracks your way.',
                    }),
                  ],
                }),
                /* @__PURE__ */ jsxs('div', {
                  className: 'p-4 rounded-lg border bg-card',
                  children: [
                    /* @__PURE__ */ jsx('h3', {
                      className: 'font-semibold mb-2',
                      children: '🌍 Share & Discover',
                    }),
                    /* @__PURE__ */ jsx('p', {
                      className: 'text-sm text-muted-foreground',
                      children:
                        'Make your playlists public and share them with friends. Discover what others are listening to.',
                    }),
                  ],
                }),
              ],
            }),
            /* @__PURE__ */ jsxs('div', {
              className: 'flex flex-col items-center space-y-4',
              children: [
                /* @__PURE__ */ jsx(SignInButton, {}),
                /* @__PURE__ */ jsx('p', {
                  className: 'text-sm text-muted-foreground',
                  children: 'Sign in with your Discogs account to get started',
                }),
              ],
            }),
          ],
        }),
      }),
    ],
  });
};
function Home() {
  return /* @__PURE__ */ jsx('main', {
    className: 'min-h-screen',
    children: /* @__PURE__ */ jsx(Suspense, {
      fallback: /* @__PURE__ */ jsx(LoadingSpinner, {}),
      children: /* @__PURE__ */ jsx(HomeClient, {}),
    }),
  });
}
export { Home as component };
