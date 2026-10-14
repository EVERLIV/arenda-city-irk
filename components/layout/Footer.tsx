import Link from "next/link";
import { BrandLogo } from "@/components/brand/BrandLogo";
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
    <footer className="mt-auto bg-[#121214] text-white print:hidden">
      <div className="mx-auto max-w-[var(--content-width)] px-[var(--page-pad-x)] pt-12 pb-10 lg:pt-14 lg:pb-12">
        <div className="mb-10 flex flex-col gap-8 border-b border-white/10 pb-10 lg:mb-12 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
          <div className="max-w-md">
            <BrandLogo tone="dark" className="mb-4" />
            <p className="text-[13px] leading-[1.55] text-white/55 sm:text-sm">
              {siteConfig.description}
            </p>
          </div>

          <div className="shrink-0 space-y-2 lg:text-right">
            <a
              href={siteConfig.phoneHref}
              className="block text-[1.65rem] font-extrabold tracking-tight text-white transition-colors hover:text-primary sm:text-[1.85rem]"
            >
              {siteConfig.phone}
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="block text-sm text-white/60 transition-colors hover:text-white"
            >
              {siteConfig.email}
            </a>
            <p className="max-w-xs text-sm leading-relaxed text-white/45 lg:ml-auto">
              {siteConfig.address}
            </p>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className="mb-4 text-[11px] font-bold uppercase tracking-[0.16em] text-white/40">
                {column.title}
              </h3>
              <ul className="space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-[13px] text-white/70 transition-colors hover:text-white sm:text-sm"
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

      <div className="border-t border-white/10 py-4 text-center text-[11px] text-white/35 sm:text-xs">
        © {new Date().getFullYear()} {siteConfig.name}. Все права защищены.
      </div>
    </footer>
  );
}
