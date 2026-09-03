"use client";

import { useMemo, useState } from "react";
import { LayoutGrid, List } from "lucide-react";
import { useDisclosure } from "@mantine/hooks";
import {
  ActiveFilterChips,
  CatalogFilterBar,
  CatalogMobileFilters,
} from "@/components/catalog/CatalogFilters";
import { NewObjectsBanner } from "@/components/catalog/NewObjectsBanner";
import {
  ObjectCardCompact,
  ObjectListItem,
} from "@/components/catalog/CatalogObjectCard";
import { Button } from "@/components/ui/button";
import {
  countActiveFilters,
  countFacet,
  DEFAULT_FILTERS,
  extractFilterOptions,
  filterObjects,
  hasPublishDates,
  SORT_OPTIONS,
  sortObjects,
  type CatalogFilters,
  type SortOption,
  type ViewMode,
} from "@/lib/catalog/catalog-utils";
import { getObjectId, type ObjectRow } from "@/lib/supabase/objects";
import { cn } from "@/lib/utils";

export function CatalogExplorer({
  objects,
  initialFilters = DEFAULT_FILTERS,
}: {
  objects: ObjectRow[];
  initialFilters?: CatalogFilters;
}) {
  const [filters, setFilters] = useState<CatalogFilters>(initialFilters);
  const [sort, setSort] = useState<SortOption>("date-desc");
  const [view, setView] = useState<ViewMode>("grid");
  const [mobileFiltersOpen, mobileFilters] = useDisclosure(false);

  const options = useMemo(() => extractFilterOptions(objects), [objects]);
  const hasDates = useMemo(() => hasPublishDates(objects), [objects]);
  const typeCounts = useMemo(
    () => countFacet(objects, filters, "type"),
    [objects, filters],
  );
  const dealCounts = useMemo(
    () => countFacet(objects, filters, "dealType"),
    [objects, filters],
  );

  const filtered = useMemo(
    () => sortObjects(filterObjects(objects, filters), sort),
    [objects, filters, sort],
  );

  const activeFilters = countActiveFilters(filters);

  function resetFilters() {
    setFilters(DEFAULT_FILTERS);
  }

  return (
    <div>
      <NewObjectsBanner
        objects={objects}
        onShowNew={
          hasDates
            ? () => setFilters((current) => ({ ...current, onlyNew: true }))
            : undefined
        }
      />

      <CatalogFilterBar
        filters={filters}
        options={options}
        typeCounts={typeCounts}
        dealCounts={dealCounts}
        hasDates={hasDates}
        resultCount={filtered.length}
        totalCount={objects.length}
        activeCount={activeFilters}
        onChange={setFilters}
        onReset={resetFilters}
        onOpenMobile={mobileFilters.open}
      />

      <div className="mx-auto max-w-[var(--content-width)] px-[var(--page-pad-x)] py-4">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <ActiveFilterChips
            filters={filters}
            onChange={setFilters}
            onReset={resetFilters}
            className="lg:hidden"
          />
          <div className="ml-auto flex items-center gap-2">
            <label className="sr-only" htmlFor="catalog-sort">
              Сортировка
            </label>
            <select
              id="catalog-sort"
              value={sort}
              onChange={(event) => setSort(event.target.value as SortOption)}
              className="h-8 border border-border bg-white px-2 text-[12px] font-semibold text-ink outline-none focus:border-primary"
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
                  "flex h-8 w-8 items-center justify-center",
                  view === "grid" ? "bg-primary text-white" : "bg-white text-ink hover:bg-muted-bg",
                )}
              >
                <LayoutGrid className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                aria-label="Список"
                onClick={() => setView("list")}
                className={cn(
                  "flex h-8 w-8 items-center justify-center border-l border-border",
                  view === "list" ? "bg-primary text-white" : "bg-white text-ink hover:bg-muted-bg",
                )}
              >
                <List className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="border border-border bg-white px-5 py-12 text-center">
            <p className="text-sm font-extrabold text-ink">Ничего не найдено</p>
            <p className="mt-1 text-[13px] text-muted">
              Измените фильтры или сбросьте параметры поиска.
            </p>
            <Button variant="outline" className="mt-4 h-9 rounded-none" onClick={resetFilters}>
              Сбросить фильтры
            </Button>
          </div>
        ) : view === "grid" ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
            {filtered.map((object, index) => (
              <ObjectCardCompact
                key={getObjectId(object) || String(index)}
                object={object}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map((object, index) => (
              <ObjectListItem
                key={getObjectId(object) || String(index)}
                object={object}
              />
            ))}
          </div>
        )}
      </div>

      <CatalogMobileFilters
        open={mobileFiltersOpen}
        onClose={mobileFilters.close}
        filters={filters}
        options={options}
        typeCounts={typeCounts}
        hasDates={hasDates}
        resultCount={filtered.length}
        onChange={setFilters}
        onReset={resetFilters}
      />
    </div>
  );
}
