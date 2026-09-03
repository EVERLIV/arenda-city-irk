import Link from "next/link";
import { ObjectCardCompact } from "@/components/catalog/CatalogObjectCard";
import { StaggerItem } from "@/components/motion/StaggerItem";
import { getObjectId, type ObjectRow } from "@/lib/supabase/objects";

function pickFeaturedObjects(objects: ObjectRow[], count = 10): ObjectRow[] {
  const shuffled = [...objects];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count);
}

export function FeaturedObjects({ objects }: { objects: ObjectRow[] }) {
  if (objects.length === 0) return null;

  const featured = pickFeaturedObjects(objects, Math.min(10, objects.length));

  return (
    <section className="border-y border-border bg-white py-10 lg:py-12">
      <div className="mx-auto max-w-[var(--content-width)] px-[var(--page-pad-x)]">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.14em] text-muted">
              Лучшие предложения
            </p>
            <h2 className="text-xl font-extrabold tracking-tight text-ink sm:text-2xl">
              Актуальные объекты
            </h2>
          </div>
          <Link
            href="/catalog"
            className="text-xs font-bold uppercase tracking-[0.12em] text-primary"
          >
            Весь каталог →
          </Link>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          {featured.map((object, index) => (
            <StaggerItem key={getObjectId(object) || String(index)} index={index}>
              <ObjectCardCompact object={object} />
            </StaggerItem>
          ))}
        </div>
      </div>
    </section>
  );
}
