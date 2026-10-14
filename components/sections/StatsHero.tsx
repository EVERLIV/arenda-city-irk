import Image from "next/image";
import Link from "next/link";
import { getCategories } from "@/lib/content";

const OBJECT_BG = "/sections/cta/object-bg.jpg";

export function StatsHero() {
  const count = getCategories().length;

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={OBJECT_BG}
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          quality={90}
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/25" />
      </div>

      <div className="relative mx-auto flex min-h-[420px] max-w-[var(--content-width)] items-center px-[var(--page-pad-x)] py-14 lg:min-h-[512px] lg:py-16">
        <div className="max-w-[34rem] text-white">
          <h2 className="text-[2rem] font-extrabold leading-[1.05] tracking-tight sm:text-[2.75rem] lg:text-[50px] lg:leading-[50px]">
            {count} категорий — одна
            <br className="hidden sm:block" /> команда экспертов
          </h2>
          <p className="mt-5 max-w-[31rem] text-base leading-[1.55] text-white/90 sm:text-lg sm:leading-[26px]">
            Каталог агентства открыт. Расскажите о задаче — подберём формат,
            локацию и условия, если нужного объекта ещё нет в выдаче.
          </p>
          <div className="mt-8 flex flex-wrap gap-[13px]">
            <Link
              href="/categories"
              className="inline-flex h-[46px] min-w-[178px] items-center justify-center bg-primary px-5 text-[14px] font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-primary-hover"
            >
              Все категории
            </Link>
            <Link
              href="/contacts"
              className="inline-flex h-[46px] min-w-[178px] items-center justify-center border border-white px-5 text-[14px] font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-white/10"
            >
              Консультация
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
