import { CatalogPageSkeleton } from "@/components/catalog/CatalogSkeleton";

export default function CatalogLoading() {
  return (
    <>
      <section className="border-b border-border bg-white">
        <div className="mx-auto max-w-[1320px] px-6 py-5">
          <div className="skeleton h-3 w-20 rounded-sm" />
          <div className="skeleton mt-2 h-7 w-56 rounded-sm" />
        </div>
      </section>
      <div className="mx-auto max-w-[1320px] px-6 py-5">
        <CatalogPageSkeleton />
      </div>
    </>
  );
}
