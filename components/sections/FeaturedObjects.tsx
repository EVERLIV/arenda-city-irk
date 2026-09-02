import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ObjectCardCompact } from "@/components/catalog/CatalogObjectCard";
import { StaggerItem } from "@/components/motion/StaggerItem";
import { fetchObjects } from "@/lib/supabase/queries";
import { getObjectId, type ObjectRow } from "@/lib/supabase/objects";

function pickFeaturedObjects(objects: ObjectRow[], count = 4): ObjectRow[] {
  const shuffled = [...objects];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count);
}

export async function FeaturedObjects() {
  const { data, configured, error } = await fetchObjects();

  if (!configured || error || data.length === 0) {
    return null;
  }

  const featured = pickFeaturedObjects(data, Math.min(4, data.length));

  return (
    <section className="border-y border-border bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-[1320px] px-6">
        <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-label mb-3">Лучшие предложения</p>
            <h2 className="max-w-2xl text-3xl font-extrabold tracking-tight text-ink lg:text-[2.6rem] lg:leading-[1.05]">
              Актуальные объекты агентства
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
              Подборка помещений в Иркутске и области — аренда и продажа
              коммерческой недвижимости.
            </p>
          </div>
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.12em] text-primary"
          >
            Перейти в каталог
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {featured.map((object, index) => (
            <StaggerItem key={getObjectId(object) || String(index)} index={index}>
              <ObjectCardCompact object={object} />
            </StaggerItem>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/catalog"
            className="inline-flex min-w-[220px] items-center justify-center border border-border bg-surface px-6 py-3 text-sm font-bold uppercase tracking-[0.1em] text-ink transition-colors hover:border-primary/30 hover:text-primary"
          >
            Смотреть все объекты
          </Link>
        </div>
      </div>
    </section>
  );
}
