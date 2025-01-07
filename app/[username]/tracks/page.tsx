import ErrorBoundary from '@/components/Error/ErrorBoundary'

export default function TracksPage({ params }: { params: { username: string } }) {
  return (
    <ErrorBoundary>
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">Track Collection</h1>
        <p className="text-gray-600">
          Track view page is currently under development. Check back soon to view and manage your Track view.
        </p>
        <p className="text-sm text-gray-400 mt-4">
          Reference: <a href="https://github.com/orgs/Crate-AI/projects/1/views/2?pane=issue&itemId=92887012&issue=Crate-AI%7Capp%7C59" className="underline hover:text-gray-600">GitHub Issue #59</a>
        </p>
      </div>
    </ErrorBoundary>
  )
} 