import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Suspense } from 'react';
import './globals.css';
import AuthProvider from '@/components/Features/Auth/AuthProvider';
import Navigation from '@/components/Navigation';
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
      <body className={inter.className}>
        <ErrorBoundary fallback={<GlobalError />}>
          <AuthProvider>
            <Suspense fallback={<LoadingSpinner />}>
              <Navigation />
            </Suspense>
            <main className="min-h-[calc(100vh-4rem)]">
              <ErrorBoundary>
                <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>
              </ErrorBoundary>
            </main>
          </AuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
};

export default RootLayout;