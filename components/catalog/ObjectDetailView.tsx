"use client";

import { useState, type ComponentType } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Phone,
} from "lucide-react";
import { FeatureList } from "@/components/catalog/FeatureList";
import { ObjectCardCompact } from "@/components/catalog/CatalogObjectCard";
import { CallbackDialog } from "@/components/forms/CallbackDialog";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerItem } from "@/components/motion/StaggerItem";
import {
  getObjectAgent,
  getObjectDetailTitle,
  getObjectFeatures,
  getObjectHeadline,
  getObjectSpecGroups,
} from "@/lib/catalog/object-labels";
import {
  getObjectId,
  getObjectPhotos,
  type ObjectRow,
} from "@/lib/supabase/objects";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

function ObjectGallery({ photos, title }: { photos: string[]; title: string }) {
  const [active, setActive] = useState(0);

  if (photos.length === 0) {
    return (
      <div className="flex min-h-[240px] items-center justify-center rounded-sm border border-border bg-muted-bg text-sm text-muted lg:min-h-[420px]">
        Фотографии не добавлены
      </div>
    );
  }

  const current = photos[active] ?? photos[0];
  const sideThumbs = photos.slice(1, 4);
  const hiddenCount = Math.max(photos.length - 4, 0);

  function goPrev() {
    setActive((index) => (index === 0 ? photos.length - 1 : index - 1));
  }

  function goNext() {
    setActive((index) => (index === photos.length - 1 ? 0 : index + 1));
  }

  return (
    <div className="grid gap-2 lg:grid-cols-[minmax(0,1fr)_6.5rem]">
      <div className="group relative overflow-hidden rounded-sm border border-border bg-muted-bg">
        <div className="aspect-[16/10] lg:aspect-auto lg:min-h-[420px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={current}
            alt={`${title} — фото ${active + 1}`}
            className="h-full w-full object-cover"
          />
        </div>

        {photos.length > 1 && (
          <>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/60 px-3 py-1 text-[11px] font-bold text-white">
              {active + 1} / {photos.length}
            </div>
            <button
              type="button"
              aria-label="Предыдущее фото"
              onClick={goPrev}
              className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center bg-white/95 text-ink shadow-sm"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Следующее фото"
              onClick={goNext}
              className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center bg-white/95 text-ink shadow-sm lg:right-3"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      <div className="hidden flex-col gap-2 lg:flex">
        {sideThumbs.map((src, index) => {
          const photoIndex = index + 1;
          const isLast = index === sideThumbs.length - 1 && hiddenCount > 0;

          return (
            <button
              key={src}
              type="button"
              onClick={() => setActive(photoIndex)}
              className={cn(
                "relative min-h-0 flex-1 overflow-hidden border-2 transition-colors",
                active === photoIndex ? "border-primary" : "border-border",
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="h-full w-full object-cover" />
              {isLast && (
                <span className="absolute inset-0 flex items-center justify-center bg-black/55 text-sm font-bold text-white">
                  +{hiddenCount}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {photos.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1 lg:col-span-2 lg:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {photos.map((src, index) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(index)}
              className={cn(
                "relative h-16 w-24 shrink-0 overflow-hidden border-2",
                index === active ? "border-primary" : "border-border",
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function SpecGrid({
  title,
  items,
}: {
  title: string;
  items: { label: string; value: string; icon: ComponentType<{ className?: string }> }[];
}) {
  if (items.length === 0) return null;

  return (
    <section className="rounded-sm border border-border bg-white p-5 shadow-[var(--shadow-soft)] sm:p-6">
      <h2 className="mb-4 text-lg font-extrabold text-ink">{title}</h2>
      <dl className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="flex items-center gap-3 rounded-sm border border-border bg-surface px-4 py-3.5"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-primary-soft text-primary">
                <Icon className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <dt className="text-xs text-muted">{item.label}</dt>
                <dd className="mt-0.5 text-sm font-bold text-ink">{item.value}</dd>
              </div>
            </div>
          );
        })}
      </dl>
    </section>
  );
}

function AgentBlock({ agent }: { agent: ReturnType<typeof getObjectAgent> }) {
  if (!agent.name && !agent.phone) return null;

  return (
    <div className="border-t border-border pt-5">
      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted">
        Менеджер
      </p>
      {agent.name && (
        <p className="mt-2 text-base font-extrabold text-ink">{agent.name}</p>
      )}
      {agent.company && (
        <p className="mt-1 text-sm font-semibold text-primary">{agent.company}</p>
      )}
      <p className="mt-2 text-sm leading-relaxed text-muted">{agent.role}</p>
      {agent.phone && (
        <a
          href={`tel:${agent.phone.replace(/[^\d+]/g, "")}`}
          className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-ink"
        >
          <Phone className="h-4 w-4 text-primary" />
          {agent.phone}
        </a>
      )}
    </div>
  );
}

export function ObjectDetailView({
  object,
  similarObjects = [],
}: {
  object: ObjectRow;
  similarObjects?: ObjectRow[];
}) {
  const photos = getObjectPhotos(object);
  const headline = getObjectHeadline(object);
  const detailTitle = getObjectDetailTitle(object);
  const features = getObjectFeatures(object);
  const specGroups = getObjectSpecGroups(object);
  const objectSpecs = [
    ...(specGroups.find((group) => group.title === "Основное")?.items ?? []),
    ...(specGroups.find((group) => group.title === "Расположение")?.items ?? []),
  ];
  const buildingSpecs = specGroups.find((group) => group.title === "Помещение")?.items ?? [];
  const termsSpecs = specGroups.find((group) => group.title === "Условия")?.items ?? [];
  const agent = getObjectAgent(object);
  const phoneHref = agent.phone
    ? `tel:${agent.phone.replace(/[^\d+]/g, "")}`
    : siteConfig.phoneHref;

  return (
    <div className="object-detail pb-24 lg:pb-10">
      <nav className="mb-5 flex flex-wrap items-center gap-2 text-sm text-muted">
        <Link href="/" className="hover:text-primary">
          Главная
        </Link>
        <span>/</span>
        <Link href="/catalog" className="hover:text-primary">
          Каталог
        </Link>
        <span>/</span>
        <span className="text-ink">{headline.district ?? "Объект"}</span>
      </nav>

      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <Link
            href="/catalog"
            className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            В каталог
          </Link>
          <h1 className="text-2xl font-extrabold leading-tight text-ink sm:text-3xl lg:text-[2rem]">
            {detailTitle}
          </h1>
          <p className="mt-2 flex items-start gap-2 text-sm text-muted sm:text-base">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <span>{headline.title}</span>
          </p>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_21rem] xl:items-start">
        <div className="space-y-6">
          <Reveal>
            <ObjectGallery photos={photos} title={headline.title} />
          </Reveal>

          <Reveal delay={80}>
            <SpecGrid title="Об объекте" items={objectSpecs} />
          </Reveal>

          {headline.description && (
            <Reveal delay={120}>
              <section className="rounded-sm border border-border bg-white p-5 shadow-[var(--shadow-soft)] sm:p-6">
                <h2 className="mb-4 text-lg font-extrabold text-ink">Описание</h2>
                <p className="whitespace-pre-wrap text-[15px] leading-[1.85] text-muted">
                  {headline.description}
                </p>
              </section>
            </Reveal>
          )}

          {buildingSpecs.length > 0 && (
            <Reveal delay={160}>
              <SpecGrid title="О помещении" items={buildingSpecs} />
            </Reveal>
          )}

          {termsSpecs.length > 0 && (
            <Reveal delay={200}>
              <SpecGrid title="Условия сделки" items={termsSpecs} />
            </Reveal>
          )}

          {features.length > 0 && (
            <Reveal delay={240}>
              <FeatureList features={features} />
            </Reveal>
          )}
        </div>

        <aside className="space-y-4 xl:sticky xl:top-24">
          <Reveal delay={100}>
            <div className="rounded-sm border border-border bg-white p-5 shadow-[var(--shadow-soft)] sm:p-6">
            <p className="text-3xl font-extrabold tracking-tight text-ink">
              {headline.price}
            </p>
            {headline.pricePerM2 && (
              <p className="mt-1 text-sm text-muted">{headline.pricePerM2}</p>
            )}

            <div className="mt-5 space-y-2">
              <a
                href={phoneHref}
                className="flex h-12 w-full items-center justify-center gap-2 bg-primary text-sm font-bold uppercase tracking-[0.08em] text-white transition-colors hover:bg-primary-hover"
              >
                <Phone className="h-4 w-4" />
                Показать телефон
              </a>
              <CallbackDialog
                triggerLabel="Перезвоните мне"
                triggerVariant="outline"
                triggerClassName="h-12 w-full rounded-none border-border font-bold uppercase tracking-[0.08em]"
              />
              <CallbackDialog
                triggerLabel="Записаться на просмотр"
                triggerVariant="outline"
                triggerClassName="h-12 w-full rounded-none border-border font-bold uppercase tracking-[0.08em]"
              />
            </div>

            <AgentBlock agent={agent} />
            </div>
          </Reveal>
        </aside>
      </div>

      {similarObjects.length > 0 && (
        <Reveal className="mt-12 border-t border-border pt-10">
          <section>
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="section-label mb-2">Похожие объекты</p>
                <h2 className="text-2xl font-extrabold text-ink">Может подойти вам</h2>
              </div>
              <Link
                href="/catalog"
                className="text-sm font-bold uppercase tracking-[0.12em] text-primary"
              >
                Весь каталог
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {similarObjects.map((item, index) => (
                <StaggerItem key={getObjectId(item) || String(index)} index={index}>
                  <ObjectCardCompact object={item} />
                </StaggerItem>
              ))}
            </div>
          </section>
        </Reveal>
      )}

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white/95 p-3 backdrop-blur-md xl:hidden">
        <div className="mx-auto flex max-w-[100rem] items-center gap-3 px-1">
          <div className="min-w-0 flex-1">
            <p className="truncate text-lg font-extrabold text-ink">{headline.price}</p>
            <p className="truncate text-xs text-muted">{headline.district}</p>
          </div>
          <a
            href={phoneHref}
            className="flex h-11 shrink-0 items-center justify-center gap-2 bg-primary px-4 text-xs font-bold uppercase tracking-[0.08em] text-white"
          >
            <Phone className="h-4 w-4" />
            Звонок
          </a>
          <CallbackDialog
            triggerLabel="Заявка"
            triggerSize="sm"
            triggerClassName="h-11 shrink-0 rounded-none px-4 font-bold uppercase tracking-[0.08em]"
          />
        </div>
      </div>
    </div>
  );
}
