import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

const faces = [
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=120&h=120&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&h=120&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&h=120&fit=crop&crop=face",
];

const pillars = [
  {
    title: "Опыт на рынке",
    text: "Сопровождаем аренду и продажу коммерческой недвижимости в Иркутске и области — от брифа до сделки.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&h=700&fit=crop",
    href: "/about",
  },
  {
    title: "Персональный менеджер",
    text: "Один специалист на заявку: показы, переговоры и согласование условий без цепочки пересылок.",
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&h=700&fit=crop",
    href: "/contacts",
  },
  {
    title: "Каталог и точечный подбор",
    text: "Смотрите актуальные объекты агентства. Если формата нет в выдаче — подбираем персонально.",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&h=700&fit=crop",
    href: "/catalog",
  },
  {
    title: "Наружная реклама",
    text: "Билборды, фасады, стенды и LED на объектах агентства — в связке с арендой помещения.",
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=900&h=700&fit=crop",
    href: "/advertising",
  },
  {
    title: "Объекты в управление",
    text: "Берём помещение собственника в работу: оценка, фото, показы и поиск арендатора.",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=900&h=700&fit=crop",
    href: "/manage",
  },
  {
    title: "Регион и офис",
    text: `${siteConfig.region}. Офис в ${siteConfig.city}: ${siteConfig.address}.`,
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=900&h=700&fit=crop",
    href: "/contacts",
  },
];

const serviceCards = [
  {
    title: "Аренда",
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1000&h=700&fit=crop",
    links: [
      { href: "/categories/kommercheskaya", label: "Коммерческие помещения" },
      { href: "/categories/ofisy", label: "Офисы и коворкинги" },
      { href: "/categories/pavilony", label: "Павильоны и киоски" },
      { href: "/categories/sklady", label: "Склады и логистика" },
    ],
  },
  {
    title: "Продажа",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1000&h=700&fit=crop",
    links: [
      { href: "/categories/zemlya", label: "Земельные участки" },
      { href: "/categories/kommercheskaya", label: "Торговые площади" },
      { href: "/categories/biznes-centry", label: "Помещения в БЦ" },
      { href: "/categories/ofisy", label: "Офисы с отделкой" },
    ],
  },
  {
    title: "Каталог",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1000&h=700&fit=crop",
    links: [
      { href: "/catalog", label: "Все объекты" },
      { href: "/categories", label: "Категории" },
      { href: "/manage", label: "Сдать объект" },
      { href: "/contacts", label: "Заявка на подбор" },
    ],
  },
  {
    title: "Реклама",
    image:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1000&h=700&fit=crop",
    links: [
      { href: "/advertising", label: "Наружная реклама" },
      { href: "/advertising/billbordy", label: "Билборды 3×6" },
      { href: "/advertising/fasady", label: "Баннеры на фасадах" },
      { href: "/advertising/led-ekrany", label: "LED-экраны" },
    ],
  },
];

export function AgencyHighlights() {
  return (
    <>
      <section className="border-y border-border bg-white py-6">
        <div className="mx-auto flex max-w-[1320px] flex-col items-center gap-4 px-6 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2.5">
              {faces.map((src, index) => (
                <div
                  key={src}
                  className="relative h-9 w-9 overflow-hidden rounded-full border-2 border-white"
                  style={{ zIndex: faces.length - index }}
                >
                  <Image src={src} alt="" fill className="object-cover" />
                </div>
              ))}
            </div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-muted">
              Нам доверяют предприниматели
            </p>
          </div>
          <p className="text-center text-[13px] text-muted sm:text-right">
            Коммерческая недвижимость и наружная реклама · {siteConfig.region}
          </p>
        </div>
      </section>

      <section className="bg-surface py-10 lg:py-12">
        <div className="mx-auto max-w-[1320px] px-6">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.14em] text-muted">
                Агентство
              </p>
              <h2 className="max-w-2xl text-xl font-extrabold tracking-tight text-ink sm:text-2xl">
                {siteConfig.name} — это другое
              </h2>
              <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-muted">
                Работаем с коммерческой недвижимостью, а не с массовым каталогом
                квартир. Опыт, персональный менеджер и связка «объект + реклама».
              </p>
            </div>
            <Link
              href="/about"
              className="text-[11px] font-bold uppercase tracking-[0.12em] text-primary"
            >
              О компании →
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group overflow-hidden border border-border bg-white transition-colors hover:border-primary/40"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-muted-bg">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="flex items-start justify-between gap-3 p-3.5">
                  <div>
                    <h3 className="text-sm font-extrabold text-ink">{item.title}</h3>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-muted">
                      {item.text}
                    </p>
                  </div>
                  <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-primary opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-white py-10 lg:py-12">
        <div className="mx-auto max-w-[1320px] px-6">
          <div className="mb-5">
            <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.14em] text-muted">
              Услуги
            </p>
            <h2 className="text-xl font-extrabold tracking-tight text-ink sm:text-2xl">
              Направления работы
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {serviceCards.map((card) => (
              <div
                key={card.title}
                className="overflow-hidden border border-border bg-white"
              >
                <div className="relative aspect-[5/3] overflow-hidden bg-muted-bg">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1280px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
                  <h3 className="absolute bottom-3 left-3 text-base font-extrabold text-white">
                    {card.title}
                  </h3>
                </div>
                <ul className="space-y-2 p-3.5">
                  {card.links.map((link) => (
                    <li key={link.href + link.label}>
                      <Link
                        href={link.href}
                        className="service-link bullet-red text-[13px]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
