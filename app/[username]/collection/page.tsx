import CrateExplorer from '@/features/crate-explorer/CrateExplorer';
import ErrorBoundary from '@/components/Error/ErrorBoundary';
import { PageHeader } from '@/components/layout/Navigation/Breadcrumbs';

export default function CollectionPage({
  params,
}: {
  params: { username: string };
}) {
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
