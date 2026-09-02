import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { CallbackDialog } from "@/components/forms/CallbackDialog";

const serviceGroups = [
  {
    title: "Каталог",
    bullet: "bullet-red",
    links: [
      { href: "/catalog", label: "Все объекты" },
      { href: "/categories", label: "Категории услуг" },
      { href: "/contacts", label: "Заявка на подбор" },
    ],
  },
  {
    title: "Аренда",
    bullet: "bullet-warm",
    links: [
      { href: "/categories/kommercheskaya", label: "Коммерческие помещения" },
      { href: "/categories/ofisy", label: "Офисы и коворкинги" },
      { href: "/categories/pavilony", label: "Павильоны и киоски" },
      { href: "/categories/sklady", label: "Склады и логистика" },
    ],
  },
  {
    title: "Продажа",
    bullet: "bullet-gold",
    links: [
      { href: "/categories/zemlya", label: "Земельные участки" },
      { href: "/categories/kommercheskaya", label: "Торговые площади" },
      { href: "/categories/biznes-centry", label: "Помещения в БЦ" },
      { href: "/categories/ofisy", label: "Офисы с отделкой" },
    ],
  },
  {
    title: "Реклама",
    bullet: "bullet-teal",
    links: [
      { href: "/advertising", label: "Наружная реклама на объектах" },
      { href: "/advertising/billbordy", label: "Билборды 3×6" },
      { href: "/advertising/fasady", label: "Баннеры на фасадах" },
      { href: "/advertising/led-ekrany", label: "LED-экраны" },
    ],
  },
];

const differentiators = [
  "Работаем с коммерческой недвижимостью, а не с массовым каталогом квартир",
  "Подбираем локации под бизнес-задачу, а не просто показываем объекты",
  "Размещаем наружную рекламу на собственных и партнёрских площадках",
  "AI-консультант и обратный звонок доступны в любое время",
  "Персональный менеджер на каждую заявку",
];

export function HomeIntro() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-[1320px] px-6 pb-10 pt-10 lg:pb-14 lg:pt-12">
        <div className="mb-8 hidden justify-end lg:flex">
          <p className="editorial-quote max-w-sm text-right text-[15px] leading-relaxed">
            «Любить своё дело — значит видеть в нём не только прибыль, но и
            ответственность перед клиентом»
          </p>
        </div>

        <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_300px]">
          <div>
            <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start">
              <div className="relative z-10">
                <div className="mb-5 inline-flex items-center gap-2 text-sm text-ink">
                  <span className="inline-block h-2.5 w-2.5 bg-primary" />
                  <span className="font-medium">
                    Агентство коммерческой недвижимости в Иркутске и области
                  </span>
                </div>

                <h1 className="max-w-[11ch] text-[2.35rem] font-extrabold leading-[1.02] tracking-[-0.03em] text-ink sm:text-[3rem] lg:text-[3.45rem]">
                  Ищете{" "}
                  <span className="text-primary">недвижимость</span> для бизнеса
                  — вы нашли больше
                </h1>

                <p className="mt-5 max-w-xl text-[1.02rem] leading-relaxed text-muted">
                  Земля, офисы, павильоны, склады и коммерческие помещения.
                  Подбираем категорию и формат под вашу задачу — без публичного
                  каталога объектов.
                </p>
              </div>

              <div className="relative min-h-[280px] lg:min-h-[360px]">
                <div className="absolute inset-0 overflow-hidden bg-[#e9edf2]">
                  <Image
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&h=1000&fit=crop"
                    alt="Коммерческая недвижимость"
                    fill
                    className="object-cover object-[center_30%]"
                    priority
                  />
                </div>
                <div className="absolute -bottom-5 -left-5 hidden h-28 w-28 border-4 border-white bg-primary/90 shadow-xl lg:block" />
                <div className="absolute -right-3 top-8 hidden h-20 w-20 bg-accent-gold/90 shadow-lg lg:block" />
              </div>
            </div>

            <div className="mt-12 grid gap-8 border-t border-border pt-10 sm:grid-cols-2 xl:grid-cols-4">
              {serviceGroups.map((group) => (
                <div key={group.title}>
                  <h2 className="mb-4 text-[1.35rem] font-extrabold tracking-tight text-ink">
                    {group.title}
                  </h2>
                  <ul className="space-y-2.5">
                    {group.links.map((link) => (
                      <li key={link.href + link.label}>
                        <Link
                          href={link.href}
                          className={`service-link ${group.bullet}`}
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

          <aside className="space-y-5 xl:pt-2">
            <div className="video-card aspect-[4/3]">
              <Image
                src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop"
                alt="Городской пейзаж"
                fill
                className="object-cover"
              />
              <div className="play-btn">
                <Play className="ml-0.5 h-5 w-5 fill-current" />
              </div>
              <div className="absolute bottom-3 left-3 z-[2] text-xs font-semibold uppercase tracking-[0.16em] text-white">
                Аренда Сити сегодня
              </div>
            </div>

            <div className="border border-border bg-surface p-5">
              <h3 className="mb-4 text-sm font-extrabold uppercase tracking-[0.14em] text-ink">
                Аренда Сити — это другое
              </h3>
              <ul className="space-y-3">
                {differentiators.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-[13px] leading-relaxed text-muted"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/categories"
                className="mt-5 inline-flex w-full items-center justify-center border border-border bg-white px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-primary/30 hover:text-primary"
              >
                Все услуги
              </Link>
            </div>
          </aside>
        </div>
      </div>

      <ContactStrip />
    </section>
  );
}

function ContactStrip() {
  return (
    <div className="contact-strip">
      <div className="mx-auto grid max-w-[1320px] gap-6 px-6 py-7 lg:grid-cols-[1.1fr_auto_auto] lg:items-center">
        <p className="editorial-quote max-w-md text-[15px] leading-relaxed">
          Подскажите, с кем можно поговорить о помещении под магазин или офис в
          проходной локации?
        </p>

        <div className="text-center lg:text-left">
          <a
            href={siteConfig.phoneHref}
            className="text-[1.75rem] font-extrabold tracking-tight text-ink transition-colors hover:text-primary"
          >
            {siteConfig.phone}
          </a>
          <p className="mt-1 flex items-center justify-center gap-2 text-sm text-muted lg:justify-start">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
            {siteConfig.workingHoursFull}
          </p>
        </div>

        <div className="flex justify-center lg:justify-end">
          <CallbackDialog
            triggerLabel="Перезвоните мне"
            triggerSize="lg"
            triggerClassName="min-w-[220px] rounded-none px-8 font-bold uppercase tracking-[0.08em]"
          />
        </div>
      </div>
    </div>
  );
}
