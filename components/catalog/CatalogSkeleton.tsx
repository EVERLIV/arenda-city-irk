export function CatalogCardSkeleton() {
  return (
    <div className="catalog-card-skeleton flex h-full flex-col overflow-hidden border border-border bg-white">
      <div className="skeleton aspect-[5/3] w-full" />
      <div className="space-y-3 border-t border-border p-4">
        <div className="skeleton h-6 w-2/5 rounded-sm" />
        <div className="skeleton h-4 w-full rounded-sm" />
        <div className="skeleton h-4 w-4/5 rounded-sm" />
        <div className="flex gap-2 pt-1">
          <div className="skeleton h-3 w-16 rounded-sm" />
          <div className="skeleton h-3 w-20 rounded-sm" />
        </div>
      </div>
    </div>
  );
}

export function CatalogListSkeleton() {
  return (
    <div className="catalog-list-skeleton grid gap-4 border border-border bg-white p-3 sm:grid-cols-[168px_1fr_auto] sm:items-center sm:p-4">
      <div className="skeleton aspect-[16/10] sm:aspect-auto sm:h-[108px]" />
      <div className="space-y-3">
        <div className="skeleton h-4 w-24 rounded-sm" />
        <div className="skeleton h-5 w-full rounded-sm" />
        <div className="skeleton h-3 w-2/3 rounded-sm" />
      </div>
      <div className="skeleton h-6 w-24 rounded-sm sm:justify-self-end" />
    </div>
  );
}

export function CatalogPageSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <CatalogCardSkeleton key={index} />
      ))}
    </div>
  );
}

export function ObjectDetailSkeleton() {
  return (
    <div className="space-y-6">
      <div className="skeleton h-4 w-56 rounded-sm" />
      <div className="space-y-3">
        <div className="skeleton h-8 w-3/4 rounded-sm" />
        <div className="skeleton h-4 w-1/2 rounded-sm" />
      </div>
      <div className="skeleton aspect-[16/10] w-full rounded-sm lg:min-h-[420px]" />
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_21rem]">
        <div className="space-y-4">
          <div className="skeleton h-48 w-full rounded-sm" />
          <div className="skeleton h-32 w-full rounded-sm" />
        </div>
        <div className="skeleton h-72 w-full rounded-sm" />
      </div>
    </div>
  );
}
