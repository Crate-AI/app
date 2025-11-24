import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
} from '@tanstack/react-router';
import { Suspense } from 'react';
import { Toaster } from 'sonner';
import appCss from './globals.css?url';
import AuthProvider from '@/features/auth/components/AuthProvider';
import AppLayout from '@/components/layout/Navigation/AppLayout';
import ErrorBoundary from '@/components/Error/ErrorBoundary';
import { LoadingSpinner } from '@/components/ui/loading';
import GlobalError from '@/components/Error/GlobalError';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Crate',
      },
      {
        name: 'description',
        content: 'Your AI-powered music collection analyzer',
      },
      {
        name: 'keywords',
        content: 'Crate, Discogs, Music, AI, Analyzer, Bpm',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  component: RootLayout,
});

function RootLayout() {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body
        // TODO: Add font class back after migration to fontsource
        style={{
          backgroundImage: 'radial-gradient(#FFDC58 1px, transparent 1px)',
          backgroundSize: '10px 10px',
        }}
      >
        <ErrorBoundary fallback={<GlobalError />}>
          <AuthProvider>
            <AppLayout>
              <ErrorBoundary>
                <Suspense fallback={<LoadingSpinner />}>
                  <Outlet />
                </Suspense>
              </ErrorBoundary>
            </AppLayout>
          </AuthProvider>
        </ErrorBoundary>
        <Toaster
          position="top-center"
          expand={false}
          closeButton
          richColors
          toastOptions={{
            style: {
              border: '2px solid #1f2937', // gray-800
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: '500',
              backgroundColor: 'white',
              color: '#1a1a1a',
            },
            className: 'shadow-light',
          }}
        />
        <Scripts />
      </body>
    </html>
  );
}
