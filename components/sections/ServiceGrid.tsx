import Link from "next/link";

const services = [
  {
    title: "Аренда",
    links: [
      { href: "/categories/kommercheskaya", label: "Коммерческие помещения" },
      { href: "/categories/ofisy", label: "Офисы" },
      { href: "/categories/pavilony", label: "Павильоны и киоски" },
      { href: "/categories/sklady", label: "Склады" },
    ],
  },
  {
    title: "Продажа",
    links: [
      { href: "/categories/zemlya", label: "Земельные участки" },
      { href: "/categories/kommercheskaya", label: "Коммерческая недвижимость" },
      { href: "/categories/biznes-centry", label: "Бизнес-центры" },
    ],
  },
  {
    title: "Консультации",
    links: [
      { href: "/contacts", label: "Бесплатная консультация" },
      { href: "/about", label: "О компании" },
      { href: "/categories", label: "Все категории" },
    ],
  },
  {
    title: "Реклама",
    links: [
      { href: "/advertising", label: "Наружная реклама" },
      { href: "/advertising/billbordy", label: "Билборды" },
      { href: "/advertising/fasady", label: "Баннеры на фасадах" },
      { href: "/advertising/led-ekrany", label: "LED-экраны" },
    ],
  },
];

export function ServiceGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
      <h2 className="mb-10 text-3xl font-bold">Услуги агентства</h2>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((group) => (
          <div key={group.title}>
            <h3 className="mb-4 text-lg font-semibold text-primary">
              {group.title}
            </h3>
            <ul className="space-y-2">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
