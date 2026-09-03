"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  MapPin,
  X,
  type LucideIcon,
} from "lucide-react";
import {
  useDisclosure,
  useFocusTrap,
  useHotkeys,
  useMediaQuery,
} from "@mantine/hooks";
import { FeatureList } from "@/components/catalog/FeatureList";
import { ObjectCardCompact } from "@/components/catalog/CatalogObjectCard";
import { ObjectShareBar } from "@/components/catalog/ObjectShareBar";
import { CallbackDialog } from "@/components/forms/CallbackDialog";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerItem } from "@/components/motion/StaggerItem";
import {
  getObjectAgent,
  getObjectDetailTitle,
  getObjectFeatures,
  getObjectHeadline,
  getObjectInfrastructureList,
  getObjectNearbyProjects,
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
  const [lightboxOpen, lightbox] = useDisclosure(false);
  const isDesktop = useMediaQuery("(min-width: 1024px)", false, {
    getInitialValueInEffect: true,
  });
  const focusTrapRef = useFocusTrap(lightboxOpen);
  const hasPhotos = photos.length > 0;

  function goPrev() {
    if (!hasPhotos) return;
    setActive((index) => (index === 0 ? photos.length - 1 : index - 1));
  }

  function goNext() {
    if (!hasPhotos) return;
    setActive((index) => (index === photos.length - 1 ? 0 : index + 1));
  }

  useHotkeys([
    ["ArrowLeft", goPrev],
    ["ArrowRight", goNext],
    ["Escape", () => lightbox.close()],
  ]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [lightboxOpen]);

  if (!hasPhotos) {
    return (
      <div className="flex h-[260px] items-center justify-center rounded-xl bg-muted-bg text-sm text-muted sm:h-[300px] lg:h-[340px]">
        Фотографии не добавлены
      </div>
    );
  }

  const current = photos[active] ?? photos[0];
  const sideThumbs = photos.slice(1, 4);
  const hiddenCount = Math.max(photos.length - 4, 0);

  return (
    <>
      <div className="grid gap-2 lg:grid-cols-[minmax(0,1fr)_6.5rem] lg:items-stretch">
        <div className="group relative h-[260px] overflow-hidden rounded-xl bg-muted-bg sm:h-[300px] lg:h-[340px]">
          <button
            type="button"
            onClick={lightbox.open}
            className="absolute inset-0 block w-full text-left"
            aria-label="Открыть галерею"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={current}
              alt={`${title} — фото ${active + 1}`}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </button>

          {photos.length > 1 && (
            <>
              <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-md bg-black/60 px-3 py-1 text-[11px] font-bold text-white">
                {active + 1} / {photos.length}
              </div>
              <button
                type="button"
                aria-label="Предыдущее фото"
                onClick={goPrev}
                className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-ink shadow-sm"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                aria-label="Следующее фото"
                onClick={goNext}
                className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-ink shadow-sm"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}
        </div>

        {isDesktop && (
          <div className="hidden h-[340px] flex-col gap-2 lg:flex">
            {sideThumbs.map((src, index) => {
              const photoIndex = index + 1;
              const isLast = index === sideThumbs.length - 1 && hiddenCount > 0;

              return (
                <button
                  key={src}
                  type="button"
                  onClick={() => {
                    setActive(photoIndex);
                    if (isLast) lightbox.open();
                  }}
                  className={cn(
                    "relative min-h-0 flex-1 overflow-hidden rounded-lg ring-2 ring-offset-1 transition-colors",
                    active === photoIndex ? "ring-primary" : "ring-transparent",
                  )}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  {isLast && (
                    <span className="absolute inset-0 flex items-center justify-center bg-black/55 text-sm font-bold text-white">
                      +{hiddenCount}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {!isDesktop && photos.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1 lg:col-span-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {photos.map((src, index) => (
              <button
                key={src}
                type="button"
                onClick={() => setActive(index)}
                className={cn(
                  "relative h-16 w-24 shrink-0 overflow-hidden rounded-lg ring-2 ring-offset-1",
                  index === active ? "ring-primary" : "ring-transparent",
                )}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {lightboxOpen && (
        <div
          ref={focusTrapRef}
          className="fixed inset-0 z-50 flex flex-col bg-black/92"
          role="dialog"
          aria-modal="true"
          aria-label="Галерея фотографий"
        >
          <div className="flex items-center justify-between px-4 py-3 text-white">
            <p className="text-sm font-medium">
              {active + 1} / {photos.length}
            </p>
            <button
              type="button"
              onClick={lightbox.close}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
              aria-label="Закрыть"
              data-autofocus
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="relative flex flex-1 items-center justify-center px-4 pb-6">
            {photos.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={goPrev}
                  className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25"
                  aria-label="Предыдущее фото"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25"
                  aria-label="Следующее фото"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={current}
              alt={`${title} — фото ${active + 1}`}
              className="max-h-full max-w-full rounded-lg object-contain"
            />
          </div>
          {photos.length > 1 && (
            <div className="flex justify-center gap-2 overflow-x-auto px-4 pb-5">
              {photos.map((src, index) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setActive(index)}
                  className={cn(
                    "h-14 w-20 shrink-0 overflow-hidden rounded-md ring-2",
                    index === active ? "ring-white" : "ring-transparent opacity-60",
                  )}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}

function SpecGrid({
  title,
  items,
  withIcons = false,
}: {
  title: string;
  items: { label: string; value: string; icon?: LucideIcon }[];
  withIcons?: boolean;
}) {
  if (items.length === 0) return null;

  return (
    <section className="mt-6">
      <h2 className="mb-3 text-base font-extrabold tracking-tight text-ink">{title}</h2>
      <dl className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] items-center gap-2 border-b border-border/70 py-1.5 last:border-b-0 sm:last:border-b sm:[&:nth-last-child(-n+2)]:border-b-0"
            >
              <dt className="flex min-w-0 items-center gap-2 text-[12px] text-muted">
                {withIcons && Icon ? (
                  <Icon className="h-3.5 w-3.5 shrink-0 text-primary" strokeWidth={1.75} />
                ) : null}
                <span>{item.label}</span>
              </dt>
              <dd className="text-[13px] font-semibold text-ink">{item.value}</dd>
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
    <div className="mt-4 border-t border-border pt-4">
      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted">
        Менеджер
      </p>
      {agent.name && (
        <p className="mt-1.5 text-sm font-extrabold text-ink">{agent.name}</p>
      )}
      {agent.company && (
        <p className="mt-0.5 text-xs font-semibold text-primary">{agent.company}</p>
      )}
      <p className="mt-1.5 text-xs leading-relaxed text-muted">{agent.role}</p>
      {agent.phone && (
        <a
          href={`tel:${agent.phone.replace(/[^\d+]/g, "")}`}
          className="mt-2 inline-block text-sm font-bold text-ink"
        >
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
  const infrastructure = getObjectInfrastructureList(object);
  const nearbyProjects = getObjectNearbyProjects(object);
  const specGroups = getObjectSpecGroups(object);
  const objectSpecs = specGroups.find((group) => group.title === "Основное")?.items ?? [];
  const locationSpecs = (specGroups.find((group) => group.title === "Расположение")?.items ?? []).filter(
    (item) => item.label !== "Адрес",
  );
  const aboutSpecs = [...objectSpecs, ...locationSpecs];
  const mapsHref = `https://yandex.ru/maps/?text=${encodeURIComponent(headline.title)}`;
  const buildingSpecs = specGroups.find((group) => group.title === "Помещение")?.items ?? [];
  const engineeringSpecs = specGroups.find((group) => group.title === "Инженерия")?.items ?? [];
  const projectSpecs = specGroups.find((group) => group.title === "Проект")?.items ?? [];
  const termsSpecs = specGroups.find((group) => group.title === "Условия")?.items ?? [];
  const extraSpecs = specGroups.find((group) => group.title === "Дополнительно")?.items ?? [];
  const agent = getObjectAgent(object);
  const phoneHref = agent.phone
    ? `tel:${agent.phone.replace(/[^\d+]/g, "")}`
    : siteConfig.phoneHref;

  return (
    <div className="object-detail pb-32 lg:pb-10">
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

      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <Link
            href="/catalog"
            className="mb-2 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-primary"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            В каталог
          </Link>
          <h1 className="text-xl font-extrabold leading-tight text-ink sm:text-2xl">
            {detailTitle}
          </h1>
          <a
            href={mapsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1.5 inline-flex items-start gap-1.5 text-[13px] text-muted transition-colors hover:text-primary"
          >
            <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
            <span className="underline-offset-2 hover:underline">{headline.title}</span>
          </a>
          <ObjectShareBar
            className="mt-3"
            title={detailTitle}
            text={`${detailTitle} — ${headline.price}`}
          />
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_20rem] xl:items-start">
        <div>
          <Reveal>
            <ObjectGallery photos={photos} title={headline.title} />
          </Reveal>

          <Reveal delay={80}>
            <SpecGrid title="Об объекте" items={aboutSpecs} withIcons />
          </Reveal>

          {headline.description && (
            <Reveal delay={120}>
              <section className="mt-6">
                <h2 className="mb-2 text-base font-extrabold tracking-tight text-ink">
                  Описание
                </h2>
                <p className="whitespace-pre-wrap text-[13px] leading-relaxed text-muted">
                  {headline.description}
                </p>
              </section>
            </Reveal>
          )}

          {buildingSpecs.length > 0 && (
            <Reveal delay={160}>
              <SpecGrid title="О помещении" items={buildingSpecs} withIcons />
            </Reveal>
          )}

          {engineeringSpecs.length > 0 && (
            <Reveal delay={180}>
              <SpecGrid title="Инженерия и коммуникации" items={engineeringSpecs} withIcons />
            </Reveal>
          )}

          {projectSpecs.length > 0 && (
            <Reveal delay={190}>
              <SpecGrid title="Проект и комплекс" items={projectSpecs} withIcons />
            </Reveal>
          )}

          {nearbyProjects.length > 0 && (
            <Reveal delay={200}>
              <FeatureList
                title="Рядом: крупные объекты и инфраструктура"
                features={nearbyProjects}
              />
            </Reveal>
          )}

          {infrastructure.length > 0 && (
            <Reveal delay={210}>
              <FeatureList title="Инфраструктура объекта" features={infrastructure} />
            </Reveal>
          )}

          {termsSpecs.length > 0 && (
            <Reveal delay={220}>
              <SpecGrid title="Условия сделки" items={termsSpecs} withIcons />
            </Reveal>
          )}

          {extraSpecs.length > 0 && (
            <Reveal delay={230}>
              <SpecGrid title="Дополнительные параметры" items={extraSpecs} withIcons />
            </Reveal>
          )}

          {features.length > 0 && (
            <Reveal delay={240}>
              <FeatureList features={features} />
            </Reveal>
          )}
        </div>

        <aside className="xl:sticky xl:top-24">
          <Reveal delay={100}>
            <div className="border border-border bg-white p-4">
              <p className="text-2xl font-extrabold tracking-tight text-ink">
                {headline.price}
              </p>
              {headline.pricePerM2 && (
                <p className="mt-0.5 text-xs text-muted">{headline.pricePerM2}</p>
              )}

              <div className="mt-4 space-y-2">
                <a
                  href={phoneHref}
                  className="flex h-11 w-full items-center justify-center rounded-[0.35rem] bg-primary text-xs font-bold uppercase tracking-[0.08em] text-white shadow-[0_10px_24px_-12px_rgba(200,16,46,0.8)] transition-[transform,box-shadow,background-color] duration-150 hover:bg-primary-hover hover:shadow-[0_14px_28px_-12px_rgba(200,16,46,0.7)] active:scale-[0.98]"
                >
                  Показать телефон
                </a>
                <CallbackDialog
                  triggerLabel="Перезвоните мне"
                  triggerVariant="outline"
                  triggerClassName="h-11 w-full rounded-[0.35rem] border-border text-xs font-bold uppercase tracking-[0.08em] shadow-[var(--shadow-soft)] transition-[transform,box-shadow] duration-150 hover:shadow-[var(--shadow-hover)] active:scale-[0.98]"
                />
                <CallbackDialog
                  triggerLabel="Записаться на просмотр"
                  triggerVariant="outline"
                  triggerClassName="h-11 w-full rounded-[0.35rem] border-border text-xs font-bold uppercase tracking-[0.08em] shadow-[var(--shadow-soft)] transition-[transform,box-shadow] duration-150 hover:shadow-[var(--shadow-hover)] active:scale-[0.98]"
                />
              </div>

              <AgentBlock agent={agent} />
            </div>
          </Reveal>
        </aside>
      </div>

      {similarObjects.length > 0 && (
        <Reveal className="mt-8">
          <section>
            <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
              <h2 className="text-base font-extrabold text-ink">Похожие объекты</h2>
              <Link
                href="/catalog"
                className="text-[11px] font-bold uppercase tracking-[0.12em] text-primary"
              >
                Весь каталог →
              </Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {similarObjects.map((item, index) => (
                <StaggerItem key={getObjectId(item) || String(index)} index={index}>
                  <ObjectCardCompact object={item} />
                </StaggerItem>
              ))}
            </div>
          </section>
        </Reveal>
      )}

      <div className="fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 print:hidden xl:hidden">
        <div className="mx-auto max-w-[100rem] rounded-[0.75rem] border border-border/80 bg-white/95 p-2.5 shadow-[0_12px_40px_-16px_rgba(28,28,30,0.35),0_4px_12px_rgba(28,28,30,0.08)] backdrop-blur-md">
          <div className="mb-2 flex items-baseline justify-between gap-2 px-1">
            <p className="truncate text-base font-extrabold tracking-tight text-ink">
              {headline.price}
            </p>
            {headline.district && (
              <p className="max-w-[45%] truncate text-[11px] text-muted">
                {headline.district}
              </p>
            )}
          </div>
          <div className="grid grid-cols-3 gap-2">
            <a
              href={phoneHref}
              className="flex h-11 items-center justify-center rounded-[0.35rem] bg-primary px-2 text-[11px] font-bold uppercase tracking-[0.06em] text-white shadow-[0_10px_24px_-12px_rgba(200,16,46,0.85)] transition-[transform,box-shadow,background-color] duration-150 hover:bg-primary-hover active:scale-[0.97]"
            >
              Звонок
            </a>
            <CallbackDialog
              triggerLabel="Спросить"
              triggerVariant="outline"
              triggerSize="sm"
              triggerClassName="h-11 w-full rounded-[0.35rem] border-border px-2 text-[11px] font-bold uppercase tracking-[0.06em] shadow-[var(--shadow-soft)] transition-[transform,box-shadow] duration-150 active:scale-[0.97]"
            />
            <CallbackDialog
              triggerLabel="Просмотр"
              triggerVariant="outline"
              triggerSize="sm"
              triggerClassName="h-11 w-full rounded-[0.35rem] border-border px-2 text-[11px] font-bold uppercase tracking-[0.06em] shadow-[var(--shadow-soft)] transition-[transform,box-shadow] duration-150 active:scale-[0.97]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
