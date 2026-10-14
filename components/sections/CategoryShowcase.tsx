import Image from "next/image";
import Link from "next/link";
import { getCategories } from "@/lib/content";
import { ArrowUpRight } from "lucide-react";

export function CategoryShowcase() {
  const categories = getCategories();

  return (
    <section className="scroll-mt-[var(--site-header-offset)] bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-[var(--content-width)] px-[var(--page-pad-x)]">
        <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.14em] text-muted">
              Категории
            </p>
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

        <div className="grid gap-[18px] md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category, index) => (
            <Link
              key={category.slug}
              href={`/categories/${category.slug}`}
              className="group grid h-[300px] grid-rows-[178px_1fr] overflow-hidden border border-border bg-white"
            >
              <div className="relative overflow-hidden bg-muted-bg">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <span className="absolute left-5 top-5 text-[15px] font-bold tracking-wide text-white/90">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="px-5 py-4">
                <h3 className="text-[17px] font-extrabold tracking-tight text-ink">
                  {category.title}
                </h3>
                <p className="mt-1.5 text-[13px] leading-snug text-muted">
                  {category.shortDescription}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
