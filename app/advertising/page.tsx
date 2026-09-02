import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAdvertisingTypes } from "@/lib/content";
import { AdRequestForm } from "@/components/forms/AdRequestForm";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Наружная реклама",
  description:
    "Размещение наружной рекламы на объектах: билборды, баннеры на фасадах, стенды, LED-экраны.",
};

export default function AdvertisingPage() {
  const types = getAdvertisingTypes();

  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1800&h=900&fit=crop"
            alt="Наружная реклама"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/35" />
        </div>
        <div className="relative mx-auto max-w-[1320px] px-6 py-16 text-white lg:py-20">
          <p className="section-label mb-3 text-white/65">Реклама</p>
          <h1 className="max-w-2xl text-4xl font-extrabold tracking-tight lg:text-[3rem] lg:leading-[1.05]">
            Наружная реклама на объектах агентства
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/80">
            Билборды, фасады, стенды и LED-экраны в локациях с высоким трафиком.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-[1320px] px-6 py-14">
        <div className="mb-14 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {types.map((type) => (
            <Link
              key={type.slug}
              href={`/advertising/${type.slug}`}
              className="category-tile group overflow-hidden"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={type.image}
                  alt={type.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex items-start justify-between gap-3 p-4">
                <div>
                  <h2 className="font-extrabold text-ink">{type.title}</h2>
                  <p className="mt-1 text-sm text-muted">{type.shortDescription}</p>
                </div>
                <ArrowUpRight className="h-4 w-4 text-primary" />
              </div>
            </Link>
          ))}
        </div>

        <div className="grid gap-10 border border-border bg-surface p-6 lg:grid-cols-2 lg:p-8">
          <div>
            <p className="section-label mb-3">Расчёт</p>
            <h2 className="text-2xl font-extrabold tracking-tight text-ink">
              Индивидуальное предложение под ваш формат
            </h2>
            <p className="mt-4 leading-relaxed text-muted">
              Укажите тип рекламы и площадь — наш специалист подготовит предложение.
              Точная стоимость зависит от локации, срока и формата.
            </p>
            <div className="mt-6 space-y-2 text-sm text-muted">
              <p>Билборд 3×6 — от 50 000 ₽/мес</p>
              <p>Баннер на фасаде — от 30 000 ₽/мес</p>
              <p>LED-экран — индивидуальный расчёт</p>
            </div>
          </div>
          <div className="border border-border bg-white p-6">
            <h2 className="mb-4 text-xl font-extrabold text-ink">Разместить рекламу</h2>
            <AdRequestForm />
          </div>
        </div>
      </div>
    </>
  );
}
