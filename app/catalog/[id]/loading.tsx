import { PageContainer } from "@/components/design-system";
import { ObjectDetailSkeleton } from "@/components/catalog/CatalogSkeleton";

export default function CatalogObjectLoading() {
  return (
    <PageContainer className="py-8 sm:py-10 lg:py-12" size="wide">
      <ObjectDetailSkeleton />
    </PageContainer>
  );
}
