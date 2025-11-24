import { createFileRoute } from '@tanstack/react-router';
import CrateExplorer from '@/features/crate-explorer/CrateExplorer';
import ErrorBoundary from '@/components/Error/ErrorBoundary';
import { PageHeader } from '@/components/layout/Navigation/Breadcrumbs';

export const Route = createFileRoute('/$username/collection')({
  component: CollectionPage,
});

function CollectionPage() {
  return (
    <>
      <PageHeader
        title="Collection Explorer"
        description="Browse your Discogs collection and discover new music"
      />
      <ErrorBoundary>
        <CrateExplorer />
      </ErrorBoundary>
    </>
  );
}
