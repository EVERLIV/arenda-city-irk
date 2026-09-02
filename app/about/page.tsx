import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { CtaBar } from "@/components/sections/CtaBar";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "О компании",
  description: `Агентство коммерческой недвижимости ${siteConfig.name} в ${siteConfig.region} — аренда, продажа и размещение наружной рекламы.`,
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="О компании"
        title="Аренда Сити — агентство коммерческой недвижимости"
        description={`Помогаем бизнесу в ${siteConfig.region} находить подходящие локации: от земельных участков и офисов до павильонов и складов. Офис в Ангарске. Размещаем наружную рекламу на объектах в проходных местах.`}
      />

      <div className="mx-auto max-w-[1320px] px-6 py-14">
        <div className="grid gap-10 border border-border bg-white p-6 lg:grid-cols-2 lg:p-8">
          <div>
            <h2 className="mb-4 text-2xl font-extrabold text-ink">Наш подход</h2>
            <p className="mb-4 leading-relaxed text-muted">
              Мы не публикуем каталог объектов на сайте. Вместо этого работаем с
              категориями недвижимости и подбираем решения под конкретную задачу
              клиента — бюджет, локация, формат, сроки.
            </p>
            <p className="leading-relaxed text-muted">
              Каждый запрос обрабатывается персонально. AI-консультант на сайте
              помогает сориентироваться в категориях, а специалисты агентства
              проводят детальную консультацию.
            </p>
          </div>
          <div>
            <h2 className="mb-4 text-2xl font-extrabold text-ink">Что мы предлагаем</h2>
            <ul className="space-y-3">
              {[
                "Аренда и продажа коммерческой недвижимости",
                "Земельные участки под застройку и бизнес",
                "Офисы, павильоны, склады, бизнес-центры",
                "Размещение наружной рекламы на объектах",
                "Юридическое сопровождение сделок",
                "AI-консультант и обратный звонок",
              ].map((item) => (
                <li key={item} className="service-link bullet-red">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <CtaBar />
    </>
  );
}
