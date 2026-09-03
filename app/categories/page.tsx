import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getCategories } from "@/lib/content";
import { CtaBar } from "@/components/sections/CtaBar";

export const metadata: Metadata = {
  title: "Категории недвижимости",
  description:
    "Земля, коммерция, офисы, павильоны, склады и бизнес-центры в Иркутске и области. Каталог агентства и персональный подбор.",
};

export default function CategoriesPage() {
  const categories = getCategories();

  return (
    <>
      <section className="border-b border-border bg-white">
        <div className="mx-auto max-w-[1320px] px-6 py-10 lg:py-12">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-muted">
            Категории
          </p>
          <h1 className="max-w-3xl text-2xl font-extrabold tracking-tight text-ink sm:text-3xl lg:text-[2.4rem] lg:leading-[1.08]">
            Недвижимость для бизнеса —{" "}
            <span className="text-primary">по направлениям</span>
          </h1>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted">
            Шесть категорий: от земли и складов до офисов и павильонов. Часть
            объектов уже в каталоге, остальное подбираем после заявки.
          </p>
          <Link
            href="/catalog"
            className="mt-4 inline-block text-xs font-bold uppercase tracking-[0.12em] text-primary"
          >
            Открыть каталог →
          </Link>
        </div>
      </section>

      <section className="bg-white py-8 lg:py-10">
        <div className="mx-auto max-w-[1320px] px-6">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
                className="group grid grid-rows-[140px_auto] border border-border bg-white transition-colors hover:border-primary/40"
              >
                <div className="relative overflow-hidden bg-muted-bg">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-sm font-extrabold text-ink">{category.title}</h2>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-muted">
                    {category.description}
                  </p>
                  <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.12em] text-primary">
                    Подробнее
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBar />
    </>
  );
}
