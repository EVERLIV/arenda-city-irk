import Link from "next/link";
import {
  formatFieldLabel,
  getObjectDescription,
  getObjectFields,
  getObjectId,
  getObjectPhotos,
  getObjectTitle,
  type ObjectRow,
} from "@/lib/supabase/objects";

/** @deprecated Используйте CatalogObjectCard или ObjectDetailView */
export function ObjectCard({ object }: { object: ObjectRow }) {
  const id = getObjectId(object);
  const title = getObjectTitle(object);
  const description = getObjectDescription(object);
  const photos = getObjectPhotos(object);
  const fields = getObjectFields(object).slice(0, 6);
  const cover = photos[0];

  const href = id ? `/catalog/${encodeURIComponent(id)}` : "/catalog";

  return (
    <Link href={href} className="category-tile group flex h-full flex-col overflow-hidden">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted-bg">
        {cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={cover}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted">
            Нет фото
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="text-lg font-extrabold tracking-tight text-ink">{title}</h3>
        {description && (
          <p className="line-clamp-3 text-sm leading-relaxed text-muted">
            {description}
          </p>
        )}
        {fields.length > 0 && (
          <dl className="mt-auto space-y-1.5 border-t border-border pt-3">
            {fields.map((field) => (
              <div key={field.key} className="flex justify-between gap-3 text-xs">
                <dt className="text-muted">{formatFieldLabel(field.key)}</dt>
                <dd className="text-right font-medium text-ink">{field.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </Link>
  );
}

/** @deprecated Используйте ObjectDetailView */
export function ObjectDetail({ object }: { object: ObjectRow }) {
  const title = getObjectTitle(object);
  const description = getObjectDescription(object);
  const photos = getObjectPhotos(object);
  const fields = getObjectFields(object);

  return (
    <div className="space-y-10">
      {photos.length > 0 ? (
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {photos.map((src) => (
            <div key={src} className="relative aspect-[4/3] overflow-hidden bg-muted-bg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={title} className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex aspect-[21/9] items-center justify-center border border-border bg-surface text-muted">
          Фото не указаны
        </div>
      )}

      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-ink lg:text-4xl">
            {title}
          </h1>
          {description && (
            <p className="mt-5 whitespace-pre-wrap text-base leading-[1.8] text-muted">
              {description}
            </p>
          )}
        </div>

        <div className="h-fit border border-border bg-surface p-6">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.14em] text-muted">
            Данные объекта
          </h2>
          {fields.length === 0 ? (
            <p className="text-sm text-muted">Дополнительные поля не заполнены</p>
          ) : (
            <dl className="space-y-3">
              {fields.map((field) => (
                <div
                  key={field.key}
                  className="flex justify-between gap-4 border-b border-border pb-3 last:border-0 last:pb-0"
                >
                  <dt className="text-sm text-muted">{formatFieldLabel(field.key)}</dt>
                  <dd className="text-right text-sm font-semibold text-ink">
                    {field.value}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </div>
    </div>
  );
}
