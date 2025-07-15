'use client';

import ErrorBoundary from '@/components/Error/ErrorBoundary';
import TracksTable from '@/features/crate-explorer/tracks/TracksTable';
import EnhancedAiLayout from '@/features/ai-assistant/EnhancedAiLayout';
import { PageHeader } from '@/components/layout/Navigation/Breadcrumbs';

export default function TracksPage() {
  return (
    <ErrorBoundary>
      <PageHeader
        title="Track Collection"
        description="Browse and manage your music tracks"
      />
      <EnhancedAiLayout>
        <div className="mx-auto py-8 px-4 lg:px-8 overflow-visible">
          <TracksTable />
        </div>
      </EnhancedAiLayout>
    </ErrorBoundary>
  );
}
