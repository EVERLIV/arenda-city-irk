export function CatalogCardSkeleton() {
  return (
    <div className="flex h-full flex-col overflow-hidden border border-border bg-white">
      <div className="skeleton aspect-[16/10] w-full" />
      <div className="space-y-2 border-t border-border px-2.5 py-2">
        <div className="skeleton h-4 w-2/5 rounded-sm" />
        <div className="skeleton h-3 w-full rounded-sm" />
        <div className="skeleton h-3 w-3/4 rounded-sm" />
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

export function CatalogPageSkeleton({ count = 10 }: { count?: number }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
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
      <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_21rem] xl:items-start">
        <div>
          <div className="skeleton h-[260px] w-full rounded-xl sm:h-[300px] lg:h-[340px]" />
          <div className="space-y-4 border-t border-border pt-8">
            <div className="skeleton h-6 w-40 rounded-sm" />
            <div className="grid gap-4 sm:grid-cols-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex justify-between gap-3">
                  <div className="skeleton h-4 w-24 rounded-sm" />
                  <div className="skeleton h-4 w-20 rounded-sm" />
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-3 border-t border-border pt-8">
            <div className="skeleton h-6 w-32 rounded-sm" />
            <div className="skeleton h-4 w-full rounded-sm" />
            <div className="skeleton h-4 w-5/6 rounded-sm" />
            <div className="skeleton h-4 w-4/6 rounded-sm" />
          </div>
        </div>
        <div className="skeleton h-72 w-full rounded-xl" />
      </div>
    </div>
  );
}
