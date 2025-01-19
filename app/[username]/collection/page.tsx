import CrateExplorer from '@/features/crate-explorer/CrateExplorer'
import ErrorBoundary from '@/components/Error/ErrorBoundary'

export default function CollectionPage({ params }: { params: { username: string } }) {
  return (
    <ErrorBoundary>
      <CrateExplorer/>
    </ErrorBoundary>
  )
} 