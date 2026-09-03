"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useHotkeys, useMediaQuery } from "@mantine/hooks";
import reviewsData from "@/content/reviews.json";

type Source = "all" | "yandex" | "google" | "2gis";
type Topic = "all" | "service" | "support" | "timing" | "quality";

const SOURCE_META: Record<
  Exclude<Source, "all">,
  { label: string; icon: string }
> = {
  yandex: { label: "Яндекс", icon: "/icons/yandex.png" },
  google: { label: "Google", icon: "/icons/google.png" },
  "2gis": { label: "2ГИС", icon: "/icons/2gis.png" },
};

const TOPICS: { id: Topic; label: string }[] = [
  { id: "all", label: "Все" },
  { id: "service", label: "Сервис" },
  { id: "support", label: "Поддержка" },
  { id: "timing", label: "Сроки" },
  { id: "quality", label: "Качество" },
];

function Stars({ value }: { value: number }) {
  return (
    <span className="text-[12px] tracking-tight text-accent-gold" aria-label={`${value} из 5`}>
      {"★★★★★".slice(0, value)}
      <span className="text-border">{"★★★★★".slice(value)}</span>
    </span>
  );
}

function SourceMark({ source, size = 32 }: { source: Exclude<Source, "all">; size?: number }) {
  const meta = SOURCE_META[source];
  return (
    <Image
      src={meta.icon}
      alt={meta.label}
      width={size}
      height={size}
      className="shrink-0 rounded-md object-contain"
    />
  );
}

export function ReviewsSection() {
  const [source, setSource] = useState<Source>("all");
  const [topic, setTopic] = useState<Topic>("all");
  const [page, setPage] = useState(0);
  const wide = useMediaQuery("(min-width: 1100px)", false, {
    getInitialValueInEffect: true,
  });
  const tablet = useMediaQuery("(min-width: 720px)", false, {
    getInitialValueInEffect: true,
  });
  const perPage = wide ? 3 : tablet ? 2 : 1;

  const reviews = reviewsData as {
    id: string;
    source: Exclude<Source, "all">;
    author: string;
    date: string;
    rating: number;
    topic: Exclude<Topic, "all">;
    text: string;
  }[];

  const filtered = useMemo(
    () =>
      reviews.filter((item) => {
        if (source !== "all" && item.source !== source) return false;
        if (topic !== "all" && item.topic !== topic) return false;
        return true;
      }),
    [reviews, source, topic],
  );

  const avg =
    reviews.reduce((sum, item) => sum + item.rating, 0) / Math.max(reviews.length, 1);
  const pages = Math.max(1, Math.ceil(filtered.length / perPage));
  const safePage = Math.min(page, pages - 1);
  const visible = filtered.slice(safePage * perPage, safePage * perPage + perPage);

  const sourceStats = (id: Exclude<Source, "all">) => {
    const items = reviews.filter((item) => item.source === id);
    const rating =
      items.reduce((sum, item) => sum + item.rating, 0) / Math.max(items.length, 1);
    return { count: items.length, rating };
  };

  function go(delta: number) {
    setPage((current) => (current + delta + pages) % pages);
  }

  useHotkeys([
    ["ArrowLeft", () => go(-1)],
    ["ArrowRight", () => go(1)],
  ]);

  const sources: Source[] = ["all", "yandex", "google", "2gis"];

  return (
    <section className="border-y border-border bg-white py-10 lg:py-12">
      <div className="mx-auto max-w-[var(--content-width)] px-[var(--page-pad-x)]">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <h2 className="text-xl font-extrabold tracking-tight text-ink sm:text-2xl">
            <span className="text-primary">Отзывы</span> клиентов
          </h2>
          <p className="text-sm text-muted">
            <Stars value={5} />{" "}
            <span className="ml-1 font-extrabold text-ink">{avg.toFixed(1)}</span>
            <span className="ml-1">на основе {reviews.length} отзывов</span>
          </p>
        </div>

        <div className="mb-3 flex flex-wrap gap-2">
          {sources.map((id) => {
            const active = source === id;
            const stats = id === "all" ? null : sourceStats(id);
            return (
              <button
                key={id}
                type="button"
                onClick={() => {
                  setSource(id);
                  setPage(0);
                }}
                className={`flex items-center gap-2 border px-3 py-2 text-left text-[12px] transition-colors ${
                  active
                    ? "border-primary bg-primary-soft text-ink"
                    : "border-border bg-white text-muted hover:border-primary/40"
                }`}
              >
                {id !== "all" && <SourceMark source={id} size={28} />}
                <span>
                  <span className="block font-bold text-ink">
                    {id === "all" ? "Все отзывы" : SOURCE_META[id].label}
                  </span>
                  <span>
                    {id === "all"
                      ? `${avg.toFixed(1)} · ${reviews.length}`
                      : `${stats?.rating.toFixed(1)} · ${stats?.count}`}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="mb-4 flex flex-wrap gap-1.5">
          {TOPICS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setTopic(item.id);
                setPage(0);
              }}
              className={`px-2.5 py-1 text-[11px] font-semibold ${
                topic === item.id
                  ? "border border-primary bg-white text-primary"
                  : "border border-transparent bg-muted-bg text-muted"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map((review) => (
            <article
              key={review.id}
              className="flex h-full flex-col border border-border bg-muted-bg/60 p-4"
            >
              <div className="mb-2 flex items-center gap-2.5">
                <SourceMark source={review.source} />
                <div className="min-w-0">
                  <p className="truncate text-[13px] font-bold text-ink">{review.author}</p>
                  <p className="truncate text-[11px] text-muted">
                    {review.date} · {SOURCE_META[review.source].label}
                  </p>
                </div>
              </div>
              <Stars value={review.rating} />
              <p className="mt-2 flex-1 text-[13px] leading-relaxed text-ink">{review.text}</p>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="border border-border px-4 py-8 text-center text-sm text-muted">
            По выбранным фильтрам отзывов нет.
          </p>
        )}

        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5">
            {Array.from({ length: pages }).map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Страница ${index + 1}`}
                onClick={() => setPage(index)}
                className={`h-1.5 rounded-full transition-all ${
                  index === safePage ? "w-6 bg-primary" : "w-1.5 bg-border"
                }`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              className="border border-border px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-ink"
            >
              Назад
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="border border-border px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-ink"
            >
              Далее
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
