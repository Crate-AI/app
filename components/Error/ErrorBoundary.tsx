'use client';

import React, { ReactNode, useState, useEffect } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { XCircle, RefreshCw } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorFallbackProps {
  error: Error;
  reset: () => void;
}

const ErrorFallback = ({ error, reset }: ErrorFallbackProps) => {
  return (
    <Alert variant="destructive" className="m-4">
      <XCircle className="h-4 w-4" />
      <AlertTitle>Something went wrong!</AlertTitle>
      <AlertDescription className="mt-2">
        {error.message || 'An unexpected error occurred'}
      </AlertDescription>
      <div className="mt-4">
        <Button
          variant="default"
          onClick={reset}
          className="flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Try again
        </Button>
      </div>
    </Alert>
  );
};

const ErrorBoundary = ({ children, fallback }: ErrorBoundaryProps) => {
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const handleError = (error: Error, errorInfo: any) => {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
      setError(error);
    };

    const errorListener = (event: ErrorEvent | PromiseRejectionEvent) => {
      const error =
        event instanceof ErrorEvent
          ? event.error
          : event instanceof PromiseRejectionEvent
            ? event.reason
            : new Error('Unknown error');

      handleError(error, {
        componentStack: error.stack,
        type: event instanceof ErrorEvent ? 'error' : 'promise',
      });
    };

    window.addEventListener('error', errorListener);
    window.addEventListener('unhandledrejection', errorListener);

    return () => {
      window.removeEventListener('error', errorListener);
      window.removeEventListener('unhandledrejection', errorListener);
    };
  }, []);

  const resetError = () => {
    setError(null);
  };

  if (error) {
    if (fallback) {
      return <>{fallback}</>;
    }
    return <ErrorFallback error={error} reset={resetError} />;
  }

  return <>{children}</>;
};

export default ErrorBoundary;
