import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Suspense } from 'react';
import { Toaster } from 'sonner';
import './globals.css';
import AuthProvider from '@/features/auth/components/AuthProvider';
import AppLayout from '@/components/layout/Navigation/AppLayout';
import ErrorBoundary from '@/components/Error/ErrorBoundary';
import { LoadingSpinner } from '@/components/ui/loading';
import GlobalError from '@/components/Error/GlobalError';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s | Crate',
    default: 'Crate',
  },
  keywords: ['Crate', 'Discogs', 'Music', 'AI', 'Analyzer', 'Bpm'],
  description: 'Your AI-powered music collection analyzer',
  openGraph: {
    type: 'website',
    title: 'Crate',
    description: 'Your AI-powered music collection analyzer',
  },
  robots: {
    index: true,
    follow: true,
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: Readonly<RootLayoutProps>) => {
  return (
    <html lang="en">
      <body
        className={inter.className}
        style={{
          backgroundImage: 'radial-gradient(#FFDC58 1px, transparent 1px)',
          backgroundSize: '10px 10px',
        }}
      >
        <ErrorBoundary fallback={<GlobalError />}>
          <AuthProvider>
            <AppLayout>
              <ErrorBoundary>
                <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>
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
              border: '2px solid black',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: '500',
              backgroundColor: 'white',
              color: '#1a1a1a',
            },
            className: 'shadow-light',
          }}
        />
      </body>
    </html>
  );
};

export default RootLayout;
