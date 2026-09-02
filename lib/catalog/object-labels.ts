import type { LucideIcon } from "lucide-react";
import {
  Building2,
  Calendar,
  Car,
  Coins,
  DoorOpen,
  FileText,
  Layers,
  MapPin,
  Maximize2,
  Ruler,
  ShieldCheck,
  Tag,
} from "lucide-react";
import {
  formatArea,
  formatPrice,
  getObjectArea,
  getObjectClass,
  getObjectDealType,
  getObjectDescription,
  getObjectDistrict,
  getObjectFloor,
  getObjectPrice,
  getObjectTitle,
  getObjectType,
  type ObjectRow,
} from "@/lib/supabase/objects";

const FIELD_LABELS: Record<string, string> = {
  type: "Тип объекта",
  class: "Класс",
  area: "Площадь",
  price: "Цена",
  price_per_m2: "Цена за м²",
  address: "Адрес",
  district: "Район",
  floor: "Этаж",
  total_floors: "Этажность",
  ceiling_height: "Высота потолков",
  parking: "Парковка",
  condition: "Состояние",
  layout: "Планировка",
  deal_type: "Тип сделки",
  deposit: "Залог",
  contract_term: "Срок договора",
  photos_count: "Фотографий",
  published_date: "Дата публикации",
  views_count: "Просмотры",
  vat: "НДС",
  purpose: "Назначение",
  segment: "Сегмент",
  min_term: "Минимальный срок",
  sublease: "Субаренда",
  indexation: "Индексация",
  contract_form: "Форма договора",
  landlord_type: "Тип арендодателя",
  entrance_group: "Входная группа",
  metro_minutes: "До метро",
  transport_hub: "Транспортный узел",
};

const SEGMENT_LABELS: Record<string, string> = {
  commercial: "Коммерческая",
  residential: "Жилая",
  land: "Земля",
};

export function getFieldLabel(key: string): string {
  return FIELD_LABELS[key] ?? key.replace(/_/g, " ");
}

function asExtras(row: ObjectRow): Record<string, unknown> {
  const extras = row.extras;
  return extras && typeof extras === "object" && !Array.isArray(extras)
    ? (extras as Record<string, unknown>)
    : {};
}

function asString(value: unknown): string | null {
  if (typeof value === "string" && value.trim()) return value.trim();
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  return null;
}

function formatValue(key: string, value: unknown): string | null {
  if (value == null || value === "") return null;
  if (key === "segment" && typeof value === "string") {
    return SEGMENT_LABELS[value] ?? value;
  }
  if (key === "price_per_m2" && typeof value === "number") {
    return `${new Intl.NumberFormat("ru-RU").format(value)} ₽/м²`;
  }
  if (key === "ceiling_height" && typeof value === "number") {
    return `${value} м`;
  }
  if (key === "published_date" && typeof value === "string") {
    const date = new Date(value);
    if (!Number.isNaN(date.getTime())) {
      return new Intl.DateTimeFormat("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(date);
    }
  }
  if (typeof value === "boolean") return value ? "Да" : "Нет";
  if (typeof value === "number") {
    return new Intl.NumberFormat("ru-RU").format(value);
  }
  if (typeof value === "string") return value;
  return null;
}

export interface ObjectSpecItem {
  label: string;
  value: string;
  icon: LucideIcon;
}

export interface ObjectSpecGroup {
  title: string;
  items: ObjectSpecItem[];
}

export function getObjectFeatures(row: ObjectRow): string[] {
  const features = row.features;
  if (!Array.isArray(features)) return [];
  return features
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter(Boolean);
}

export interface ObjectAgent {
  name: string | null;
  phone: string | null;
  company: string | null;
  rating: number | null;
  avatarUrl: string | null;
  role: string;
}

export function getObjectAgent(row: ObjectRow): ObjectAgent {
  const extras = asExtras(row);
  const rating = extras.agent_rating;
  return {
    name: asString(extras.agent_name),
    phone: asString(extras.agent_phone),
    company: asString(extras.agent_company),
    rating: typeof rating === "number" ? rating : null,
    avatarUrl: asString(extras.agent_avatar_url),
    role:
      asString(extras.agent_agency_about) ??
      "Подбор коммерческих помещений, организация показов и сопровождение сделки",
  };
}

function pushItem(
  items: ObjectSpecItem[],
  label: string,
  value: string | null,
  icon: LucideIcon,
) {
  if (value) items.push({ label, value, icon });
}

export function getObjectSpecGroups(row: ObjectRow): ObjectSpecGroup[] {
  const extras = asExtras(row);
  const price = getObjectPrice(row);
  const dealType = getObjectDealType(row);

  const main: ObjectSpecItem[] = [];
  pushItem(main, "Тип сделки", dealType, Tag);
  pushItem(main, "Тип объекта", getObjectType(row), Building2);
  pushItem(main, "Площадь", formatArea(getObjectArea(row)), Maximize2);
  pushItem(main, "Цена", formatPrice(price, dealType), Coins);
  pushItem(
    main,
    "Цена за м²",
    formatValue("price_per_m2", row.price_per_m2),
    Coins,
  );
  pushItem(main, "Класс", getObjectClass(row) ? `Класс ${getObjectClass(row)}` : null, ShieldCheck);

  const building: ObjectSpecItem[] = [];
  pushItem(building, "Этаж", getObjectFloor(row), Layers);
  pushItem(
    building,
    "Высота потолков",
    formatValue("ceiling_height", row.ceiling_height),
    Ruler,
  );
  pushItem(building, "Планировка", asString(row.layout), DoorOpen);
  pushItem(building, "Состояние", asString(row.condition), Building2);
  pushItem(building, "Парковка", asString(row.parking), Car);

  const terms: ObjectSpecItem[] = [];
  pushItem(terms, "Залог", asString(row.deposit), FileText);
  pushItem(terms, "Срок договора", asString(row.contract_term), Calendar);
  pushItem(terms, "НДС", formatValue("vat", extras.vat), FileText);
  pushItem(terms, "Назначение", formatValue("purpose", extras.purpose), Tag);
  pushItem(terms, "Минимальный срок", formatValue("min_term", extras.min_term), Calendar);
  pushItem(terms, "Субаренда", formatValue("sublease", extras.sublease), FileText);
  pushItem(terms, "Индексация", formatValue("indexation", extras.indexation), Coins);
  pushItem(
    terms,
    "Форма договора",
    formatValue("contract_form", extras.contract_form),
    FileText,
  );
  pushItem(
    terms,
    "Тип арендодателя",
    formatValue("landlord_type", extras.landlord_type),
    Building2,
  );
  pushItem(
    terms,
    "Входная группа",
    formatValue("entrance_group", extras.entrance_group),
    DoorOpen,
  );

  const location: ObjectSpecItem[] = [];
  pushItem(location, "Район", getObjectDistrict(row), MapPin);
  pushItem(location, "Адрес", getObjectTitle(row), MapPin);

  return [
    { title: "Основное", items: main },
    { title: "Помещение", items: building },
    { title: "Условия", items: terms },
    { title: "Расположение", items: location },
  ].filter((group) => group.items.length > 0);
}

export function getObjectHeadline(row: ObjectRow) {
  const dealType = getObjectDealType(row);
  const price = getObjectPrice(row);
  const area = getObjectArea(row);
  const pricePerM2 =
    typeof row.price_per_m2 === "number"
      ? `${new Intl.NumberFormat("ru-RU").format(row.price_per_m2)} ₽/м²`
      : null;

  return {
    title: getObjectTitle(row),
    description: getObjectDescription(row),
    dealType,
    type: getObjectType(row),
    objectClass: getObjectClass(row),
    price: formatPrice(price, dealType),
    pricePerM2,
    district: getObjectDistrict(row),
    area: formatArea(area),
    floor: getObjectFloor(row),
  };
}

export function getObjectDetailTitle(row: ObjectRow): string {
  const parts: string[] = [];
  const dealType = getObjectDealType(row);
  const type = getObjectType(row);
  const area = getObjectArea(row);
  const floor = asString(row.floor);
  const totalFloors = asString(row.total_floors);

  if (dealType) parts.push(dealType);
  if (type) parts.push(type.toLowerCase());
  if (area != null) parts.push(`${area} м²`);
  if (floor && totalFloors) parts.push(`${floor}/${totalFloors} этаж`);
  else if (floor) parts.push(`${floor} этаж`);

  return parts.length > 0 ? parts.join(", ") : getObjectTitle(row);
}

export function getAllObjectSpecs(row: ObjectRow): ObjectSpecItem[] {
  return getObjectSpecGroups(row).flatMap((group) => group.items);
}
