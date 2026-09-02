import type { Metadata } from "next";
import Link from "next/link";
import { CatalogExplorer } from "@/components/catalog/CatalogExplorer";
import { PageContainer } from "@/components/design-system";
import { PageHero } from "@/components/layout/PageHero";
import { getObjectsTableName } from "@/lib/supabase/client";
import { fetchObjects } from "@/lib/supabase/queries";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Каталог объектов",
  description: `Каталог объектов агентства ${siteConfig.name} в ${siteConfig.region}.`,
};

export default async function CatalogPage() {
  const { data, error, configured } = await fetchObjects();
  const table = getObjectsTableName();

  return (
    <>
      <PageHero
        eyebrow="Каталог"
        title="Объекты АрендаСити"
        description={`Актуальные предложения в ${siteConfig.region}. Только объекты агентства АрендаСити — менеджер Анастасия Романова.`}
      >
        {configured && !error && data.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="border border-border bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-ink">
              {data.length} объектов
            </span>
            <span className="border border-primary/20 bg-primary-soft px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-primary">
              Аренда и продажа
            </span>
            <span className="border border-border bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-muted">
              Фильтры и сортировка
            </span>
          </div>
        )}
      </PageHero>

      <PageContainer className="py-10 lg:py-12" size="wide">
        {!configured && (
          <div className="border border-border bg-surface p-8">
            <h2 className="text-xl font-extrabold text-ink">Supabase не подключена</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
              Укажите в переменных окружения{" "}
              <code className="text-ink">NEXT_PUBLIC_SUPABASE_URL</code> и{" "}
              <code className="text-ink">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> вашей
              self-hosted Supabase на Timeweb. При необходимости задайте{" "}
              <code className="text-ink">SUPABASE_OBJECTS_TABLE</code> (по умолчанию{" "}
              <strong>properties</strong>) и{" "}
              <code className="text-ink">SUPABASE_AGENCY_NAME</code> (сейчас таблица:{" "}
              <strong>{table}</strong>).
            </p>
          </div>
        )}

        {configured && error && (
          <div className="border border-primary/30 bg-primary-soft p-8">
            <h2 className="text-xl font-extrabold text-ink">Ошибка загрузки</h2>
            <p className="mt-3 text-sm text-muted">{error}</p>
            <p className="mt-2 text-sm text-muted">
              Проверьте имя таблицы <strong>{table}</strong>, RLS-политики (нужен SELECT
              для anon) и доступность API.
            </p>
          </div>
        )}

        {configured && !error && data.length === 0 && (
          <div className="border border-border bg-surface p-8 text-center">
            <p className="text-muted">В каталоге пока нет объектов.</p>
            <Link
              href="/contacts"
              className="mt-4 inline-flex text-sm font-bold uppercase tracking-[0.12em] text-primary"
            >
              Оставить заявку
            </Link>
          </div>
        )}

        {configured && !error && data.length > 0 && (
          <CatalogExplorer objects={data} />
        )}
      </PageContainer>
    </>
  );
}
