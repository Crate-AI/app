import ErrorBoundary from '@/components/Error/ErrorBoundary'
import TracksTable from '@/features/crate-explorer/tracks/TracksTable'
import AiLayout from '@/features/ai-assistant/AiLayout'

export default function TracksPage({ params }: { params: { username: string } }) {
  return (
    <ErrorBoundary>
      <AiLayout>
        <div className="container mx-auto py-8 px-4 lg:px-8 overflow-visible">
          <h1 className="text-2xl font-bold mb-4">Track Collection</h1>
          <TracksTable />
        </div>
      </AiLayout>
    </ErrorBoundary>
  )
} 