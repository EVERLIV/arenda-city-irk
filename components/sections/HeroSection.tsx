"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CallbackDialog } from "@/components/forms/CallbackDialog";

export function HeroSection() {
  return (
    <section className="bg-muted-bg">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-16 lg:grid-cols-2 lg:px-8 lg:py-24">
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-primary">
            Агентство коммерческой недвижимости
          </p>
          <h1 className="mb-6 text-4xl font-bold leading-tight text-foreground lg:text-5xl">
            Ищете недвижимость для бизнеса — вы нашли больше
          </h1>
          <p className="mb-8 text-lg text-muted">
            Помогаем с арендой и покупкой земли, офисов, павильонов, складов и
            коммерческих помещений. Размещаем наружную рекламу на объектах.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg">
              <Link href="/categories">Смотреть категории</Link>
            </Button>
            <CallbackDialog triggerLabel="Перезвоните мне" triggerVariant="outline" />
          </div>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg">
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=800&fit=crop"
            alt="Коммерческая недвижимость"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
