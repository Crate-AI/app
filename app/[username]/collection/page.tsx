import CrateExplorer from '@/components/Features/CrateExplorer/CrateExplorer'
import ErrorBoundary from '@/components/Error/ErrorBoundary'

export default function CollectionPage({ params }: { params: { username: string } }) {
  return (
    <ErrorBoundary>
      <CrateExplorer/>
    </ErrorBoundary>
  )
} 