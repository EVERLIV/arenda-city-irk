"use client";

import Link from "next/link";
import { CatalogImage } from "@/components/catalog/CatalogImage";
import { isNewObject } from "@/lib/catalog/catalog-utils";
import {
  formatArea,
  formatPrice,
  getObjectArea,
  getObjectClass,
  getObjectDealType,
  getObjectDistrict,
  getObjectFloor,
  getObjectId,
  getObjectPhotos,
  getObjectPrice,
  getObjectTitle,
  getObjectType,
  type ObjectRow,
} from "@/lib/supabase/objects";
import { cn } from "@/lib/utils";

function formatPricePerM2(row: ObjectRow): string | null {
  const value = row.price_per_m2;
  if (typeof value !== "number" || !Number.isFinite(value)) return null;
  return `${new Intl.NumberFormat("ru-RU").format(value)} ₽/м²`;
}

function formatCondition(row: ObjectRow): string | null {
  const value = row.condition;
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function getCardData(object: ObjectRow) {
  const id = getObjectId(object);
  const title = getObjectTitle(object);
  const photos = getObjectPhotos(object);
  const price = getObjectPrice(object);
  const dealType = getObjectDealType(object);
  const type = getObjectType(object);
  const area = getObjectArea(object);
  const district = getObjectDistrict(object);
  const floor = getObjectFloor(object);
  const objectClass = getObjectClass(object);

  return {
    title,
    photos,
    cover: photos[0],
    price,
    dealType,
    type,
    pricePerM2: formatPricePerM2(object),
    isNew: isNewObject(object),
    href: id ? `/catalog/${encodeURIComponent(id)}` : "/catalog",
    meta: [
      area != null ? formatArea(area) : null,
      floor,
      objectClass ? `Класс ${objectClass}` : null,
      formatCondition(object),
      district,
    ].filter(Boolean) as string[],
  };
}

export function ObjectCardCompact({ object }: { object: ObjectRow }) {
  const data = getCardData(object);

  return (
    <Link href={data.href} className="catalog-card group flex h-full flex-col">
      <div className="relative aspect-[16/10] overflow-hidden bg-muted-bg">
        {data.cover ? (
          <CatalogImage
            src={data.cover}
            alt={data.title}
            className="transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-[11px] text-muted">
            Нет фото
          </div>
        )}
        {data.dealType && (
          <span className="absolute left-2 top-2 bg-primary px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
            {data.dealType}
          </span>
        )}
        {data.photos.length > 1 && (
          <span className="absolute bottom-2 right-2 bg-black/55 px-1.5 py-0.5 text-[10px] font-semibold text-white">
            {data.photos.length}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1 border-t border-border bg-white px-2.5 py-2">
        <div className="flex items-baseline justify-between gap-2">
          <p className="text-[15px] font-extrabold leading-none tracking-tight text-ink">
            {formatPrice(data.price, data.dealType)}
          </p>
          {data.isNew && (
            <span className="shrink-0 text-[10px] font-bold uppercase tracking-[0.12em] text-primary">
              Новое
            </span>
          )}
        </div>
        <h3 className="line-clamp-2 text-[12px] font-semibold leading-snug text-ink">
          {data.title}
        </h3>
        <p className="mt-auto line-clamp-1 text-[11px] text-muted">
          {[data.type, data.pricePerM2, ...data.meta].filter(Boolean).join(" · ")}
        </p>
      </div>
    </Link>
  );
}

export function ObjectBannerCard({ object }: { object: ObjectRow }) {
  const data = getCardData(object);

  return (
    <Link
      href={data.href}
      className="catalog-card group grid h-full min-h-[198px] overflow-hidden sm:grid-cols-[1.15fr_1fr]"
    >
      <div className="relative min-h-[160px] overflow-hidden bg-muted-bg sm:min-h-0">
        {data.cover ? (
          <CatalogImage
            src={data.cover}
            alt={data.title}
            className="transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-[11px] text-muted">
            Нет фото
          </div>
        )}
      </div>
      <div className="flex flex-col justify-center gap-1.5 bg-white px-3.5 py-3">
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-primary">
          {data.isNew ? "Новый объект" : "Свежая публикация"}
        </p>
        <p className="text-lg font-extrabold leading-none tracking-tight text-ink">
          {formatPrice(data.price, data.dealType)}
        </p>
        {data.pricePerM2 && (
          <p className="text-[11px] text-muted">{data.pricePerM2}</p>
        )}
        <h3 className="line-clamp-2 text-[13px] font-semibold leading-snug text-ink">
          {data.title}
        </h3>
        <p className="line-clamp-2 text-[11px] leading-relaxed text-muted">
          {[data.dealType, data.type, ...data.meta].filter(Boolean).join(" · ")}
        </p>
      </div>
    </Link>
  );
}

export function ObjectListItem({ object }: { object: ObjectRow }) {
  const data = getCardData(object);

  return (
    <Link
      href={data.href}
      className="catalog-list-item group grid gap-3 p-2 sm:grid-cols-[120px_minmax(0,1fr)_auto] sm:items-center sm:gap-3.5"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-muted-bg sm:aspect-auto sm:h-[84px]">
        {data.cover ? (
          <CatalogImage
            src={data.cover}
            alt={data.title}
            className="transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-[11px] text-muted">
            Нет фото
          </div>
        )}
      </div>

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[10px] font-bold uppercase tracking-wide">
          {data.isNew && <span className="text-primary">Новое</span>}
          {data.dealType && (
            <span className={cn(data.isNew ? "text-muted" : "text-primary")}>
              {data.dealType}
            </span>
          )}
          {data.type && <span className="font-semibold normal-case tracking-normal text-muted">{data.type}</span>}
        </div>
        <h3 className="mt-0.5 line-clamp-2 text-[13px] font-semibold leading-snug text-ink">
          {data.title}
        </h3>
        {data.meta.length > 0 && (
          <p className="mt-0.5 line-clamp-1 text-[11px] text-muted">
            {data.meta.join(" · ")}
          </p>
        )}
      </div>

      <div className="sm:text-right">
        <p className="text-[15px] font-extrabold tracking-tight text-ink sm:text-base">
          {formatPrice(data.price, data.dealType)}
        </p>
        {data.pricePerM2 && (
          <p className="mt-0.5 text-[11px] text-muted">{data.pricePerM2}</p>
        )}
      </div>
    </Link>
  );
}
