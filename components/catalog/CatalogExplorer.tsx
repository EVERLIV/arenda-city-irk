"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { LayoutGrid, List, SlidersHorizontal } from "lucide-react";
import {
  ActiveFilterChips,
  CatalogFiltersPanel,
  CatalogMobileFilters,
} from "@/components/catalog/CatalogFilters";
import {
  ObjectCardCompact,
  ObjectListItem,
} from "@/components/catalog/CatalogObjectCard";
import { Button } from "@/components/ui/button";
import {
  countActiveFilters,
  DEFAULT_FILTERS,
  extractFilterOptions,
  filterObjects,
  SORT_OPTIONS,
  sortObjects,
  type CatalogFilters,
  type SortOption,
  type ViewMode,
} from "@/lib/catalog/catalog-utils";
import {
  formatPrice,
  getObjectDealType,
  getObjectId,
  getObjectPrice,
  type ObjectRow,
} from "@/lib/supabase/objects";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerItem } from "@/components/motion/StaggerItem";

interface CatalogExplorerProps {
  objects: ObjectRow[];
}

export function CatalogExplorer({ objects }: CatalogExplorerProps) {
  const [filters, setFilters] = useState<CatalogFilters>(DEFAULT_FILTERS);
  const [sort, setSort] = useState<SortOption>("date-desc");
  const [view, setView] = useState<ViewMode>("grid");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const options = useMemo(() => extractFilterOptions(objects), [objects]);

  const filtered = useMemo(
    () => sortObjects(filterObjects(objects, filters), sort),
    [objects, filters, sort],
  );

  const activeFilters = countActiveFilters(filters);
  const minPrice = useMemo(() => {
    const prices = objects
      .map((object) => getObjectPrice(object))
      .filter((value): value is number => value != null);
    return prices.length ? Math.min(...prices) : null;
  }, [objects]);

  function resetFilters() {
    setFilters(DEFAULT_FILTERS);
  }

  const listKey = `${view}-${sort}-${activeFilters}-${filters.query}-${filtered.length}`;

  return (
    <div className="catalog-explorer">
      <div className="mb-6 grid gap-3 sm:grid-cols-3">
        <Reveal className="border border-border bg-white px-4 py-3 shadow-[var(--shadow-soft)]">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted">
            Объектов
          </p>
          <p className="mt-1 text-2xl font-extrabold text-ink">{objects.length}</p>
        </Reveal>
        <Reveal delay={80} className="border border-border bg-white px-4 py-3 shadow-[var(--shadow-soft)]">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted">
            Минимальная цена
          </p>
          <p className="mt-1 text-2xl font-extrabold text-primary">
            {formatPrice(minPrice, getObjectDealType(objects[0] ?? {}))}
          </p>
        </Reveal>
        <Reveal delay={160} className="border border-border bg-white px-4 py-3 shadow-[var(--shadow-soft)]">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted">
            Локации
          </p>
          <p className="mt-1 text-2xl font-extrabold text-ink">
            {options.districts.length}
          </p>
        </Reveal>
      </div>

      <div className="sticky top-0 z-30 -mx-6 border-y border-border bg-white/95 px-6 py-3 backdrop-blur-md lg:top-0">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="rounded-none lg:hidden"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <SlidersHorizontal className="h-4 w-4" />
              Фильтры
              {activeFilters > 0 && (
                <span className="ml-1 bg-primary px-1.5 py-0.5 text-[10px] text-white">
                  {activeFilters}
                </span>
              )}
            </Button>
            <p className="text-sm text-muted">
              Найдено:{" "}
              <strong className="text-ink">{filtered.length}</strong>
              {filtered.length !== objects.length && (
                <span> из {objects.length}</span>
              )}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <label className="sr-only" htmlFor="catalog-sort">
              Сортировка
            </label>
            <select
              id="catalog-sort"
              value={sort}
              onChange={(event) => setSort(event.target.value as SortOption)}
              className="h-9 border border-border bg-white px-3 text-sm font-semibold text-ink outline-none focus:border-primary"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <div className="flex border border-border">
              <button
                type="button"
                aria-label="Сетка"
                onClick={() => setView("grid")}
                className={cn(
                  "flex h-9 w-9 items-center justify-center transition-colors",
                  view === "grid"
                    ? "bg-primary text-white"
                    : "bg-white text-ink hover:bg-muted-bg",
                )}
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Список"
                onClick={() => setView("list")}
                className={cn(
                  "flex h-9 w-9 items-center justify-center border-l border-border transition-colors",
                  view === "list"
                    ? "bg-primary text-white"
                    : "bg-white text-ink hover:bg-muted-bg",
                )}
              >
                <List className="h-4 w-4" />
              </button>
            </div>

            <Link
              href="/contacts"
              className="hidden text-xs font-bold uppercase tracking-[0.12em] text-primary sm:inline-flex"
            >
              Заявка на подбор
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <ActiveFilterChips
          filters={filters}
          onChange={setFilters}
          onReset={resetFilters}
        />
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-[17rem_minmax(0,1fr)] xl:grid-cols-[18rem_minmax(0,1fr)]">
        <CatalogFiltersPanel
          filters={filters}
          options={options}
          onChange={setFilters}
          onReset={resetFilters}
          className="hidden lg:block"
        />

        <div>
          {filtered.length === 0 ? (
            <div className="border border-border bg-surface px-6 py-16 text-center">
              <p className="text-lg font-extrabold text-ink">
                По вашему запросу ничего не найдено
              </p>
              <p className="mt-2 text-sm text-muted">
                Попробуйте изменить фильтры или сбросить параметры поиска.
              </p>
              <Button
                variant="outline"
                className="mt-6 rounded-none"
                onClick={resetFilters}
              >
                Сбросить фильтры
              </Button>
            </div>
          ) : view === "grid" ? (
            <div
              key={listKey}
              className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
            >
              {filtered.map((object, index) => (
                <StaggerItem key={getObjectId(object) || String(index)} index={index}>
                  <ObjectCardCompact object={object} />
                </StaggerItem>
              ))}
            </div>
          ) : (
            <div key={listKey} className="space-y-3">
              {filtered.map((object, index) => (
                <StaggerItem key={getObjectId(object) || String(index)} index={index}>
                  <ObjectListItem object={object} />
                </StaggerItem>
              ))}
            </div>
          )}
        </div>
      </div>

      <CatalogMobileFilters
        open={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        filters={filters}
        options={options}
        onChange={setFilters}
        onReset={resetFilters}
      />
    </div>
  );
}
