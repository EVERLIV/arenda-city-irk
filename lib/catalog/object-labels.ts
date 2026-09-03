import type { LucideIcon } from "lucide-react";
import {
  Building2,
  Briefcase,
  Bus,
  Calendar,
  Car,
  Coins,
  DoorOpen,
  Droplets,
  Factory,
  FileText,
  Flame,
  Hash,
  Landmark,
  Layers,
  LayoutGrid,
  MapPin,
  Maximize2,
  PaintBucket,
  Percent,
  Plane,
  Power,
  Repeat,
  Route,
  Ruler,
  ShieldCheck,
  Store,
  Tag,
  Timer,
  TrainFront,
  UserRound,
  Wallet,
  Wifi,
  Wind,
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
  metro_station: "Станция метро",
  transport_hub: "Транспортный узел",
  cadastral_number: "Кадастровый номер",
  power_kw: "Электрическая мощность",
  electricity: "Электричество",
  water: "Водоснабжение",
  sewage: "Канализация",
  heating: "Отопление",
  gas: "Газ",
  ventilation: "Вентиляция",
  internet: "Интернет",
  fiber: "Оптоволокно",
  loading_docks: "Погрузочные доки",
  truck_access: "Подъезд фур",
  railway: "Ж/д ветка",
  security: "Охрана",
  access_control: "Контроль доступа",
  elevators: "Лифты",
  project_name: "Проект / комплекс",
  complex_name: "Название комплекса",
  building_name: "Название здания",
  developer: "Девелопер",
  year_built: "Год постройки",
  renovation_year: "Год ремонта",
  land_area: "Площадь участка",
  office_area: "Офисная площадь",
  warehouse_area: "Складская площадь",
  retail_area: "Торговая площадь",
  permitted_use: "ВРИ / назначение земли",
  zoning: "Зонирование",
  highway: "Трасса / выезд",
  distance_to_center: "До центра",
  airport_minutes: "До аэропорта",
  fire_safety: "Пожарная безопасность",
  floor_load: "Нагрузка на пол",
  column_grid: "Сетка колонн",
  temperature_mode: "Температурный режим",
  land_use: "Назначение земли",
  landUse: "Назначение земли",
  listing_type: "Тип объявления",
  status: "Статус",
  currency: "Валюта",
  city: "Город",
  region: "Регион",
  country: "Страна",
};

const SEGMENT_LABELS: Record<string, string> = {
  commercial: "Коммерческая",
  residential: "Жилая",
  land: "Земля",
  industrial: "Производственная",
  office: "Офис",
  retail: "Торговля",
  warehouse: "Склад",
  mixed: "Смешанное",
};

const VALUE_LABELS: Record<string, string> = {
  ...SEGMENT_LABELS,
  yes: "Да",
  no: "Нет",
  true: "Да",
  false: "Нет",
  active: "Активно",
  inactive: "Неактивно",
  draft: "Черновик",
  published: "Опубликовано",
  rent: "Аренда",
  sale: "Продажа",
  lease: "Аренда",
  buy: "Покупка",
  available: "Свободно",
  occupied: "Занято",
  furnished: "С мебелью",
  unfurnished: "Без мебели",
  rub: "₽",
  rur: "₽",
  rubles: "₽",
};

const SKIP_EXTRA_KEYS = new Set([
  "agency_id",
  "agent_name",
  "agent_phone",
  "agent_company",
  "agent_rating",
  "agent_avatar_url",
  "agent_agency_about",
  "listing_manager_id",
  "listing_manager",
  "manager_id",
  "user_id",
  "owner_id",
  "created_by",
  "updated_by",
  "external_id",
  "source_id",
  "crm_id",
  "photos",
  "images",
  "gallery",
  "description",
  "features",
  "amenities",
  "advantages",
  "nearby",
  "nearby_projects",
  "nearby_objects",
  "landmarks",
  "infrastructure",
  "aaa_projects",
  "large_projects",
  "infra",
  "id",
  "uuid",
]);

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function getFieldLabel(key: string): string | null {
  if (FIELD_LABELS[key]) return FIELD_LABELS[key];
  const normalized = key.replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase();
  if (FIELD_LABELS[normalized]) return FIELD_LABELS[normalized];
  // Не показываем сырые английские ключи
  return null;
}

function isTechnicalKey(key: string): boolean {
  if (SKIP_EXTRA_KEYS.has(key) || key.startsWith("agent_")) return true;
  return /(_id|uuid|manager|listing_manager|created_by|updated_by|external_)/i.test(
    key,
  );
}

function isUuidLike(value: string): boolean {
  return UUID_RE.test(value.trim());
}

function hasLatinOnly(value: string): boolean {
  return /[a-zA-Z]/.test(value) && !/[а-яА-ЯёЁ]/.test(value);
}

function localizeDisplayValue(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed || isUuidLike(trimmed)) return null;
  const mapped = VALUE_LABELS[trimmed.toLowerCase()];
  if (mapped) return mapped;
  if (hasLatinOnly(trimmed)) return null;
  return trimmed;
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
  if (typeof value === "boolean") return value ? "Да" : "Нет";

  if (
    (key === "segment" || key === "land_use" || key === "landUse" || key === "purpose") &&
    typeof value === "string"
  ) {
    return (
      VALUE_LABELS[value.toLowerCase()] ??
      SEGMENT_LABELS[value.toLowerCase()] ??
      localizeDisplayValue(value)
    );
  }
  if (key === "price_per_m2" && typeof value === "number") {
    return `${new Intl.NumberFormat("ru-RU").format(value)} ₽/м²`;
  }
  if (
    (key === "ceiling_height" || key === "floor_load") &&
    typeof value === "number"
  ) {
    return key === "ceiling_height" ? `${value} м` : `${value}`;
  }
  if (key === "power_kw" && (typeof value === "number" || typeof value === "string")) {
    const num = typeof value === "number" ? value : Number(String(value).replace(/\s/g, ""));
    if (Number.isFinite(num)) return `${new Intl.NumberFormat("ru-RU").format(num)} кВт`;
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
  if (typeof value === "number") {
    return new Intl.NumberFormat("ru-RU").format(value);
  }
  if (typeof value === "string") {
    return localizeDisplayValue(value);
  }
  return null;
}

function pickField(
  row: ObjectRow,
  extras: Record<string, unknown>,
  keys: string[],
): string | null {
  for (const key of keys) {
    const formatted =
      formatValue(key, row[key]) ?? formatValue(key, extras[key]);
    if (formatted) return formatted;
    const raw = asString(row[key]) ?? asString(extras[key]);
    const localized = raw ? localizeDisplayValue(raw) : null;
    if (localized) return localized;
  }
  return null;
}

function collectListValues(...values: unknown[]): string[] {
  const items: string[] = [];

  for (const value of values) {
    if (!value) continue;
    if (typeof value === "string") {
      const trimmed = value.trim();
      if (!trimmed) continue;
      if (trimmed.startsWith("[")) {
        try {
          items.push(...collectListValues(JSON.parse(trimmed)));
          continue;
        } catch {
          // plain string
        }
      }
      items.push(
        ...trimmed
          .split(/[;\n|]/)
          .map((part) => part.trim())
          .filter(Boolean),
      );
      continue;
    }
    if (Array.isArray(value)) {
      for (const item of value) {
        if (typeof item === "string" && item.trim()) items.push(item.trim());
        else if (item && typeof item === "object") {
          const record = item as Record<string, unknown>;
          const label =
            asString(record.name) ??
            asString(record.title) ??
            asString(record.label) ??
            asString(record.text);
          if (label) items.push(label);
        }
      }
    }
  }

  return [...new Set(items)];
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
  const extras = asExtras(row);
  const fromRow = Array.isArray(row.features) ? row.features : [];
  return collectListValues(
    fromRow,
    extras.features,
    extras.amenities,
    extras.advantages,
  );
}

export function getObjectInfrastructureList(row: ObjectRow): string[] {
  const extras = asExtras(row);
  return collectListValues(
    row.infrastructure,
    extras.infrastructure,
    extras.infra,
  );
}

export function getObjectNearbyProjects(row: ObjectRow): string[] {
  const extras = asExtras(row);
  return collectListValues(
    extras.nearby_projects,
    extras.aaa_projects,
    extras.large_projects,
    extras.nearby_objects,
    extras.landmarks,
    extras.nearby,
    row.nearby_projects,
    row.nearby,
  );
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

function getCadastralNumber(row: ObjectRow, extras: Record<string, unknown>): string | null {
  const keys = [
    "cadastral_number",
    "cadastral_num",
    "cadastral",
    "cadastre",
    "cad_number",
    "cadastralNumber",
    "kadastr",
    "kadastr_nomer",
    "kn",
  ];

  for (const key of keys) {
    const value = asString(row[key]) ?? asString(extras[key]);
    if (value) return value;
  }

  for (const [key, value] of Object.entries({ ...row, ...extras })) {
    if (/cadastr|кадастр|kadastr/i.test(key)) {
      const parsed = asString(value);
      if (parsed) return parsed;
    }
  }

  return null;
}

function pushItem(
  items: ObjectSpecItem[],
  label: string,
  value: string | null,
  icon: LucideIcon,
) {
  if (value) items.push({ label, value, icon });
}

function pushMapped(
  items: ObjectSpecItem[],
  row: ObjectRow,
  extras: Record<string, unknown>,
  keys: string[],
  label: string,
  icon: LucideIcon,
) {
  pushItem(items, label, pickField(row, extras, keys), icon);
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
  pushItem(main, "Кадастровый номер", getCadastralNumber(row, extras), Hash);
  pushMapped(main, row, extras, ["segment"], "Сегмент", Layers);
  pushMapped(main, row, extras, ["land_use", "landUse"], "Назначение земли", LayoutGrid);
  pushMapped(main, row, extras, ["land_area"], "Площадь участка", Maximize2);
  pushMapped(main, row, extras, ["office_area"], "Офисная площадь", Building2);
  pushMapped(main, row, extras, ["warehouse_area"], "Складская площадь", Factory);
  pushMapped(main, row, extras, ["retail_area"], "Торговая площадь", Store);

  const project: ObjectSpecItem[] = [];
  pushMapped(project, row, extras, ["project_name", "project"], "Проект / комплекс", Landmark);
  pushMapped(project, row, extras, ["complex_name", "bc_name"], "Название комплекса", Building2);
  pushMapped(project, row, extras, ["building_name"], "Название здания", Building2);
  pushMapped(project, row, extras, ["developer"], "Девелопер", Briefcase);
  pushMapped(project, row, extras, ["year_built", "build_year"], "Год постройки", Calendar);
  pushMapped(project, row, extras, ["renovation_year"], "Год ремонта", Calendar);
  pushMapped(project, row, extras, ["permitted_use", "vri"], "ВРИ / назначение", FileText);
  pushMapped(project, row, extras, ["zoning"], "Зонирование", LayoutGrid);

  const building: ObjectSpecItem[] = [];
  pushItem(building, "Этаж", getObjectFloor(row), Layers);
  pushItem(
    building,
    "Высота потолков",
    formatValue("ceiling_height", row.ceiling_height) ??
      pickField(row, extras, ["ceiling_height"]),
    Ruler,
  );
  pushItem(building, "Планировка", asString(row.layout) ?? asString(extras.layout), LayoutGrid);
  pushItem(
    building,
    "Состояние",
    asString(row.condition) ?? asString(extras.condition),
    PaintBucket,
  );
  pushItem(building, "Парковка", asString(row.parking) ?? asString(extras.parking), Car);
  pushMapped(building, row, extras, ["elevators", "lift"], "Лифты", Layers);
  pushMapped(building, row, extras, ["floor_load"], "Нагрузка на пол", Ruler);
  pushMapped(building, row, extras, ["column_grid"], "Сетка колонн", LayoutGrid);
  pushMapped(building, row, extras, ["temperature_mode"], "Температурный режим", Wind);
  pushMapped(building, row, extras, ["loading_docks", "docks"], "Погрузочные доки", Factory);
  pushMapped(building, row, extras, ["truck_access"], "Подъезд фур", Car);
  pushMapped(building, row, extras, ["railway"], "Ж/д ветка", TrainFront);
  pushMapped(building, row, extras, ["security"], "Охрана", ShieldCheck);
  pushMapped(building, row, extras, ["access_control"], "Контроль доступа", DoorOpen);
  pushMapped(building, row, extras, ["fire_safety"], "Пожарная безопасность", Flame);

  const engineering: ObjectSpecItem[] = [];
  pushMapped(engineering, row, extras, ["power_kw", "power", "electric_power"], "Электрическая мощность", Power);
  pushMapped(engineering, row, extras, ["electricity"], "Электричество", Power);
  pushMapped(engineering, row, extras, ["water", "water_supply"], "Водоснабжение", Droplets);
  pushMapped(engineering, row, extras, ["sewage", "canalization"], "Канализация", Droplets);
  pushMapped(engineering, row, extras, ["heating"], "Отопление", Flame);
  pushMapped(engineering, row, extras, ["gas"], "Газ", Flame);
  pushMapped(engineering, row, extras, ["ventilation", "hvac"], "Вентиляция", Wind);
  pushMapped(engineering, row, extras, ["internet"], "Интернет", Wifi);
  pushMapped(engineering, row, extras, ["fiber", "fiber_optic"], "Оптоволокно", Wifi);

  const terms: ObjectSpecItem[] = [];
  pushItem(terms, "Залог", asString(row.deposit) ?? asString(extras.deposit), Wallet);
  pushItem(
    terms,
    "Срок договора",
    asString(row.contract_term) ?? asString(extras.contract_term),
    Calendar,
  );
  pushItem(terms, "НДС", formatValue("vat", extras.vat ?? row.vat), Percent);
  pushItem(terms, "Назначение", formatValue("purpose", extras.purpose ?? row.purpose), Briefcase);
  pushItem(terms, "Минимальный срок", formatValue("min_term", extras.min_term), Timer);
  pushItem(terms, "Субаренда", formatValue("sublease", extras.sublease), Repeat);
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
    UserRound,
  );
  pushItem(
    terms,
    "Входная группа",
    formatValue("entrance_group", extras.entrance_group),
    DoorOpen,
  );

  const location: ObjectSpecItem[] = [];
  pushItem(location, "Район", getObjectDistrict(row), MapPin);
  pushMapped(location, row, extras, ["metro_minutes", "to_metro"], "До метро", TrainFront);
  pushMapped(location, row, extras, ["metro_station"], "Станция метро", TrainFront);
  pushMapped(location, row, extras, ["transport_hub"], "Транспортный узел", Bus);
  pushMapped(location, row, extras, ["highway", "road", "federal_highway"], "Трасса / выезд", Route);
  pushMapped(location, row, extras, ["distance_to_center", "to_center"], "До центра", MapPin);
  pushMapped(location, row, extras, ["airport_minutes", "to_airport"], "До аэропорта", Plane);
  pushMapped(location, row, extras, ["nearby_mall", "mall"], "ТРЦ рядом", Store);
  pushMapped(location, row, extras, ["nearby_bc", "nearby_business_center"], "Бизнес-центр рядом", Building2);
  pushMapped(location, row, extras, ["nearby_hospital"], "Медцентр рядом", Landmark);
  pushMapped(location, row, extras, ["nearby_university"], "ВУЗ рядом", Landmark);

  const knownLabels = new Set(
    [...main, ...project, ...building, ...engineering, ...terms, ...location].map(
      (item) => item.label,
    ),
  );

  const extra: ObjectSpecItem[] = [];
  for (const [key, value] of Object.entries(extras)) {
    if (isTechnicalKey(key)) continue;
    if (typeof value === "object" && value !== null) continue;
    const formatted = formatValue(key, value) ?? localizeDisplayValue(asString(value) ?? "");
    if (!formatted) continue;
    const label = getFieldLabel(key);
    if (!label || knownLabels.has(label)) continue;
    if (hasLatinOnly(label)) continue;
    pushItem(extra, label, formatted, FileText);
  }

  return [
    { title: "Основное", items: main },
    { title: "Проект", items: project },
    { title: "Помещение", items: building },
    { title: "Инженерия", items: engineering },
    { title: "Условия", items: terms },
    { title: "Расположение", items: location },
    { title: "Дополнительно", items: extra },
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
