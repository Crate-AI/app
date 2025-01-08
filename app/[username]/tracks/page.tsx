import ErrorBoundary from '@/components/Error/ErrorBoundary'
import TracksTable from '@/components/Features/CrateExplorer/TracksTable'

export default function TracksPage({ params }: { params: { username: string } }) {
  return (
    <ErrorBoundary>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-4">Track Collection</h1>
        <TracksTable />
      </div>
    </ErrorBoundary>
  )
} 