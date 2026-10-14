import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

const faces = [
  "/sections/agency/agent.jpg",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&h=120&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&h=120&fit=crop&crop=face",
];

type Pillar = {
  title: string;
  text: string;
  image: string;
  href: string;
  overlay?: string;
};

const pillars: Pillar[] = [
  {
    title: "Опыт на рынке",
    text: "Сопровождаем аренду и продажу коммерческой недвижимости в Иркутске и области — от брифа до сделки.",
    image: "/sections/agency/opyt.png",
    href: "/about",
  },
  {
    title: "Персональный менеджер",
    text: "Один специалист на заявку: показы, переговоры и согласование условий без цепочки пересылок.",
    image: "/sections/agency/menedzher.png",
    href: "/contacts",
  },
  {
    title: "Каталог и точечный подбор",
    text: "Смотрите актуальные объекты агентства. Если формата нет в выдаче — подбираем персонально.",
    image: "/sections/agency/katalog.png",
    href: "/catalog",
  },
  {
    title: "Наружная реклама",
    text: "Билборды, фасады, стенды и LED на объектах агентства — в связке с арендой помещения.",
    image: "/sections/agency/reklama.png",
    href: "/advertising",
  },
  {
    title: "Объекты в управлении",
    text: "Берём помещение собственника в работу: оценка, фото, показы и поиск арендатора.",
    image: "/sections/agency/layers/building.jpg",
    overlay: "/sections/agency/layers/agent.png",
    href: "/manage",
  },
  {
    title: "Регион и офис",
    text: `${siteConfig.region}. Офис в ${siteConfig.city}: ${siteConfig.address}.`,
    image: "/sections/agency/region.png",
    href: "/contacts",
  },
];

const serviceCards = [
  {
    title: "Аренда",
    number: "1",
    href: "/catalog?deal=rent",
    links: [
      { href: "/categories/kommercheskaya", label: "Коммерческие помещения" },
      { href: "/categories/ofisy", label: "Офисы и коворкинги" },
      { href: "/categories/pavilony", label: "Павильоны и киоски" },
      { href: "/categories/sklady", label: "Склады и логистика" },
    ],
  },
  {
    title: "Продажа",
    number: "2",
    href: "/catalog?deal=sale",
    links: [
      { href: "/categories/zemlya", label: "Земельные участки" },
      { href: "/categories/kommercheskaya", label: "Торговые площади" },
      { href: "/categories/biznes-centry", label: "Помещения в БЦ" },
      { href: "/categories/ofisy", label: "Офисы с отделкой" },
    ],
  },
  {
    title: "Каталог",
    number: "3",
    href: "/catalog",
    links: [
      { href: "/catalog", label: "Все объекты" },
      { href: "/categories", label: "Категории" },
      { href: "/manage", label: "Сдать объект" },
      { href: "/contacts", label: "Заявка на подбор" },
    ],
  },
  {
    title: "Реклама",
    number: "4",
    href: "/advertising",
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
        <div className="mx-auto flex max-w-[var(--content-width)] flex-col items-center gap-4 px-[var(--page-pad-x)] sm:flex-row sm:justify-between">
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

      <section className="scroll-mt-[var(--site-header-offset)] bg-white py-12 lg:py-16">
        <div className="mx-auto max-w-[var(--content-width)] px-[var(--page-pad-x)]">
          <div className="mb-8 flex flex-col gap-4 lg:mb-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-muted">
                Агентство
              </p>
              <h2 className="text-[1.65rem] font-extrabold tracking-tight text-ink sm:text-[2rem] lg:text-[2.15rem] lg:leading-tight">
                {siteConfig.name} — это другое
              </h2>
              <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-muted sm:text-[15px]">
                Работаем с коммерческой недвижимостью, а не с массовым каталогом
                квартир. Опыт, персональный менеджер и связка «объект + реклама».
              </p>
            </div>
            <Link
              href="/about"
              className="shrink-0 text-[12px] font-bold uppercase tracking-[0.12em] text-primary"
            >
              О компании →
            </Link>
          </div>

          <div className="grid gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map((item) => (
              <Link key={item.title} href={item.href} className="group block">
                {/* Exact Figma card media: 318×200 */}
                <div className="relative aspect-[318/200] overflow-hidden bg-[#f8fbfd]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    unoptimized
                  />
                  {item.overlay ? (
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-[74%]">
                      <Image
                        src={item.overlay}
                        alt=""
                        fill
                        className="object-contain object-bottom object-right"
                        sizes="(max-width: 768px) 70vw, 25vw"
                        unoptimized
                      />
                    </div>
                  ) : null}
                </div>
                <div className="pt-3.5">
                  <h3 className="text-[15px] font-extrabold tracking-tight text-ink sm:text-base">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-muted">
                    {item.text}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="scroll-mt-[var(--site-header-offset)] border-y border-border bg-white py-10 lg:py-12">
        <div className="mx-auto max-w-[var(--content-width)] px-[var(--page-pad-x)]">
          <div className="mb-5">
            <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.14em] text-muted">
              Услуги
            </p>
            <h2 className="text-xl font-extrabold tracking-tight text-ink sm:text-2xl">
              Направления работы
            </h2>
          </div>

          <div className="grid gap-[18px] sm:grid-cols-2 xl:grid-cols-4">
            {serviceCards.map((card) => (
              <div key={card.title}>
                <Link
                  href={card.href}
                  className="relative flex h-[141px] flex-col justify-between bg-primary p-4 text-white transition-colors hover:bg-primary-hover"
                >
                  <span className="self-end text-[60px] font-bold leading-none tracking-tight">
                    {card.number}
                  </span>
                  <span className="text-lg font-bold leading-none">{card.title}</span>
                </Link>
                <ul className="space-y-2.5 pt-3.5">
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
