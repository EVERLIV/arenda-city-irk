"use client";

import { useEffect } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useHotkeys } from "@mantine/hooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DEFAULT_FILTERS,
  type CatalogFilters,
} from "@/lib/catalog/catalog-utils";
import { cn } from "@/lib/utils";

export interface FilterOptions {
  dealTypes: string[];
  types: string[];
  districts: string[];
  priceRange: { min: number; max: number };
  areaRange: { min: number; max: number };
}

interface CatalogFilterBarProps {
  filters: CatalogFilters;
  options: FilterOptions;
  typeCounts: Map<string, number>;
  dealCounts: Map<string, number>;
  hasDates: boolean;
  resultCount: number;
  totalCount: number;
  activeCount: number;
  onChange: (filters: CatalogFilters) => void;
  onReset: () => void;
  onOpenMobile: () => void;
}

function parseNumber(value: string): number | null {
  if (!value.trim()) return null;
  const parsed = Number(value.replace(/\s/g, "").replace(",", "."));
  return Number.isFinite(parsed) ? parsed : null;
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "shrink-0 border px-2.5 py-1 text-[12px] font-semibold transition-colors",
        active
          ? "border-primary bg-primary-soft text-ink"
          : "border-border bg-white text-muted hover:border-primary/35 hover:text-ink",
      )}
    >
      {children}
    </button>
  );
}

function Segmented({
  value,
  options,
  counts,
  onChange,
}: {
  value: string | null;
  options: string[];
  counts?: Map<string, number>;
  onChange: (next: string | null) => void;
}) {
  if (options.length === 0) return null;

  return (
    <div className="flex shrink-0 border border-border">
      <button
        type="button"
        onClick={() => onChange(null)}
        className={cn(
          "h-9 px-3 text-[12px] font-semibold transition-colors",
          value == null ? "bg-primary text-white" : "bg-white text-ink hover:bg-muted-bg",
        )}
      >
        Все
      </button>
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(value === option ? null : option)}
          className={cn(
            "h-9 border-l border-border px-3 text-[12px] font-semibold transition-colors",
            value === option
              ? "bg-primary text-white"
              : "bg-white text-ink hover:bg-muted-bg",
          )}
        >
          {option}
          {counts?.has(option) ? (
            <span className="ml-1.5 font-medium opacity-70">{counts.get(option)}</span>
          ) : null}
        </button>
      ))}
    </div>
  );
}

export function CatalogFilterBar({
  filters,
  options,
  typeCounts,
  dealCounts,
  hasDates,
  resultCount,
  totalCount,
  activeCount,
  onChange,
  onReset,
  onOpenMobile,
}: CatalogFilterBarProps) {
  function update<K extends keyof CatalogFilters>(key: K, value: CatalogFilters[K]) {
    onChange({ ...filters, [key]: value });
  }

  const visibleTypes = options.types.filter((type) => (typeCounts.get(type) ?? 0) > 0);
  const active = [
    filters.dealType,
    filters.type,
    filters.district,
    filters.onlyNew,
  ].some(Boolean) ||
    filters.priceMin != null ||
    filters.priceMax != null ||
    filters.areaMin != null ||
    filters.areaMax != null ||
    Boolean(filters.query.trim());

  return (
    <div className="catalog-filter-bar relative sticky top-[var(--site-header-offset)] z-20 -mt-px border-b border-border bg-white shadow-[0_-1px_0_0_#fff]">
      <div className="mx-auto max-w-[1320px] space-y-2 bg-white px-6 py-2.5">
        <div className="flex flex-wrap items-center gap-2">
          <label className="relative min-w-[12rem] flex-1">
            <span className="sr-only">Поиск по каталогу</span>
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted" />
            <Input
              value={filters.query}
              onChange={(event) => update("query", event.target.value)}
              placeholder="Адрес, район, тип…"
              className="h-9 rounded-none border-border bg-white pl-8 text-[13px]"
            />
          </label>

          <div className="hidden md:block">
            <Segmented
              value={filters.dealType}
              options={options.dealTypes}
              counts={dealCounts}
              onChange={(dealType) => update("dealType", dealType)}
            />
          </div>

          <p className="ml-auto text-[12px] text-muted">
            <span className="font-bold text-ink">{resultCount}</span>
            {resultCount !== totalCount ? ` из ${totalCount}` : " объектов"}
          </p>

          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-9 rounded-none lg:hidden"
            onClick={onOpenMobile}
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Фильтры
            {activeCount > 0 ? (
              <span className="bg-primary px-1.5 py-0.5 text-[10px] text-white">
                {activeCount}
              </span>
            ) : null}
          </Button>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <Chip active={filters.type == null} onClick={() => update("type", null)}>
            Все типы
          </Chip>
          {visibleTypes.map((type) => (
            <Chip
              key={type}
              active={filters.type === type}
              onClick={() => update("type", filters.type === type ? null : type)}
            >
              {type}
              <span className="ml-1.5 font-medium text-muted">{typeCounts.get(type)}</span>
            </Chip>
          ))}
          {hasDates && (
            <Chip
              active={filters.onlyNew}
              onClick={() => update("onlyNew", !filters.onlyNew)}
            >
              Только новые
            </Chip>
          )}
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          {options.districts.length > 0 && (
            <select
              aria-label="Район"
              value={filters.district ?? ""}
              onChange={(event) => update("district", event.target.value || null)}
              className="h-9 min-w-[10rem] border border-border bg-white px-2.5 text-[12px] text-ink outline-none focus:border-primary"
            >
              <option value="">Все районы</option>
              {options.districts.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
          )}

          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-muted">
              ₽
            </span>
            <Input
              inputMode="numeric"
              placeholder="от"
              value={filters.priceMin ?? ""}
              onChange={(event) => update("priceMin", parseNumber(event.target.value))}
              className="h-9 w-[5.5rem] rounded-none px-2 text-[12px]"
            />
            <Input
              inputMode="numeric"
              placeholder="до"
              value={filters.priceMax ?? ""}
              onChange={(event) => update("priceMax", parseNumber(event.target.value))}
              className="h-9 w-[5.5rem] rounded-none px-2 text-[12px]"
            />
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-muted">
              м²
            </span>
            <Input
              inputMode="numeric"
              placeholder="от"
              value={filters.areaMin ?? ""}
              onChange={(event) => update("areaMin", parseNumber(event.target.value))}
              className="h-9 w-[4.5rem] rounded-none px-2 text-[12px]"
            />
            <Input
              inputMode="numeric"
              placeholder="до"
              value={filters.areaMax ?? ""}
              onChange={(event) => update("areaMax", parseNumber(event.target.value))}
              className="h-9 w-[4.5rem] rounded-none px-2 text-[12px]"
            />
          </div>

          {active && (
            <button
              type="button"
              onClick={onReset}
              className="ml-auto text-[11px] font-bold uppercase tracking-[0.12em] text-primary"
            >
              Сбросить
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export function CatalogMobileFilters({
  open,
  onClose,
  filters,
  options,
  typeCounts,
  hasDates,
  resultCount,
  onChange,
  onReset,
}: {
  open: boolean;
  onClose: () => void;
  filters: CatalogFilters;
  options: FilterOptions;
  typeCounts: Map<string, number>;
  hasDates: boolean;
  resultCount: number;
  onChange: (filters: CatalogFilters) => void;
  onReset: () => void;
}) {
  useHotkeys([["Escape", () => open && onClose()]]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  if (!open) return null;

  function update<K extends keyof CatalogFilters>(key: K, value: CatalogFilters[K]) {
    onChange({ ...filters, [key]: value });
  }

  const visibleTypes = options.types.filter((type) => (typeCounts.get(type) ?? 0) > 0);

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <button
        type="button"
        aria-label="Закрыть фильтры"
        className="absolute inset-0 bg-black/45"
        onClick={onClose}
      />
      <div className="absolute inset-y-0 right-0 flex w-[min(100%,22rem)] flex-col bg-white">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <p className="text-[13px] font-extrabold text-ink">Фильтры</p>
          <Button variant="ghost" size="icon" className="h-9 w-9" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex-1 space-y-5 overflow-y-auto px-4 py-4">
          <div>
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.12em] text-muted">
              Сделка
            </p>
            <Segmented
              value={filters.dealType}
              options={options.dealTypes}
              onChange={(dealType) => update("dealType", dealType)}
            />
          </div>
          <div>
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.12em] text-muted">
              Тип
            </p>
            <div className="flex flex-wrap gap-1.5">
              <Chip active={filters.type == null} onClick={() => update("type", null)}>
                Все
              </Chip>
              {visibleTypes.map((type) => (
                <Chip
                  key={type}
                  active={filters.type === type}
                  onClick={() => update("type", filters.type === type ? null : type)}
                >
                  {type}
                </Chip>
              ))}
            </div>
          </div>
          {options.districts.length > 0 && (
            <div>
              <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.12em] text-muted">
                Район
              </p>
              <select
                value={filters.district ?? ""}
                onChange={(event) => update("district", event.target.value || null)}
                className="h-9 w-full border border-border bg-white px-2.5 text-[13px] outline-none focus:border-primary"
              >
                <option value="">Все районы</option>
                {options.districts.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div>
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.12em] text-muted">
              Цена, ₽
            </p>
            <div className="grid grid-cols-2 gap-2">
              <Input
                inputMode="numeric"
                placeholder="от"
                value={filters.priceMin ?? ""}
                onChange={(event) => update("priceMin", parseNumber(event.target.value))}
                className="h-9 rounded-none"
              />
              <Input
                inputMode="numeric"
                placeholder="до"
                value={filters.priceMax ?? ""}
                onChange={(event) => update("priceMax", parseNumber(event.target.value))}
                className="h-9 rounded-none"
              />
            </div>
          </div>
          <div>
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.12em] text-muted">
              Площадь, м²
            </p>
            <div className="grid grid-cols-2 gap-2">
              <Input
                inputMode="numeric"
                placeholder="от"
                value={filters.areaMin ?? ""}
                onChange={(event) => update("areaMin", parseNumber(event.target.value))}
                className="h-9 rounded-none"
              />
              <Input
                inputMode="numeric"
                placeholder="до"
                value={filters.areaMax ?? ""}
                onChange={(event) => update("areaMax", parseNumber(event.target.value))}
                className="h-9 rounded-none"
              />
            </div>
          </div>
          {hasDates && (
            <label className="flex items-center gap-2 text-[13px] text-ink">
              <input
                type="checkbox"
                checked={filters.onlyNew}
                onChange={(event) => update("onlyNew", event.target.checked)}
                className="accent-primary"
              />
              Только новые
            </label>
          )}
        </div>
        <div className="flex gap-2 border-t border-border p-3">
          <Button variant="outline" className="h-10 flex-1 rounded-none" onClick={onReset}>
            Сбросить
          </Button>
          <Button className="h-10 flex-1 rounded-none" onClick={onClose}>
            Показать {resultCount}
          </Button>
        </div>
      </div>
    </div>
  );
}

export function ActiveFilterChips({
  filters,
  onChange,
  onReset,
  className,
}: {
  filters: CatalogFilters;
  onChange: (filters: CatalogFilters) => void;
  onReset: () => void;
  className?: string;
}) {
  const chips: { key: keyof CatalogFilters; label: string }[] = [];

  if (filters.dealType) chips.push({ key: "dealType", label: filters.dealType });
  if (filters.type) chips.push({ key: "type", label: filters.type });
  if (filters.district) chips.push({ key: "district", label: filters.district });
  if (filters.priceMin != null) {
    chips.push({
      key: "priceMin",
      label: `от ${filters.priceMin.toLocaleString("ru-RU")} ₽`,
    });
  }
  if (filters.priceMax != null) {
    chips.push({
      key: "priceMax",
      label: `до ${filters.priceMax.toLocaleString("ru-RU")} ₽`,
    });
  }
  if (filters.areaMin != null) chips.push({ key: "areaMin", label: `от ${filters.areaMin} м²` });
  if (filters.areaMax != null) chips.push({ key: "areaMax", label: `до ${filters.areaMax} м²` });
  if (filters.query.trim()) chips.push({ key: "query", label: `«${filters.query.trim()}»` });
  if (filters.onlyNew) chips.push({ key: "onlyNew", label: "Новые" });

  if (chips.length === 0) return null;

  return (
    <div className={cn("flex flex-wrap items-center gap-1.5", className)}>
      {chips.map((chip) => (
        <button
          key={chip.key}
          type="button"
          onClick={() =>
            onChange({
              ...filters,
              [chip.key]: DEFAULT_FILTERS[chip.key],
            })
          }
          className="inline-flex items-center gap-1 border border-border bg-white px-2 py-1 text-[11px] font-semibold text-ink"
        >
          {chip.label}
          <X className="h-3 w-3 text-muted" />
        </button>
      ))}
      <button
        type="button"
        onClick={onReset}
        className="text-[11px] font-bold uppercase tracking-[0.1em] text-primary"
      >
        Сбросить
      </button>
    </div>
  );
}
