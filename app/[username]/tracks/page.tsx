'use client';

import ErrorBoundary from '@/components/Error/ErrorBoundary'
import TracksTable from '@/features/crate-explorer/tracks/TracksTable'
import AiLayout from '@/features/ai-assistant/AiLayout'
import { PageHeader } from '@/components/layout/Navigation/Breadcrumbs'

export default function TracksPage() {
  return (
    <ErrorBoundary>
      <PageHeader 
        title="Track Collection" 
        description="Browse and manage your music tracks"
      />
      <AiLayout>
        <div className="mx-auto py-8 px-4 lg:px-8 overflow-visible">
          <TracksTable />
        </div>
      </AiLayout>
    </ErrorBoundary>
  )
} 