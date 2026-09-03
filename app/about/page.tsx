import type { Metadata } from "next";
import Link from "next/link";
import { CtaBar } from "@/components/sections/CtaBar";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "О компании",
  description: `Агентство коммерческой недвижимости ${siteConfig.name} в ${siteConfig.region}: каталог, подбор, управление объектами и наружная реклама.`,
};

const FACTS = [
  { value: siteConfig.region, label: "Зона работы" },
  { value: siteConfig.city, label: "Офис" },
  { value: "6", label: "Категорий недвижимости" },
  { value: siteConfig.workingHours, label: "Приём заявок" },
];

const DIRECTIONS = [
  {
    href: "/categories/zemlya",
    title: "Земля",
    text: "Участки под торговлю, склад, производство и застройку. Проверяем ВРИ и кадастр.",
  },
  {
    href: "/categories/kommercheskaya",
    title: "Коммерция",
    text: "Street retail, ПСН, площади в ТЦ и отдельно стоящие здания.",
  },
  {
    href: "/categories/ofisy",
    title: "Офисы",
    text: "Класс A–C, с отделкой и под ремонт, в городе и области.",
  },
  {
    href: "/categories/pavilony",
    title: "Павильоны",
    text: "Киоски, МАФы и готовые точки с высоким трафиком.",
  },
  {
    href: "/categories/sklady",
    title: "Склады",
    text: "Хранение, производство, доки, высота и нагрузка на пол.",
  },
  {
    href: "/advertising",
    title: "Реклама",
    text: "Билборды, фасады, стенды и LED на объектах агентства.",
  },
];

const STEPS = [
  "Заявка или объект из каталога",
  "Уточнение задачи: площадь, район, бюджет, сроки",
  "Показы и сравнение вариантов",
  "Переговоры и договор",
];

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-border bg-white">
        <div className="mx-auto max-w-[var(--content-width)] px-[var(--page-pad-x)] py-10 lg:py-12">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-muted">
            О компании
          </p>
          <h1 className="max-w-3xl text-2xl font-extrabold tracking-tight text-ink sm:text-3xl lg:text-[2.4rem] lg:leading-[1.08]">
            {siteConfig.name} — коммерческая недвижимость{" "}
            <span className="text-primary">Иркутска и области</span>
          </h1>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted">
            Подбираем землю, офисы, павильоны, склады и торговые площади. Ведём
            каталог агентства, берём объекты собственников в управление и
            размещаем наружную рекламу. Офис: {siteConfig.address}.
          </p>
        </div>
      </section>

      <section className="border-b border-border bg-surface py-8">
        <div className="mx-auto grid max-w-[var(--content-width)] gap-4 px-[var(--page-pad-x)] sm:grid-cols-2 lg:grid-cols-4">
          {FACTS.map((item) => (
            <div key={item.label} className="border border-border bg-white p-4">
              <p className="text-sm font-extrabold text-ink">{item.value}</p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.12em] text-muted">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-b border-border bg-white py-10">
        <div className="mx-auto max-w-[var(--content-width)] px-[var(--page-pad-x)]">
          <h2 className="mb-2 text-lg font-extrabold text-ink">Как работаем</h2>
          <p className="mb-5 max-w-2xl text-[13px] leading-relaxed text-muted">
            Каталог открыт: смотрите актуальные объекты агентства. Если нужен
            формат, которого нет в выдаче — подбираем точечно после заявки.
            Сделкой занимается персональный менеджер.
          </p>
          <ol className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {STEPS.map((item, index) => (
              <li key={item} className="border border-border p-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-primary">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p className="mt-2 text-[13px] font-semibold text-ink">{item}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-border bg-white py-10">
        <div className="mx-auto max-w-[var(--content-width)] px-[var(--page-pad-x)]">
          <h2 className="mb-4 text-lg font-extrabold text-ink">Направления</h2>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {DIRECTIONS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="border border-border p-4 transition-colors hover:border-primary/40"
              >
                <h3 className="text-sm font-extrabold text-ink">{item.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{item.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-surface py-10">
        <div className="mx-auto grid max-w-[var(--content-width)] gap-8 px-[var(--page-pad-x)] lg:grid-cols-2">
          <div>
            <h2 className="mb-2 text-lg font-extrabold text-ink">Собственникам</h2>
            <p className="text-[13px] leading-relaxed text-muted">
              Передайте помещение или участок в управление: показы, отбор
              арендаторов и публикация в каталоге — наша сторона. Ставку и
              кандидата утверждаете вы.
            </p>
            <Link
              href="/manage"
              className="mt-3 inline-block text-xs font-bold uppercase tracking-[0.12em] text-primary"
            >
              Условия управления →
            </Link>
          </div>
          <div>
            <h2 className="mb-2 text-lg font-extrabold text-ink">Контакты</h2>
            <p className="text-[13px] leading-relaxed text-muted">
              {siteConfig.phone}
              <br />
              {siteConfig.email}
              <br />
              {siteConfig.workingHoursFull}
            </p>
            <Link
              href="/contacts"
              className="mt-3 inline-block text-xs font-bold uppercase tracking-[0.12em] text-primary"
            >
              Страница контактов →
            </Link>
          </div>
        </div>
      </section>

      <CtaBar />
    </>
  );
}
