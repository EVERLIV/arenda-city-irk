"use client";

import Link from "next/link";
import { MapPin, Maximize2 } from "lucide-react";
import { CatalogImage } from "@/components/catalog/CatalogImage";
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

function ObjectBadges({ object }: { object: ObjectRow }) {
  const dealType = getObjectDealType(object);
  const type = getObjectType(object);
  const objectClass = getObjectClass(object);

  return (
    <div className="flex flex-wrap gap-1.5">
      {dealType && (
        <span className="bg-primary px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-white">
          {dealType}
        </span>
      )}
      {type && (
        <span className="border border-white/30 bg-black/35 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-white backdrop-blur-sm">
          {type}
        </span>
      )}
      {objectClass && (
        <span className="border border-white/25 bg-black/25 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-white/90 backdrop-blur-sm">
          Класс {objectClass}
        </span>
      )}
    </div>
  );
}

export function ObjectCardCompact({ object }: { object: ObjectRow }) {
  const id = getObjectId(object);
  const title = getObjectTitle(object);
  const photos = getObjectPhotos(object);
  const cover = photos[0];
  const price = getObjectPrice(object);
  const dealType = getObjectDealType(object);
  const area = getObjectArea(object);
  const district = getObjectDistrict(object);
  const floor = getObjectFloor(object);
  const href = id ? `/catalog/${encodeURIComponent(id)}` : "/catalog";

  return (
    <Link href={href} className="catalog-card group flex h-full flex-col">
      <div className="relative aspect-[5/3] overflow-hidden bg-muted-bg">
        {cover ? (
          <CatalogImage
            src={cover}
            alt={title}
            className="transition-transform duration-700 [transition-timing-function:var(--ease-premium)] group-hover:scale-[1.05]"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-muted">
            Нет фото
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10" />
        <div className="absolute left-3 top-3">
          <ObjectBadges object={object} />
        </div>
        {photos.length > 1 && (
          <span className="absolute bottom-3 right-3 bg-black/55 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-white">
            {photos.length} фото
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2.5 border border-t-0 border-border bg-white p-4">
        <p className="text-xl font-extrabold tracking-tight text-primary">
          {formatPrice(price, dealType)}
        </p>
        <h3 className="line-clamp-2 text-sm font-bold leading-snug text-ink">
          {title}
        </h3>
        <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
          {area != null && (
            <span className="inline-flex items-center gap-1">
              <Maximize2 className="h-3.5 w-3.5" />
              {formatArea(area)}
            </span>
          )}
          {district && (
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {district}
            </span>
          )}
          {floor && <span>{floor}</span>}
        </div>
      </div>
    </Link>
  );
}

export function ObjectListItem({ object }: { object: ObjectRow }) {
  const id = getObjectId(object);
  const title = getObjectTitle(object);
  const photos = getObjectPhotos(object);
  const cover = photos[0];
  const price = getObjectPrice(object);
  const dealType = getObjectDealType(object);
  const area = getObjectArea(object);
  const district = getObjectDistrict(object);
  const floor = getObjectFloor(object);
  const href = id ? `/catalog/${encodeURIComponent(id)}` : "/catalog";

  return (
    <Link
      href={href}
      className="catalog-list-item group grid gap-4 border border-border bg-white p-3 sm:grid-cols-[168px_1fr_auto] sm:items-center sm:p-4"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-muted-bg sm:aspect-auto sm:h-[108px]">
        {cover ? (
          <CatalogImage
            src={cover}
            alt={title}
            className="transition-transform duration-700 [transition-timing-function:var(--ease-premium)] group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-muted">
            Нет фото
          </div>
        )}
      </div>

      <div className="min-w-0 space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          {dealType && (
            <span className="bg-primary-soft px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-primary">
              {dealType}
            </span>
          )}
          {getObjectType(object) && (
            <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-muted">
              {getObjectType(object)}
            </span>
          )}
        </div>
        <h3 className="line-clamp-2 text-base font-extrabold leading-snug text-ink">
          {title}
        </h3>
        <div className="flex flex-wrap gap-3 text-xs text-muted">
          {area != null && <span>{formatArea(area)}</span>}
          {district && <span>{district}</span>}
          {floor && <span>{floor}</span>}
        </div>
      </div>

      <div className="sm:text-right">
        <p className="text-lg font-extrabold tracking-tight text-primary sm:text-xl">
          {formatPrice(price, dealType)}
        </p>
        <span
          className={cn(
            "mt-2 inline-flex text-xs font-bold uppercase tracking-[0.12em] text-primary",
            "opacity-0 transition-opacity group-hover:opacity-100",
          )}
        >
          Подробнее →
        </span>
      </div>
    </Link>
  );
}
