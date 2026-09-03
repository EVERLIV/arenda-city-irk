"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ObjectCardCompact } from "@/components/catalog/CatalogObjectCard";
import { getObjectId, getObjectType, type ObjectRow } from "@/lib/supabase/objects";

export function ObjectsByCategory({ objects }: { objects: ObjectRow[] }) {
  const groups = useMemo(() => {
    const map = new Map<string, ObjectRow[]>();
    for (const object of objects) {
      const type = getObjectType(object) ?? "Другое";
      const list = map.get(type) ?? [];
      list.push(object);
      map.set(type, list);
    }
    return [...map.entries()].sort((a, b) => b[1].length - a[1].length);
  }, [objects]);

  const tabs = useMemo(
    () => [{ label: "Все", items: objects }, ...groups.map(([label, items]) => ({ label, items }))],
    [groups, objects],
  );

  const [active, setActive] = useState("Все");
  const current = tabs.find((tab) => tab.label === active) ?? tabs[0];
  const visible = current.items.slice(0, 10);

  if (objects.length === 0) return null;

  return (
    <section className="bg-white py-10 lg:py-12">
      <div className="mx-auto max-w-[var(--content-width)] px-[var(--page-pad-x)]">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.14em] text-muted">
              По категориям
            </p>
            <h2 className="text-xl font-extrabold tracking-tight text-ink sm:text-2xl">
              Объекты по типам
            </h2>
          </div>
          <Link
            href="/catalog"
            className="text-xs font-bold uppercase tracking-[0.12em] text-primary"
          >
            Весь каталог →
          </Link>
        </div>

        <div className="mb-4 flex gap-1.5 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {tabs.map((tab) => (
            <button
              key={tab.label}
              type="button"
              onClick={() => setActive(tab.label)}
              className={`shrink-0 border px-3 py-1.5 text-[12px] font-semibold ${
                active === tab.label
                  ? "border-primary bg-primary-soft text-ink"
                  : "border-border bg-white text-muted"
              }`}
            >
              {tab.label}
              <span className="ml-1.5 text-[11px] font-medium text-muted">{tab.items.length}</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-x-5 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
          {visible.map((object, index) => (
            <ObjectCardCompact key={getObjectId(object) || `${active}-${index}`} object={object} />
          ))}
        </div>
      </div>
    </section>
  );
}
