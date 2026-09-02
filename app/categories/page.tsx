import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getCategories } from "@/lib/content";
import { PageHero } from "@/components/layout/PageHero";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Категории недвижимости",
  description:
    "Категории коммерческой недвижимости: земля, офисы, павильоны, склады, бизнес-центры.",
};

export default function CategoriesPage() {
  const categories = getCategories();

  return (
    <>
      <PageHero
        eyebrow="Категории"
        title="Недвижимость для бизнеса без открытого каталога"
        description="Мы работаем с категориями коммерческой недвижимости и подбираем решения под вашу задачу. Оставьте заявку — специалист свяжется с вами."
      />
      <div className="mx-auto max-w-[1320px] px-6 py-14">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category, index) => (
            <Link
              key={category.slug}
              href={`/categories/${category.slug}`}
              className="category-tile group grid min-h-[240px] grid-rows-[1fr_auto]"
            >
              <div className="relative min-h-[160px] overflow-hidden">
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
                  <h2 className="text-lg font-extrabold tracking-tight text-ink">
                    {category.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {category.shortDescription}
                  </p>
                </div>
                <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-primary opacity-0 transition-all group-hover:opacity-100" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
