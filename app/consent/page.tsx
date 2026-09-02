import type { Metadata } from "next";
import Link from "next/link";
import { PageContainer } from "@/components/design-system";
import { PageHero } from "@/components/layout/PageHero";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Согласие на обработку персональных данных",
  description: `Согласие на обработку персональных данных пользователей сайта ${siteConfig.name}.`,
};

export default function ConsentPage() {
  return (
    <>
      <PageHero
        eyebrow="Документы"
        title="Согласие на обработку персональных данных"
        description="Текст согласия субъекта персональных данных при отправке заявок и обращений через сайт."
      />

      <PageContainer className="max-w-3xl py-14">
        <div className="space-y-8 text-muted">
          <p>
            Настоящим я, заполняя формы на сайте агентства «{siteConfig.name}»
            ({siteConfig.url}), свободно, своей волей и в своём интересе даю
            согласие на обработку моих персональных данных Оператору:
          </p>

          <SurfaceBlock>
            <p className="font-semibold text-ink">Оператор</p>
            <p>Агентство «{siteConfig.name}»</p>
            <p>{siteConfig.address}</p>
            <p>
              Тел.:{" "}
              <a href={siteConfig.phoneHref} className="text-primary hover:underline">
                {siteConfig.phone}
              </a>
            </p>
            <p>
              Email:{" "}
              <a href={`mailto:${siteConfig.email}`} className="text-primary hover:underline">
                {siteConfig.email}
              </a>
            </p>
          </SurfaceBlock>

          <section className="space-y-3">
            <h2 className="text-xl font-extrabold text-ink">1. Перечень данных</h2>
            <p>Согласие распространяется на следующие персональные данные:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>фамилия, имя, отчество (при указании);</li>
              <li>номер телефона;</li>
              <li>адрес электронной почты;</li>
              <li>содержание обращения / заявки;</li>
              <li>иные сведения, добровольно указанные в формах Сайта.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-extrabold text-ink">2. Цели обработки</h2>
            <ul className="list-disc space-y-2 pl-5">
              <li>обработка заявок на консультацию, обратный звонок и услуги;</li>
              <li>связь со мной по вопросам коммерческой недвижимости и рекламы;</li>
              <li>направление информационных сообщений по моему запросу;</li>
              <li>ведение учёта обращений и улучшение качества сервиса.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-extrabold text-ink">3. Действия с данными</h2>
            <p>
              Согласие даётся на совершение Оператором следующих действий с
              персональными данными: сбор, запись, систематизация, накопление,
              хранение, уточнение (обновление, изменение), извлечение,
              использование, передача (предоставление, доступ) в случаях,
              предусмотренных законом или необходимых для исполнения запроса,
              обезличивание, блокирование, удаление, уничтожение.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-extrabold text-ink">4. Срок действия</h2>
            <p>
              Согласие действует с момента его предоставления и до достижения
              целей обработки либо до отзыва согласия. Я вправе отозвать согласие,
              направив письменное обращение или сообщение на{" "}
              <a href={`mailto:${siteConfig.email}`} className="text-primary hover:underline">
                {siteConfig.email}
              </a>
              .
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-extrabold text-ink">5. Подтверждение</h2>
            <p>
              Отправляя форму на Сайте, я подтверждаю, что ознакомлен(а) с{" "}
              <Link href="/privacy" className="text-primary hover:underline">
                Политикой конфиденциальности
              </Link>
              , понимаю цели и условия обработки персональных данных и даю
              согласие на их обработку на условиях настоящего документа.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-extrabold text-ink">6. Регион деятельности</h2>
            <p>
              Оператор оказывает услуги на территории {siteConfig.region}. Режим
              работы офиса: {siteConfig.workingHoursFull}.
            </p>
          </section>
        </div>
      </PageContainer>
    </>
  );
}

function SurfaceBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-1 border border-border bg-surface p-6 text-sm leading-relaxed">
      {children}
    </div>
  );
}
