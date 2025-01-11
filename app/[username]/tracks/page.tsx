import ErrorBoundary from '@/components/Error/ErrorBoundary'
import TracksTable from '@/components/Features/CrateExplorer/TracksTable'
import AIDJLayout from '@/components/Features/AIDJAssistant/AIDJLayout'

export default function TracksPage({ params }: { params: { username: string } }) {
  return (
    <ErrorBoundary>
      <AIDJLayout>
        <div className="container mx-auto py-8 px-4">
          <h1 className="text-2xl font-bold mb-4">Track Collection</h1>
          <TracksTable />
        </div>
      </AIDJLayout>
    </ErrorBoundary>
  )
} 