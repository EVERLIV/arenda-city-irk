import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

const footerColumns = [
  {
    title: "Аренда",
    links: [
      { href: "/categories/kommercheskaya", label: "Коммерческие помещения" },
      { href: "/categories/ofisy", label: "Офисы" },
      { href: "/categories/pavilony", label: "Павильоны" },
      { href: "/categories/sklady", label: "Склады" },
    ],
  },
  {
    title: "Продажа",
    links: [
      { href: "/categories/zemlya", label: "Земельные участки" },
      { href: "/categories/biznes-centry", label: "Бизнес-центры" },
      { href: "/categories/kommercheskaya", label: "Коммерческая недвижимость" },
    ],
  },
  {
    title: "Реклама",
    links: [
      { href: "/advertising", label: "Наружная реклама" },
      { href: "/advertising/billbordy", label: "Билборды" },
      { href: "/advertising/fasady", label: "Фасады" },
      { href: "/advertising/led-ekrany", label: "LED-экраны" },
    ],
  },
  {
    title: "Компания",
    links: [
      { href: "/catalog", label: "Каталог объектов" },
      { href: "/manage", label: "Сдать объект в управление" },
      { href: "/about", label: "О компании" },
      { href: "/contacts", label: "Контакты" },
      { href: "/privacy", label: "Конфиденциальность" },
      { href: "/consent", label: "Согласие на обработку ПДн" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-[#17171a] text-white print:hidden">
      <div className="mx-auto max-w-[1320px] px-6 py-14">
        <div className="mb-12 flex flex-col gap-8 border-b border-white/10 pb-10 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center bg-primary text-sm font-extrabold">
                АС
              </div>
              <div className="text-lg font-extrabold">{siteConfig.name}</div>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-white/65">
              {siteConfig.description}
            </p>
          </div>
          <div className="space-y-2">
            <a
              href={siteConfig.phoneHref}
              className="block text-2xl font-extrabold tracking-tight hover:text-primary"
            >
              {siteConfig.phone}
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="block text-sm text-white/70 hover:text-white"
            >
              {siteConfig.email}
            </a>
            <p className="text-sm text-white/55">{siteConfig.address}</p>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-white/45">
                {column.title}
              </h3>
              <ul className="space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/75 transition-colors hover:text-white"
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

      <div className="border-t border-white/10 py-4 text-center text-xs text-white/40">
        © {new Date().getFullYear()} {siteConfig.name}. Все права защищены.
      </div>
    </footer>
  );
}
