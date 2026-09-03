import Image from "next/image";
import Link from "next/link";
import { getCategories } from "@/lib/content";
import { ArrowUpRight } from "lucide-react";

export function CategoryShowcase() {
  const categories = getCategories();

  return (
    <section className="bg-surface py-16 lg:py-20">
      <div className="mx-auto max-w-[var(--content-width)] px-[var(--page-pad-x)]">
        <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-label mb-3">Категории</p>
            <h2 className="max-w-xl text-3xl font-extrabold tracking-tight text-ink lg:text-[2.6rem] lg:leading-[1.05]">
              Недвижимость для бизнеса — по направлениям
            </h2>
          </div>
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.12em] text-primary"
          >
            Все категории
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category, index) => (
            <Link
              key={category.slug}
              href={`/categories/${category.slug}`}
              className="category-tile group grid min-h-[220px] grid-rows-[1fr_auto] md:min-h-[260px]"
            >
              <div className="relative min-h-[150px] overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                <span className="absolute left-4 top-4 text-[11px] font-bold uppercase tracking-[0.18em] text-white/85">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="flex items-start justify-between gap-4 p-5">
                <div>
                  <h3 className="text-lg font-extrabold tracking-tight text-ink">
                    {category.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {category.shortDescription}
                  </p>
                </div>
                <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-primary opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
