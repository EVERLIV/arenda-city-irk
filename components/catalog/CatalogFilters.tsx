"use client";

import { SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DEFAULT_FILTERS,
  type CatalogFilters,
} from "@/lib/catalog/catalog-utils";
import { cn } from "@/lib/utils";

interface CatalogFiltersPanelProps {
  filters: CatalogFilters;
  options: {
    dealTypes: string[];
    types: string[];
    districts: string[];
    priceRange: { min: number; max: number };
    areaRange: { min: number; max: number };
  };
  onChange: (filters: CatalogFilters) => void;
  onReset: () => void;
  className?: string;
}

function FilterPills({
  label,
  value,
  options,
  onSelect,
}: {
  label: string;
  value: string | null;
  options: string[];
  onSelect: (next: string | null) => void;
}) {
  return (
    <div className="space-y-2.5">
      <Label className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted">
        {label}
      </Label>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onSelect(null)}
          className={cn(
            "border px-3 py-1.5 text-xs font-semibold transition-colors",
            value == null
              ? "border-primary bg-primary text-white"
              : "border-border bg-white text-ink hover:border-primary/30",
          )}
        >
          Все
        </button>
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onSelect(option)}
            className={cn(
              "border px-3 py-1.5 text-xs font-semibold transition-colors",
              value === option
                ? "border-primary bg-primary text-white"
                : "border-border bg-white text-ink hover:border-primary/30",
            )}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export function CatalogFiltersPanel({
  filters,
  options,
  onChange,
  onReset,
  className,
}: CatalogFiltersPanelProps) {
  function update<K extends keyof CatalogFilters>(key: K, value: CatalogFilters[K]) {
    onChange({ ...filters, [key]: value });
  }

  function parseNumber(value: string): number | null {
    if (!value.trim()) return null;
    const parsed = Number(value.replace(/\s/g, ""));
    return Number.isFinite(parsed) ? parsed : null;
  }

  return (
    <aside className={cn("catalog-filters space-y-6", className)}>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-extrabold uppercase tracking-[0.12em] text-ink">
            Фильтры
          </h2>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="text-xs font-bold uppercase tracking-[0.1em] text-primary"
        >
          Сбросить
        </button>
      </div>

      <div className="space-y-2.5">
        <Label
          htmlFor="catalog-search"
          className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted"
        >
          Поиск
        </Label>
        <Input
          id="catalog-search"
          value={filters.query}
          onChange={(event) => update("query", event.target.value)}
          placeholder="Адрес, район, тип..."
          className="h-10 rounded-none border-border bg-white"
        />
      </div>

      <FilterPills
        label="Сделка"
        value={filters.dealType}
        options={options.dealTypes}
        onSelect={(dealType) => update("dealType", dealType)}
      />

      <FilterPills
        label="Тип объекта"
        value={filters.type}
        options={options.types}
        onSelect={(type) => update("type", type)}
      />

      {options.districts.length > 0 && (
        <div className="space-y-2.5">
          <Label
            htmlFor="catalog-district"
            className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted"
          >
            Район / город
          </Label>
          <select
            id="catalog-district"
            value={filters.district ?? ""}
            onChange={(event) =>
              update("district", event.target.value || null)
            }
            className="h-10 w-full border border-border bg-white px-3 text-sm text-ink outline-none focus:border-primary"
          >
            <option value="">Все</option>
            {options.districts.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="space-y-2.5">
        <Label className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted">
          Цена, ₽
        </Label>
        <div className="grid grid-cols-2 gap-2">
          <Input
            inputMode="numeric"
            placeholder={`от ${options.priceRange.min || 0}`}
            value={filters.priceMin ?? ""}
            onChange={(event) =>
              update("priceMin", parseNumber(event.target.value))
            }
            className="h-10 rounded-none border-border bg-white"
          />
          <Input
            inputMode="numeric"
            placeholder={`до ${options.priceRange.max || "—"}`}
            value={filters.priceMax ?? ""}
            onChange={(event) =>
              update("priceMax", parseNumber(event.target.value))
            }
            className="h-10 rounded-none border-border bg-white"
          />
        </div>
      </div>

      <div className="space-y-2.5">
        <Label className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted">
          Площадь, м²
        </Label>
        <div className="grid grid-cols-2 gap-2">
          <Input
            inputMode="numeric"
            placeholder={`от ${options.areaRange.min || 0}`}
            value={filters.areaMin ?? ""}
            onChange={(event) =>
              update("areaMin", parseNumber(event.target.value))
            }
            className="h-10 rounded-none border-border bg-white"
          />
          <Input
            inputMode="numeric"
            placeholder={`до ${options.areaRange.max || "—"}`}
            value={filters.areaMax ?? ""}
            onChange={(event) =>
              update("areaMax", parseNumber(event.target.value))
            }
            className="h-10 rounded-none border-border bg-white"
          />
        </div>
      </div>
    </aside>
  );
}

export function CatalogMobileFilters({
  open,
  onClose,
  ...props
}: CatalogFiltersPanelProps & { open: boolean; onClose: () => void }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <button
        type="button"
        aria-label="Закрыть фильтры"
        className="absolute inset-0 bg-black/45"
        onClick={onClose}
      />
      <div className="absolute inset-y-0 left-0 flex w-[min(100%,22rem)] flex-col bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <p className="text-sm font-extrabold uppercase tracking-[0.12em] text-ink">
            Фильтры
          </p>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto p-5">
          <CatalogFiltersPanel {...props} />
        </div>
        <div className="border-t border-border p-4">
          <Button className="w-full rounded-none" onClick={onClose}>
            Показать результаты
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
}: {
  filters: CatalogFilters;
  onChange: (filters: CatalogFilters) => void;
  onReset: () => void;
}) {
  const chips: { key: keyof CatalogFilters; label: string }[] = [];

  if (filters.dealType) {
    chips.push({ key: "dealType", label: filters.dealType });
  }
  if (filters.type) chips.push({ key: "type", label: filters.type });
  if (filters.district) chips.push({ key: "district", label: filters.district });
  if (filters.priceMin != null) {
    chips.push({ key: "priceMin", label: `от ${filters.priceMin} ₽` });
  }
  if (filters.priceMax != null) {
    chips.push({ key: "priceMax", label: `до ${filters.priceMax} ₽` });
  }
  if (filters.areaMin != null) {
    chips.push({ key: "areaMin", label: `от ${filters.areaMin} м²` });
  }
  if (filters.areaMax != null) {
    chips.push({ key: "areaMax", label: `до ${filters.areaMax} м²` });
  }
  if (filters.query.trim()) {
    chips.push({ key: "query", label: `«${filters.query.trim()}»` });
  }

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
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
          className="inline-flex items-center gap-1.5 border border-border bg-white px-3 py-1.5 text-xs font-semibold text-ink"
        >
          {chip.label}
          <X className="h-3.5 w-3.5 text-muted" />
        </button>
      ))}
      <button
        type="button"
        onClick={onReset}
        className="text-xs font-bold uppercase tracking-[0.1em] text-primary"
      >
        Сбросить всё
      </button>
    </div>
  );
}
