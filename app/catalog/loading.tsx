import { PageContainer } from "@/components/design-system";
import { CatalogPageSkeleton } from "@/components/catalog/CatalogSkeleton";
import { PageHero } from "@/components/layout/PageHero";

export default function CatalogLoading() {
  return (
    <>
      <PageHero
        eyebrow="Каталог"
        title="Объекты АрендаСити"
        description="Загружаем актуальные предложения..."
      />
      <PageContainer className="py-10 lg:py-12" size="wide">
        <div className="mb-6 grid gap-3 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="border border-border bg-white px-4 py-3">
              <div className="skeleton h-3 w-24 rounded-sm" />
              <div className="skeleton mt-3 h-8 w-16 rounded-sm" />
            </div>
          ))}
        </div>
        <CatalogPageSkeleton />
      </PageContainer>
    </>
  );
}
