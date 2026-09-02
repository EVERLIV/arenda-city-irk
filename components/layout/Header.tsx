"use client";

import Link from "next/link";
import { ChevronDown, Grid3X3, Menu, X } from "lucide-react";
import { useState } from "react";
import { siteConfig } from "@/lib/site-config";
import { Button } from "@/components/ui/button";
import { CallbackDialog } from "@/components/forms/CallbackDialog";

const topNav = [
  { href: "/categories", label: "Иркутск и область", hasDropdown: true },
  { href: "/catalog", label: "Каталог" },
  { href: "/categories", label: "Категории" },
  { href: "/advertising", label: "Реклама" },
  { href: "/about", label: "О компании" },
  { href: "/contacts", label: "Контакты" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md">
      <div className="hidden border-b border-border lg:block">
        <div className="mx-auto flex max-w-[90rem] items-center justify-between gap-6 px-6 py-2.5">
          <nav className="flex flex-wrap items-center gap-x-5 gap-y-1">
            {topNav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="inline-flex items-center gap-1 text-[13px] text-ink/80 transition-colors hover:text-primary"
              >
                {item.label}
                {item.hasDropdown && <ChevronDown className="h-3.5 w-3.5 opacity-60" />}
              </Link>
            ))}
          </nav>

          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 text-ink/80 transition-colors hover:text-primary"
            aria-label="Каталог объектов"
            title="Каталог"
          >
            <span className="text-[12px] font-bold uppercase tracking-[0.14em]">
              Каталог
            </span>
            <Grid3X3 className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="border-b border-border">
        <div className="mx-auto flex max-w-[90rem] items-center justify-between gap-4 px-6 py-4">
          <Link href="/" className="group flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center bg-primary text-lg font-extrabold tracking-tight text-white shadow-[0_10px_24px_-12px_rgba(200,16,46,0.8)] transition-transform group-hover:scale-[1.02]">
              АС
            </div>
            <div className="hidden sm:block">
              <div className="text-[1.05rem] font-extrabold tracking-tight text-ink">
                {siteConfig.name}
              </div>
              <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted">
                Коммерческая недвижимость
              </div>
            </div>
          </Link>

          <div className="hidden items-center gap-5 lg:flex">
            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 text-sm font-bold text-ink transition-colors hover:text-primary"
            >
              <Grid3X3 className="h-4 w-4" />
              Каталог
            </Link>
            <a
              href={siteConfig.phoneHref}
              className="text-sm font-bold text-ink transition-colors hover:text-primary"
            >
              {siteConfig.phone}
            </a>
            <CallbackDialog triggerLabel="Перезвоните мне" />
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href="/catalog"
              className="inline-flex h-10 w-10 items-center justify-center border border-border text-ink"
              aria-label="Каталог"
            >
              <Grid3X3 className="h-4 w-4" />
            </Link>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setOpen(!open)}
              aria-label="Меню"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {open && (
        <div className="border-b border-border bg-white px-6 py-5 lg:hidden">
          <nav className="flex flex-col gap-3">
            {topNav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-ink"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <a href={siteConfig.phoneHref} className="text-sm font-bold">
              {siteConfig.phone}
            </a>
            <CallbackDialog />
          </nav>
        </div>
      )}
    </header>
  );
}
