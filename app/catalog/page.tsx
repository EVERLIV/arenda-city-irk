import type { Metadata } from "next";
import Link from "next/link";
import { CatalogExplorer } from "@/components/catalog/CatalogExplorer";
import { filtersFromSearchParams } from "@/lib/catalog/catalog-utils";
import { getObjectsTableName } from "@/lib/supabase/client";
import { fetchObjects } from "@/lib/supabase/queries";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Каталог объектов",
  description: `Каталог объектов агентства ${siteConfig.name} в ${siteConfig.region}.`,
};

export default async function CatalogPage({
  searchParams,
}: PageProps<"/catalog">) {
  const params = await searchParams;
  const { data, error, configured } = await fetchObjects();
  const table = getObjectsTableName();
  const initialFilters = filtersFromSearchParams(params);

  return (
    <>
      <section className="border-b border-border bg-white">
        <div className="mx-auto flex max-w-[var(--content-width)] flex-wrap items-end justify-between gap-3 px-[var(--page-pad-x)] py-5">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted">
              Каталог
            </p>
            <h1 className="mt-1 text-xl font-extrabold tracking-tight text-ink sm:text-2xl">
              Объекты {siteConfig.name}
            </h1>
            <p className="mt-1 text-[13px] text-muted">
              {siteConfig.region}
              {configured && !error && data.length > 0
                ? ` · ${data.length} предложений`
                : null}
            </p>
          </div>
          <Link
            href="/contacts"
            className="text-[11px] font-bold uppercase tracking-[0.12em] text-primary"
          >
            Заявка на подбор
          </Link>
        </div>
      </section>

      {!configured && (
        <div className="mx-auto max-w-[var(--content-width)] px-[var(--page-pad-x)] py-8">
          <div className="border border-border bg-white p-5">
            <h2 className="text-base font-extrabold text-ink">Supabase не подключена</h2>
            <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-muted">
              Укажите в переменных окружения{" "}
              <code className="text-ink">NEXT_PUBLIC_SUPABASE_URL</code> и{" "}
              <code className="text-ink">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>. Таблица:{" "}
              <strong>{table}</strong>.
            </p>
          </div>
        </div>
      )}

      {configured && error && (
        <div className="mx-auto max-w-[var(--content-width)] px-[var(--page-pad-x)] py-8">
          <div className="border border-primary/30 bg-primary-soft p-5">
            <h2 className="text-base font-extrabold text-ink">Ошибка загрузки</h2>
            <p className="mt-2 text-[13px] text-muted">{error}</p>
          </div>
        </div>
      )}

      {configured && !error && data.length === 0 && (
        <div className="mx-auto max-w-[var(--content-width)] px-[var(--page-pad-x)] py-12 text-center">
          <p className="text-[13px] text-muted">В каталоге пока нет объектов.</p>
          <Link
            href="/contacts"
            className="mt-3 inline-flex text-[11px] font-bold uppercase tracking-[0.12em] text-primary"
          >
            Оставить заявку
          </Link>
        </div>
      )}

      {configured && !error && data.length > 0 && (
        <CatalogExplorer objects={data} initialFilters={initialFilters} />
      )}
    </>
  );
}
