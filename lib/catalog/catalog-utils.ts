import {
  getObjectArea,
  getObjectDealType,
  getObjectDistrict,
  getObjectId,
  getObjectPrice,
  getObjectPublishedAt,
  getObjectSearchText,
  getObjectType,
  type ObjectRow,
} from "@/lib/supabase/objects";

export type SortOption =
  | "date-desc"
  | "date-asc"
  | "price-asc"
  | "price-desc"
  | "area-asc"
  | "area-desc";

export type ViewMode = "grid" | "list";

export interface CatalogFilters {
  dealType: string | null;
  type: string | null;
  district: string | null;
  priceMin: number | null;
  priceMax: number | null;
  areaMin: number | null;
  areaMax: number | null;
  query: string;
  onlyNew: boolean;
}

export const DEFAULT_FILTERS: CatalogFilters = {
  dealType: null,
  type: null,
  district: null,
  priceMin: null,
  priceMax: null,
  areaMin: null,
  areaMax: null,
  query: "",
  onlyNew: false,
};

export const NEW_OBJECT_DAYS = 30;

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "date-desc", label: "Сначала новые" },
  { value: "date-asc", label: "Сначала старые" },
  { value: "price-asc", label: "Дешевле" },
  { value: "price-desc", label: "Дороже" },
  { value: "area-asc", label: "Меньше площадь" },
  { value: "area-desc", label: "Больше площадь" },
];

function readSearchParam(
  source: URLSearchParams | Record<string, string | string[] | undefined>,
  key: string,
): string {
  if (source instanceof URLSearchParams) return source.get(key) ?? "";
  const value = source[key];
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

export function filtersFromSearchParams(
  source: URLSearchParams | Record<string, string | string[] | undefined>,
): CatalogFilters {
  const get = (key: string) => readSearchParam(source, key);
  const num = (key: string) => {
    const raw = get(key);
    if (!raw) return null;
    const parsed = Number(raw.replace(/\s/g, "").replace(",", "."));
    return Number.isFinite(parsed) ? parsed : null;
  };

  return {
    ...DEFAULT_FILTERS,
    query: get("q"),
    dealType: get("deal") || null,
    type: get("type") || null,
    district: get("district") || null,
    priceMin: num("priceMin"),
    priceMax: num("priceMax"),
    areaMin: num("areaMin"),
    areaMax: num("areaMax"),
    onlyNew: get("new") === "1",
  };
}

export function catalogSearchHref(filters: CatalogFilters): string {
  const params = new URLSearchParams();
  if (filters.query.trim()) params.set("q", filters.query.trim());
  if (filters.dealType) params.set("deal", filters.dealType);
  if (filters.type) params.set("type", filters.type);
  if (filters.district) params.set("district", filters.district);
  if (filters.priceMin != null) params.set("priceMin", String(filters.priceMin));
  if (filters.priceMax != null) params.set("priceMax", String(filters.priceMax));
  if (filters.areaMin != null) params.set("areaMin", String(filters.areaMin));
  if (filters.areaMax != null) params.set("areaMax", String(filters.areaMax));
  if (filters.onlyNew) params.set("new", "1");
  const query = params.toString();
  return query ? `/catalog?${query}` : "/catalog";
}

export function extractFilterOptions(objects: ObjectRow[]) {
  const dealTypes = new Set<string>();
  const types = new Set<string>();
  const districts = new Set<string>();
  let minPrice = Infinity;
  let maxPrice = 0;
  let minArea = Infinity;
  let maxArea = 0;

  for (const object of objects) {
    const dealType = getObjectDealType(object);
    const type = getObjectType(object);
    const district = getObjectDistrict(object);
    const price = getObjectPrice(object);
    const area = getObjectArea(object);

    if (dealType) dealTypes.add(dealType);
    if (type) types.add(type);
    if (district) districts.add(district);
    if (price != null) {
      minPrice = Math.min(minPrice, price);
      maxPrice = Math.max(maxPrice, price);
    }
    if (area != null) {
      minArea = Math.min(minArea, area);
      maxArea = Math.max(maxArea, area);
    }
  }

  return {
    dealTypes: [...dealTypes].sort((a, b) => a.localeCompare(b, "ru")),
    types: [...types].sort((a, b) => a.localeCompare(b, "ru")),
    districts: [...districts].sort((a, b) => a.localeCompare(b, "ru")),
    priceRange: {
      min: Number.isFinite(minPrice) ? minPrice : 0,
      max: maxPrice || 0,
    },
    areaRange: {
      min: Number.isFinite(minArea) ? minArea : 0,
      max: maxArea || 0,
    },
  };
}

export function countActiveFilters(filters: CatalogFilters): number {
  let count = 0;
  if (filters.dealType) count += 1;
  if (filters.type) count += 1;
  if (filters.district) count += 1;
  if (filters.priceMin != null) count += 1;
  if (filters.priceMax != null) count += 1;
  if (filters.areaMin != null) count += 1;
  if (filters.areaMax != null) count += 1;
  if (filters.query.trim()) count += 1;
  if (filters.onlyNew) count += 1;
  return count;
}

export function isNewObject(
  row: ObjectRow,
  days = NEW_OBJECT_DAYS,
): boolean {
  const published = getObjectPublishedAt(row);
  if (!published) return false;
  return Date.now() - published < days * 86_400_000;
}

export function getNewestObjects(objects: ObjectRow[], limit = 5): ObjectRow[] {
  return sortObjects(objects, "date-desc").slice(0, Math.min(limit, objects.length));
}

export function hasPublishDates(objects: ObjectRow[]): boolean {
  return objects.some((object) => getObjectPublishedAt(object) > 0);
}

export type FacetKey = "type" | "dealType" | "district";

export function countFacet(
  objects: ObjectRow[],
  filters: CatalogFilters,
  facet: FacetKey,
): Map<string, number> {
  const base = filterObjects(objects, { ...filters, [facet]: null, onlyNew: filters.onlyNew });
  const counts = new Map<string, number>();

  for (const object of base) {
    const key =
      facet === "type"
        ? getObjectType(object)
        : facet === "dealType"
          ? getObjectDealType(object)
          : getObjectDistrict(object);
    if (!key) continue;
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }

  return counts;
}

export function filterObjects(
  objects: ObjectRow[],
  filters: CatalogFilters,
): ObjectRow[] {
  const query = filters.query.trim().toLowerCase();

  return objects.filter((object) => {
    if (filters.dealType && getObjectDealType(object) !== filters.dealType) {
      return false;
    }
    if (filters.type && getObjectType(object) !== filters.type) {
      return false;
    }
    if (filters.district && getObjectDistrict(object) !== filters.district) {
      return false;
    }

    const price = getObjectPrice(object);
    if (filters.priceMin != null && (price == null || price < filters.priceMin)) {
      return false;
    }
    if (filters.priceMax != null && (price == null || price > filters.priceMax)) {
      return false;
    }

    const area = getObjectArea(object);
    if (filters.areaMin != null && (area == null || area < filters.areaMin)) {
      return false;
    }
    if (filters.areaMax != null && (area == null || area > filters.areaMax)) {
      return false;
    }

    if (query && !getObjectSearchText(object).includes(query)) {
      return false;
    }

    if (filters.onlyNew && !isNewObject(object)) {
      return false;
    }

    return true;
  });
}

export function sortObjects(
  objects: ObjectRow[],
  sort: SortOption,
): ObjectRow[] {
  const sorted = [...objects];

  sorted.sort((a, b) => {
    switch (sort) {
      case "price-asc":
        return (getObjectPrice(a) ?? Infinity) - (getObjectPrice(b) ?? Infinity);
      case "price-desc":
        return (getObjectPrice(b) ?? -1) - (getObjectPrice(a) ?? -1);
      case "area-asc":
        return (getObjectArea(a) ?? Infinity) - (getObjectArea(b) ?? Infinity);
      case "area-desc":
        return (getObjectArea(b) ?? -1) - (getObjectArea(a) ?? -1);
      case "date-asc":
        return getObjectPublishedAt(a) - getObjectPublishedAt(b);
      case "date-desc":
      default:
        return getObjectPublishedAt(b) - getObjectPublishedAt(a);
    }
  });

  return sorted;
}

export function getSimilarObjects(
  current: ObjectRow,
  objects: ObjectRow[],
  limit = 4,
): ObjectRow[] {
  const currentId = getObjectId(current);
  const others = objects.filter((object) => getObjectId(object) !== currentId);
  if (others.length === 0) return [];

  const currentDistrict = getObjectDistrict(current);
  const currentType = getObjectType(current);
  const currentDeal = getObjectDealType(current);

  const score = (object: ObjectRow) => {
    let value = 0;
    if (currentDistrict && getObjectDistrict(object) === currentDistrict) value += 3;
    if (currentType && getObjectType(object) === currentType) value += 2;
    if (currentDeal && getObjectDealType(object) === currentDeal) value += 1;
    return value;
  };

  return [...others]
    .sort((a, b) => score(b) - score(a))
    .slice(0, limit);
}
