"use client";

import { useDeferredValue, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { ObjectCardCompact } from "@/components/catalog/CatalogObjectCard";
import { CallbackDialog } from "@/components/forms/CallbackDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  catalogSearchHref,
  countFacet,
  DEFAULT_FILTERS,
  extractFilterOptions,
  filterObjects,
  sortObjects,
  type CatalogFilters,
} from "@/lib/catalog/catalog-utils";
import { siteConfig } from "@/lib/site-config";
import { getObjectId, type ObjectRow } from "@/lib/supabase/objects";
import { cn } from "@/lib/utils";

const PREVIEW_LIMIT = 8;

export function HomeIntro({ objects }: { objects: ObjectRow[] }) {
  const router = useRouter();
  const [filters, setFilters] = useState<CatalogFilters>(DEFAULT_FILTERS);
  const deferredQuery = useDeferredValue(filters.query);

  const options = useMemo(() => extractFilterOptions(objects), [objects]);
  const typeCounts = useMemo(
    () => countFacet(objects, filters, "type"),
    [objects, filters],
  );

  const matched = useMemo(
    () =>
      sortObjects(
        filterObjects(objects, { ...filters, query: deferredQuery }),
        "date-desc",
      ),
    [objects, filters, deferredQuery],
  );
  const visible = matched.slice(0, PREVIEW_LIMIT);
  const catalogHref = catalogSearchHref(filters);

  function update<K extends keyof CatalogFilters>(key: K, value: CatalogFilters[K]) {
    setFilters((current) => ({ ...current, [key]: value }));
  }

  const dealTypes =
    options.dealTypes.length > 0 ? options.dealTypes : ["Аренда", "Продажа"];
  const types = options.types.filter((type) => (typeCounts.get(type) ?? 0) > 0);

  return (
    <section className="border-b border-border bg-white">
      <div className="mx-auto max-w-[var(--content-width)] px-[var(--page-pad-x)] pb-8 pt-5">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <p className="text-[13px] text-muted">
            <span className="font-semibold text-ink">{siteConfig.name}</span>
            <span className="mx-2 text-border">·</span>
            {siteConfig.region}
          </p>
          <a
            href={siteConfig.phoneHref}
            className="text-[13px] font-bold text-ink hover:text-primary"
          >
            {siteConfig.phone}
          </a>
        </div>

        <h1 className="text-xl font-extrabold tracking-tight text-ink sm:text-2xl">
          Найти объект
        </h1>

        <form
          className="mt-4 border border-border bg-white"
          onSubmit={(event) => {
            event.preventDefault();
            router.push(catalogHref);
          }}
        >
          <div className="grid gap-0 lg:grid-cols-[auto_11rem_12rem_minmax(0,1fr)_auto]">
            <div className="flex border-b border-border lg:border-b-0 lg:border-r">
              <button
                type="button"
                onClick={() => update("dealType", null)}
                className={cn(
                  "h-11 px-4 text-[13px] font-semibold",
                  filters.dealType == null
                    ? "bg-primary text-white"
                    : "bg-white text-ink hover:bg-muted-bg",
                )}
              >
                Все
              </button>
              {dealTypes.map((deal) => (
                <button
                  key={deal}
                  type="button"
                  onClick={() =>
                    update("dealType", filters.dealType === deal ? null : deal)
                  }
                  className={cn(
                    "h-11 border-l border-border px-4 text-[13px] font-semibold",
                    filters.dealType === deal
                      ? "bg-primary text-white"
                      : "bg-white text-ink hover:bg-muted-bg",
                  )}
                >
                  {deal}
                </button>
              ))}
            </div>

            <select
              aria-label="Тип объекта"
              value={filters.type ?? ""}
              onChange={(event) => update("type", event.target.value || null)}
              className="h-11 border-b border-border bg-white px-3 text-[13px] text-ink outline-none focus:border-primary lg:border-b-0 lg:border-r"
            >
              <option value="">Тип объекта</option>
              {options.types.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

            <select
              aria-label="Район"
              value={filters.district ?? ""}
              onChange={(event) => update("district", event.target.value || null)}
              className="h-11 border-b border-border bg-white px-3 text-[13px] text-ink outline-none focus:border-primary lg:border-b-0 lg:border-r"
            >
              <option value="">Район / город</option>
              {options.districts.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>

            <label className="relative border-b border-border lg:border-b-0 lg:border-r">
              <span className="sr-only">Поиск по адресу</span>
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <Input
                value={filters.query}
                onChange={(event) => update("query", event.target.value)}
                placeholder="Адрес, район, кадастр…"
                className="h-11 rounded-none border-0 pl-9 text-[13px] focus-visible:ring-0"
              />
            </label>

            <Button
              type="submit"
              className="h-11 rounded-none px-6 text-[12px] font-bold uppercase tracking-[0.08em]"
            >
              Найти
            </Button>
          </div>
        </form>

        {types.length > 0 && (
          <div className="mt-3 flex gap-2 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <button
              type="button"
              onClick={() => update("type", null)}
              className={cn(
                "shrink-0 border px-2.5 py-1 text-[12px] font-semibold",
                filters.type == null
                  ? "border-primary bg-primary-soft text-ink"
                  : "border-border text-muted hover:text-ink",
              )}
            >
              Все типы
            </button>
            {types.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => update("type", filters.type === type ? null : type)}
                className={cn(
                  "shrink-0 border px-2.5 py-1 text-[12px] font-semibold",
                  filters.type === type
                    ? "border-primary bg-primary-soft text-ink"
                    : "border-border text-muted hover:text-ink",
                )}
              >
                {type}
                <span className="ml-1.5 font-medium text-muted">
                  {typeCounts.get(type)}
                </span>
              </button>
            ))}
          </div>
        )}

        <div className="mt-6 flex flex-wrap items-baseline justify-between gap-2">
          <p className="text-[13px] text-muted">
            {objects.length === 0 ? (
              "Каталог скоро откроется"
            ) : (
              <>
                <span className="font-bold text-ink">{matched.length}</span>
                {matched.length === objects.length
                  ? " объектов"
                  : ` из ${objects.length}`}
              </>
            )}
          </p>
          <Link
            href={catalogHref}
            className="text-[11px] font-bold uppercase tracking-[0.12em] text-primary"
          >
            Весь каталог →
          </Link>
        </div>

        {visible.length > 0 ? (
          <div className="mt-4 grid grid-cols-1 gap-x-5 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
            {visible.map((object, index) => (
              <ObjectCardCompact
                key={getObjectId(object) || String(index)}
                object={object}
              />
            ))}
          </div>
        ) : objects.length > 0 ? (
          <p className="mt-6 text-[13px] text-muted">
            По этим условиям ничего нет. Сбросьте фильтр или откройте весь каталог.
          </p>
        ) : null}

        {matched.length > PREVIEW_LIMIT && (
          <div className="mt-5">
            <Link
              href={catalogHref}
              className="inline-flex border border-border px-4 py-2 text-[12px] font-bold uppercase tracking-[0.08em] text-ink hover:border-primary/40 hover:text-primary"
            >
              Показать все {matched.length}
            </Link>
          </div>
        )}

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
          <div>
            <a
              href={siteConfig.phoneHref}
              className="text-lg font-extrabold tracking-tight text-ink hover:text-primary"
            >
              {siteConfig.phone}
            </a>
            <p className="text-[12px] text-muted">{siteConfig.workingHoursFull}</p>
          </div>
          <CallbackDialog
            triggerLabel="Перезвоните мне"
            triggerClassName="rounded-none px-5 font-bold uppercase tracking-[0.08em]"
          />
        </div>
      </div>
    </section>
  );
}
