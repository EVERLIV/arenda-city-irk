"use client";

import {
  ObjectBannerCard,
  ObjectCardCompact,
} from "@/components/catalog/CatalogObjectCard";
import { getNewestObjects } from "@/lib/catalog/catalog-utils";
import { getObjectId, type ObjectRow } from "@/lib/supabase/objects";
import { cn } from "@/lib/utils";

export function NewObjectsBanner({
  objects,
  onShowNew,
}: {
  objects: ObjectRow[];
  onShowNew?: () => void;
}) {
  const newest = getNewestObjects(objects, 4);
  if (newest.length === 0) return null;

  const [featured, ...rest] = newest;

  return (
    <section className="border-b border-border bg-white">
      <div className="mx-auto max-w-[var(--content-width)] px-[var(--page-pad-x)] py-5">
        <div className="mb-3 flex items-baseline justify-between gap-3">
          <h2 className="text-base font-extrabold tracking-tight text-ink sm:text-lg">
            Новые объекты
          </h2>
          {onShowNew && (
            <button
              type="button"
              onClick={onShowNew}
              className="text-[11px] font-bold uppercase tracking-[0.12em] text-primary"
            >
              Только новые
            </button>
          )}
        </div>

        <div
          className={cn(
            "grid gap-3",
            rest.length === 0 && "grid-cols-1",
            rest.length === 1 && "sm:grid-cols-2",
            rest.length === 2 && "sm:grid-cols-2 lg:grid-cols-4",
            rest.length >= 3 && "sm:grid-cols-2 lg:grid-cols-5",
          )}
        >
          <div className={rest.length >= 3 ? "sm:col-span-2" : undefined}>
            <ObjectBannerCard object={featured} />
          </div>
          {rest.map((object, index) => (
            <ObjectCardCompact
              key={getObjectId(object) || `new-${index}`}
              object={object}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
