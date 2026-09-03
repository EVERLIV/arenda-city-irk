"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Building2, LayoutGrid, Phone } from "lucide-react";
import { CallbackDialog } from "@/components/forms/CallbackDialog";
import { siteConfig } from "@/lib/site-config";
import type { ObjectRow } from "@/lib/supabase/objects";
import { cn } from "@/lib/utils";

const QUESTIONS_IMAGE =
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&h=700&fit=crop";
const REALTOR_IMAGE =
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&h=900&fit=crop";

type MapTab = "nearby" | "infra";

export function ObjectQuestionsBanner({ phoneHref }: { phoneHref: string }) {
  return (
    <section className="overflow-hidden border border-border bg-white">
      <div className="grid items-stretch sm:grid-cols-[1fr_11rem] lg:grid-cols-[1fr_14rem]">
        <div className="flex flex-col justify-center gap-4 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
          <p className="max-w-xl text-[14px] leading-relaxed text-ink sm:text-[15px]">
            Остались вопросы по объявлению? Позвоните менеджеру и уточните
            необходимую информацию
          </p>
          <a
            href={phoneHref}
            className="inline-flex h-11 shrink-0 items-center justify-center gap-2 bg-primary px-5 text-[12px] font-bold uppercase tracking-[0.08em] text-white shadow-[0_10px_24px_-12px_rgba(200,16,46,0.8)] transition-colors hover:bg-primary-hover"
          >
            <Phone className="h-3.5 w-3.5" />
            Позвонить
          </a>
        </div>
        <div className="relative hidden min-h-[7.5rem] sm:block">
          <Image
            src={QUESTIONS_IMAGE}
            alt=""
            fill
            className="object-cover"
            sizes="224px"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/20 to-white" />
        </div>
      </div>
    </section>
  );
}

export function ObjectLocationPanel({
  address,
  mapsHref,
  infrastructure,
  similarObjects,
}: {
  address: string;
  mapsHref: string;
  infrastructure: string[];
  similarObjects: ObjectRow[];
}) {
  const [tab, setTab] = useState<MapTab>(
    similarObjects.length > 0 ? "nearby" : "infra",
  );
  const mapSrc = `https://yandex.ru/map-widget/v1/?text=${encodeURIComponent(address)}&z=15`;

  return (
    <section className="border border-border bg-white">
      <div className="flex flex-wrap gap-1 border-b border-border px-3 pt-3 sm:px-4">
        <TabButton
          active={tab === "nearby"}
          onClick={() => setTab("nearby")}
          icon={LayoutGrid}
        >
          Похожие рядом
        </TabButton>
        <TabButton
          active={tab === "infra"}
          onClick={() => setTab("infra")}
          icon={Building2}
        >
          Инфраструктура
        </TabButton>
      </div>

      <div className="relative aspect-[16/10] w-full bg-muted-bg sm:aspect-[21/9]">
        <iframe
          title={`Карта: ${address}`}
          src={mapSrc}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border px-4 py-3">
        <a
          href={mapsHref}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[12px] font-bold text-primary transition-colors hover:text-primary-hover"
        >
          Открыть в Яндекс Картах
        </a>
        <Link
          href="/catalog"
          className="text-[12px] font-semibold text-muted transition-colors hover:text-ink"
        >
          Смотреть каталог рядом
        </Link>
      </div>

      {tab === "nearby" && (
        <div className="border-t border-border px-4 py-4">
          {similarObjects.length > 0 ? (
            <p className="text-[13px] leading-relaxed text-muted">
              Ниже на странице — {similarObjects.length} похожих предложений из
              каталога. На карте отмечен адрес этого объекта.
            </p>
          ) : (
            <p className="text-[13px] text-muted">
              Похожие объекты рядом появятся, когда в каталоге будут подходящие
              предложения.
            </p>
          )}
        </div>
      )}

      {tab === "infra" && (
        <div className="border-t border-border px-4 py-4">
          {infrastructure.length > 0 ? (
            <ul className="flex flex-wrap gap-2">
              {infrastructure.map((item) => (
                <li
                  key={item}
                  className="border border-border bg-muted-bg px-2.5 py-1 text-[12px] font-semibold text-ink"
                >
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-[13px] text-muted">
              Уточните инфраструктуру у менеджера — расскажем про транспорт,
              парковку и окружение объекта.
            </p>
          )}
        </div>
      )}
    </section>
  );
}

export function ObjectRealtorBanner() {
  return (
    <section className="relative overflow-hidden bg-[#1a1a1e] text-white">
      <div className="absolute inset-y-0 right-0 w-[55%] max-w-xl">
        <Image
          src={REALTOR_IMAGE}
          alt=""
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 60vw, 520px"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, #1a1a1e 0%, rgba(26,26,30,0.92) 28%, rgba(26,26,30,0.35) 62%, transparent 100%), linear-gradient(180deg, transparent 55%, rgba(200,16,46,0.28) 100%)",
          }}
        />
      </div>

      <div className="relative z-[1] max-w-lg px-5 py-8 sm:px-7 sm:py-10 lg:px-8 lg:py-12">
        <h2 className="text-xl font-extrabold tracking-tight sm:text-2xl lg:text-[1.65rem]">
          Помощь надёжных специалистов
        </h2>
        <p className="mt-2 max-w-md text-[13px] leading-relaxed text-white/75 sm:text-[14px]">
          Менеджер {siteConfig.name} поможет арендовать или купить коммерческую
          недвижимость под ваши задачи
        </p>
        <div className="mt-5">
          <CallbackDialog
            triggerLabel="Оставить заявку"
            triggerVariant="outline"
            triggerClassName="h-11 rounded-none border-0 bg-white px-5 text-[12px] font-bold uppercase tracking-[0.08em] text-ink shadow-[var(--shadow-soft)] hover:bg-white/95"
          />
        </div>
      </div>
    </section>
  );
}

function TabButton({
  active,
  onClick,
  icon: Icon,
  children,
}: {
  active: boolean;
  onClick: () => void;
  icon: typeof LayoutGrid;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 border-b-2 px-3 py-2.5 text-[13px] font-semibold transition-colors",
        active
          ? "border-primary text-ink"
          : "border-transparent text-muted hover:text-ink",
      )}
    >
      <Icon className="h-3.5 w-3.5 opacity-70" />
      {children}
    </button>
  );
}
