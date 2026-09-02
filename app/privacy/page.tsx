import type { Metadata } from "next";
import Link from "next/link";
import { PageContainer } from "@/components/design-system";
import { PageHero } from "@/components/layout/PageHero";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Политика конфиденциальности",
  description: `Политика конфиденциальности и защиты персональных данных агентства ${siteConfig.name}.`,
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Документы"
        title="Политика конфиденциальности"
        description="Порядок сбора, хранения и защиты персональных данных пользователей сайта агентства «Аренда Сити»."
      />

      <PageContainer className="max-w-3xl py-14">
        <div className="space-y-8 text-muted">
          <p>
            Настоящая Политика конфиденциальности определяет порядок обработки и
            защиты персональных данных пользователей сайта {siteConfig.name}
            (далее — «Сайт»), расположенного по адресу {siteConfig.url}.
          </p>
          <p>
            Оператор персональных данных: агентство «{siteConfig.name}»,
            адрес: {siteConfig.address}, email:{" "}
            <a href={`mailto:${siteConfig.email}`} className="text-primary hover:underline">
              {siteConfig.email}
            </a>
            , телефон:{" "}
            <a href={siteConfig.phoneHref} className="text-primary hover:underline">
              {siteConfig.phone}
            </a>
            .
          </p>

          <section className="space-y-3">
            <h2 className="text-xl font-extrabold text-ink">1. Какие данные мы собираем</h2>
            <p>
              Мы обрабатываем персональные данные, которые вы добровольно указываете
              при заполнении форм на Сайте: имя, номер телефона, адрес электронной
              почты, текст сообщения, сведения о типе интересующей услуги или рекламы.
            </p>
            <p>
              При использовании AI-консультанта могут обрабатываться тексты переписки
              в объёме, необходимом для ответа на ваш запрос.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-extrabold text-ink">2. Цели обработки</h2>
            <ul className="list-disc space-y-2 pl-5">
              <li>обработка заявок и обратных звонков;</li>
              <li>консультации по услугам агентства;</li>
              <li>связь с вами по вопросам аренды, продажи и рекламы;</li>
              <li>улучшение качества обслуживания и работы Сайта.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-extrabold text-ink">3. Правовые основания</h2>
            <p>
              Обработка осуществляется на основании согласия субъекта персональных
              данных и в соответствии с Федеральным законом № 152-ФЗ «О персональных
              данных». Согласие на обработку оформляется отдельным документом:{" "}
              <Link href="/consent" className="text-primary hover:underline">
                Согласие на обработку персональных данных
              </Link>
              .
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-extrabold text-ink">4. Хранение и защита</h2>
            <p>
              Мы принимаем необходимые организационные и технические меры для защиты
              персональных данных от несанкционированного доступа, изменения,
              раскрытия или уничтожения. Срок хранения — до достижения целей
              обработки либо до отзыва согласия, если иное не предусмотрено законом.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-extrabold text-ink">5. Передача третьим лицам</h2>
            <p>
              Персональные данные не передаются третьим лицам, за исключением случаев,
              предусмотренных законодательством РФ, либо когда это необходимо для
              исполнения вашего запроса (например, связь через провайдера телефонии
              при обратном звонке).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-extrabold text-ink">6. Права пользователя</h2>
            <p>
              Вы вправе запросить сведения об обработке ваших данных, потребовать
              их уточнения, блокирования или удаления, а также отозвать согласие на
              обработку, направив обращение на {siteConfig.email}.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-extrabold text-ink">7. AI-консультант</h2>
            <p>
              Не передавайте в чат паспортные данные, банковские реквизиты и иную
              конфиденциальную информацию, не нужную для первичной консультации.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-extrabold text-ink">8. Контакты</h2>
            <p>
              По вопросам конфиденциальности и персональных данных:{" "}
              <a href={`mailto:${siteConfig.email}`} className="text-primary hover:underline">
                {siteConfig.email}
              </a>
              , {siteConfig.phone}, {siteConfig.address}.
            </p>
          </section>
        </div>
      </PageContainer>
    </>
  );
}
