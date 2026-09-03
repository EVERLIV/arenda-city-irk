import Image from "next/image";
import Link from "next/link";
import { getCategories } from "@/lib/content";

const faces = [
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=120&h=120&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&h=120&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&h=120&fit=crop&crop=face",
];

export function TrustStrip() {
  return (
    <section className="border-y border-border bg-white py-8">
      <div className="mx-auto flex max-w-[var(--content-width)] flex-col items-center gap-5 px-[var(--page-pad-x)] sm:flex-row sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex -space-x-3">
            {faces.map((src, i) => (
              <div
                key={src}
                className="relative h-11 w-11 overflow-hidden rounded-full border-2 border-white shadow-sm"
                style={{ zIndex: faces.length - i }}
              >
                <Image src={src} alt="" fill className="object-cover" />
              </div>
            ))}
          </div>
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-muted">
            Нам доверяют предприниматели
          </p>
        </div>
        <p className="text-center text-sm text-muted sm:text-right">
          Более {getCategories().length} направлений коммерческой недвижимости и
          наружной рекламы
        </p>
      </div>
    </section>
  );
}

export function StatsHero() {
  const count = getCategories().length;

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1800&h=1000&fit=crop"
          alt="Городской пейзаж"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/35" />
      </div>

      <div className="relative mx-auto grid max-w-[var(--content-width)] gap-8 px-[var(--page-pad-x)] py-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:py-24">
        <div className="text-white">
          <p className="section-label mb-4 text-white/70">Подбор под задачу</p>
          <h2 className="max-w-2xl text-4xl font-extrabold tracking-tight lg:text-[3rem] lg:leading-[1.05]">
            {count} категорий — одна команда экспертов
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/85">
            Каталог агентства открыт. Расскажите о задаче — подберём формат,
            локацию и условия, если нужного объекта ещё нет в выдаче.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/categories"
              className="inline-flex items-center justify-center bg-primary px-6 py-3 text-sm font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-primary-hover"
            >
              Все категории
            </Link>
            <Link
              href="/contacts"
              className="inline-flex items-center justify-center border border-white/70 px-6 py-3 text-sm font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-white/10"
            >
              Консультация
            </Link>
          </div>
        </div>

        <div className="border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-white/75">
            Наружная реклама
          </p>
          <p className="mt-3 text-2xl font-extrabold text-white">
            Размещение на объектах агентства
          </p>
          <p className="mt-3 text-sm leading-relaxed text-white/80">
            Билборды, фасады, стенды и LED-экраны в локациях с высоким трафиком.
          </p>
          <Link
            href="/advertising"
            className="mt-5 inline-flex text-sm font-bold uppercase tracking-[0.12em] text-white underline-offset-4 hover:underline"
          >
            Смотреть форматы
          </Link>
        </div>
      </div>
    </section>
  );
}
