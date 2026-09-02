import Image from "next/image";
import Link from "next/link";
import {
  type Category,
  getRelatedCategories,
} from "@/lib/content";
import { CallbackDialog } from "@/components/forms/CallbackDialog";
import { CtaBar } from "@/components/sections/CtaBar";
import {
  HeroBanner,
  PageContainer,
  ProcessSteps,
  SectionLabel,
  SectionLead,
  SectionTitle,
  ServiceLinkList,
  StatGrid,
  SurfaceCard,
} from "@/components/design-system";
import { ArrowUpRight } from "lucide-react";

export function CategoryPageContent({ category }: { category: Category }) {
  const related = getRelatedCategories(category.relatedSlugs);

  return (
    <>
      <HeroBanner
        image={category.image}
        imageAlt={category.title}
        eyebrow="Категория недвижимости"
        title={category.title}
        description={category.shortDescription}
        tall
      />

      <section className="border-b border-border bg-surface py-14 lg:py-20">
        <PageContainer>
          <StatGrid stats={category.stats} />
        </PageContainer>
      </section>

      <section className="py-16 lg:py-24">
        <PageContainer>
          <div className="grid gap-12 xl:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-6">
              <SectionLabel>О категории</SectionLabel>
              <SectionTitle size="h1">{category.title}</SectionTitle>
              {category.longDescription.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="text-base leading-[1.8] text-muted lg:text-[1.05rem]">
                  {paragraph}
                </p>
              ))}
            </div>

            <SurfaceCard variant="surface" padding="lg" className="h-fit xl:sticky xl:top-28">
              <SectionLabel className="mb-3">Заявка</SectionLabel>
              <h3 className="text-xl font-extrabold text-ink">Получить консультацию</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Расскажем о возможностях в категории «{category.title}» и подберём
                варианты под вашу задачу. Без публичного каталога — только
                персональный подбор.
              </p>
              <div className="mt-6 space-y-3">
                <CallbackDialog
                  triggerLabel="Оставить заявку"
                  triggerClassName="w-full rounded-none py-3 font-bold uppercase tracking-[0.08em]"
                />
                <p className="text-xs text-muted">
                  Или воспользуйтесь AI-консультантом в правом нижнем углу экрана.
                </p>
              </div>
            </SurfaceCard>
          </div>
        </PageContainer>
      </section>

      <section className="border-y border-border bg-muted-bg py-16 lg:py-24">
        <PageContainer>
          <SectionLabel className="mb-3">Сценарии</SectionLabel>
          <SectionTitle className="mb-10 max-w-2xl">
            Для каких задач подходит эта категория
          </SectionTitle>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {category.useCases.map((item, index) => (
              <SurfaceCard key={item.title} padding="lg" className="h-full">
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-lg font-extrabold text-ink">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              </SurfaceCard>
            ))}
          </div>
        </PageContainer>
      </section>

      <section className="py-16 lg:py-24">
        <PageContainer>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <SectionLabel className="mb-3">Форматы</SectionLabel>
              <SectionTitle className="mb-8">Варианты внутри категории</SectionTitle>
              <div className="space-y-4">
                {category.formats.map((format) => (
                  <div
                    key={format.title}
                    className="border border-border bg-white p-6 transition-colors hover:border-primary/25"
                  >
                    <h3 className="font-extrabold text-ink">{format.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {format.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <SectionLabel className="mb-3">Преимущества</SectionLabel>
              <SectionTitle className="mb-8">Почему работать с нами</SectionTitle>
              <ServiceLinkList items={category.benefits} bullet="red" />
            </div>
          </div>
        </PageContainer>
      </section>

      <section className="border-y border-border bg-surface py-16 lg:py-24">
        <PageContainer>
          <SectionLabel className="mb-3">Процесс</SectionLabel>
          <SectionTitle className="mb-4">Как мы работаем</SectionTitle>
          <SectionLead className="mb-10 max-w-2xl">
            Прозрачный процесс от первой заявки до сделки — без публичного каталога
            объектов на сайте.
          </SectionLead>
          <ProcessSteps steps={category.process} />
        </PageContainer>
      </section>

      <section className="py-16 lg:py-24">
        <PageContainer>
          <SectionLabel className="mb-3">Галерея</SectionLabel>
          <SectionTitle className="mb-10">Примеры форматов категории</SectionTitle>
          <div className="grid gap-4 md:grid-cols-3">
            {category.gallery.map((src, index) => (
              <div key={src} className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={src}
                  alt={`${category.title} — пример ${index + 1}`}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            ))}
          </div>
        </PageContainer>
      </section>

      <section className="border-t border-border bg-muted-bg py-16 lg:py-24">
        <PageContainer>
          <SectionLabel className="mb-3">FAQ</SectionLabel>
          <SectionTitle className="mb-10">Частые вопросы</SectionTitle>
          <div className="grid gap-4 lg:grid-cols-2">
            {category.faq.map((item) => (
              <SurfaceCard key={item.question} padding="lg">
                <h3 className="font-extrabold text-ink">{item.question}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {item.answer}
                </p>
              </SurfaceCard>
            ))}
          </div>
        </PageContainer>
      </section>

      {related.length > 0 && (
        <section className="py-16 lg:py-24">
          <PageContainer>
            <SectionLabel className="mb-3">Смежные категории</SectionLabel>
            <SectionTitle className="mb-10">Вас также может заинтересовать</SectionTitle>
            <div className="grid gap-4 md:grid-cols-3">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/categories/${item.slug}`}
                  className="category-tile group flex items-start justify-between gap-4 p-6"
                >
                  <div>
                    <h3 className="font-extrabold text-ink">{item.title}</h3>
                    <p className="mt-2 text-sm text-muted">{item.shortDescription}</p>
                  </div>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-primary opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              ))}
            </div>
          </PageContainer>
        </section>
      )}

      <CtaBar />
    </>
  );
}
