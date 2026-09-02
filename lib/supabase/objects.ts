export type ObjectRow = Record<string, unknown> & {
  id?: string | number;
};

const IMAGE_KEYS = [
  "photo",
  "photos",
  "image",
  "images",
  "image_url",
  "image_urls",
  "photo_url",
  "photo_urls",
  "cover_photo",
  "cover_url",
  "thumbnail",
  "main_photo",
  "gallery",
  "media",
];

const TITLE_KEYS = [
  "title",
  "name",
  "address",
  "full_address",
  "object_name",
  "property_title",
  "название",
  "наименование",
  "адрес",
];

const DESCRIPTION_KEYS = [
  "description",
  "описание",
  "desc",
  "about",
  "text",
  "content",
];

function asString(value: unknown): string | null {
  if (typeof value === "string" && value.trim()) return value.trim();
  if (typeof value === "number") return String(value);
  return null;
}

function collectUrls(value: unknown): string[] {
  if (!value) return [];
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return [];
    if (trimmed.startsWith("[") || trimmed.startsWith("{")) {
      try {
        return collectUrls(JSON.parse(trimmed));
      } catch {
        return trimmed.startsWith("http") ? [trimmed] : [];
      }
    }
    return trimmed.startsWith("http") || trimmed.startsWith("/")
      ? [trimmed]
      : [];
  }
  if (Array.isArray(value)) {
    return value.flatMap((item) => collectUrls(item));
  }
  if (typeof value === "object") {
    const record = value as Record<string, unknown>;
    return [
      ...collectUrls(record.url),
      ...collectUrls(record.src),
      ...collectUrls(record.path),
      ...collectUrls(record.publicUrl),
      ...collectUrls(record.public_url),
    ];
  }
  return [];
}

export function getObjectId(row: ObjectRow): string {
  const id = row.id ?? row.uuid ?? row.slug ?? row.object_id;
  return id != null ? String(id) : "";
}

export function getObjectTitle(row: ObjectRow): string {
  for (const key of TITLE_KEYS) {
    const value = asString(row[key]);
    if (value) return value;
  }
  const id = getObjectId(row);
  return id ? `Объект ${id}` : "Объект";
}

export function getObjectDescription(row: ObjectRow): string | null {
  for (const key of DESCRIPTION_KEYS) {
    const value = asString(row[key]);
    if (value) return value;
  }
  return null;
}

export function getObjectPhotos(row: ObjectRow): string[] {
  const urls: string[] = [];
  for (const key of IMAGE_KEYS) {
    if (key in row) urls.push(...collectUrls(row[key]));
  }
  return [...new Set(urls)];
}

export function getObjectFields(row: ObjectRow): { key: string; value: string }[] {
  const skip = new Set([
    ...IMAGE_KEYS,
    ...DESCRIPTION_KEYS.map((k) => k),
    "id",
    "uuid",
    "agency_id",
    "created_at",
    "updated_at",
    "deleted_at",
  ]);

  return Object.entries(row)
    .filter(([key, value]) => {
      if (skip.has(key)) return false;
      if (value == null || value === "") return false;
      if (typeof value === "object") return false;
      return true;
    })
    .map(([key, value]) => ({
      key,
      value: String(value),
    }));
}

export function formatFieldLabel(key: string): string {
  return key
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function getObjectPrice(row: ObjectRow): number | null {
  const value = row.price;
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Number(value.replace(/\s/g, "").replace(",", "."));
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

export function getObjectArea(row: ObjectRow): number | null {
  const value = row.area;
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Number(value.replace(/\s/g, "").replace(",", "."));
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

export function getObjectDealType(row: ObjectRow): string | null {
  return asString(row.deal_type);
}

export function getObjectType(row: ObjectRow): string | null {
  return asString(row.type);
}

export function getObjectDistrict(row: ObjectRow): string | null {
  return asString(row.district);
}

export function getObjectClass(row: ObjectRow): string | null {
  return asString(row.class);
}

export function getObjectFloor(row: ObjectRow): string | null {
  const floor = asString(row.floor);
  const total = asString(row.total_floors);
  if (floor && total) return `${floor} / ${total} эт.`;
  return floor;
}

export function getObjectPublishedAt(row: ObjectRow): number {
  const raw = row.published_date ?? row.created_at ?? row.updated_at;
  if (typeof raw === "string") {
    const time = Date.parse(raw);
    return Number.isFinite(time) ? time : 0;
  }
  return 0;
}

export function formatPrice(
  value: number | null,
  dealType?: string | null,
): string {
  if (value == null) return "Цена по запросу";
  const formatted = new Intl.NumberFormat("ru-RU").format(value);
  const suffix = dealType?.toLowerCase().includes("аренд") ? " ₽/мес" : " ₽";
  return `${formatted}${suffix}`;
}

export function formatArea(value: number | null): string {
  if (value == null) return "—";
  return `${new Intl.NumberFormat("ru-RU").format(value)} м²`;
}

export function getObjectSearchText(row: ObjectRow): string {
  return [
    getObjectTitle(row),
    getObjectDescription(row),
    getObjectType(row),
    getObjectDistrict(row),
    getObjectDealType(row),
    getObjectClass(row),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}
