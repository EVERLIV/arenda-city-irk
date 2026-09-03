import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageHero } from "@/components/layout/PageHero";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Контакты",
  description: `Контакты агентства ${siteConfig.name} в ${siteConfig.region}: телефон, email, адрес офиса в Ангарске.`,
};

export default function ContactsPage() {
  return (
    <>
      <PageHero
        eyebrow="Контакты"
        title="Свяжитесь с нами"
        description={`Работаем в ${siteConfig.region}. Позвоните, напишите или оставьте сообщение — ответим в рабочее время.`}
      />

      <div className="mx-auto max-w-[var(--content-width)] px-[var(--page-pad-x)] py-14">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-8 border border-border bg-surface p-6 lg:p-8">
            <div>
              <p className="section-label mb-2">Регион</p>
              <p className="text-lg text-ink">{siteConfig.region}</p>
            </div>
            <div>
              <p className="section-label mb-2">Телефон</p>
              <a
                href={siteConfig.phoneHref}
                className="text-2xl font-extrabold text-ink hover:text-primary"
              >
                {siteConfig.phone}
              </a>
            </div>
            <div>
              <p className="section-label mb-2">Email</p>
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-lg text-ink hover:text-primary"
              >
                {siteConfig.email}
              </a>
            </div>
            <div>
              <p className="section-label mb-2">Адрес</p>
              <p className="text-lg leading-relaxed text-ink">{siteConfig.address}</p>
            </div>
            <div>
              <p className="section-label mb-2">Режим работы</p>
              <p className="text-lg text-ink">{siteConfig.workingHours}</p>
              <p className="text-lg text-ink">{siteConfig.workingHoursSaturday}</p>
            </div>
          </div>

          <div className="border border-border bg-white p-6 lg:p-8">
            <h2 className="mb-6 text-2xl font-extrabold text-ink">Написать нам</h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </>
  );
}
