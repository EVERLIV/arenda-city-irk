import type { Metadata } from "next";
import Link from "next/link";
import { ManageObjectForm } from "@/components/forms/ManageObjectForm";
import { CtaBar } from "@/components/sections/CtaBar";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Сдать объект в управление",
  description:
    "Передайте коммерческую недвижимость под управление Аренда Сити: оценка, договор, показы и поиск арендатора в Иркутске и области.",
};

const STEPS = [
  {
    step: "01",
    title: "Заявка",
    text: "Оставляете имя, телефон, тип объекта и адрес. Менеджер связывается в рабочий день и уточняет площадь, состояние, желаемую ставку и ограничения по арендаторам.",
  },
  {
    step: "02",
    title: "Осмотр",
    text: "Выезжаем на объект, фиксируем метраж, инженерию, входную группу и окружение. Сверяем кадастровые и правовые данные, если они есть.",
  },
  {
    step: "03",
    title: "Оценка ставки",
    text: "Сравниваем объект с рынком Иркутска и области: район, трафик, класс, конкуренты. Согласовываем с вами арендную ставку и условия публикации.",
  },
  {
    step: "04",
    title: "Договор управления",
    text: "Фиксируем комиссию, срок, порядок показов и отчётность. Ключевые решения — ставка, кандидат, срок договора с арендатором — остаются за собственником.",
  },
  {
    step: "05",
    title: "Подготовка и каталог",
    text: "Делаем фото и описание, если материалов нет. Размещаем объект в каталоге агентства и ведём входящие заявки.",
  },
  {
    step: "06",
    title: "Показы и сделка",
    text: "Отбираем арендаторов, проводим показы, передаём вам shortlist. Сопровождаем переговоры и договор аренды до подписания.",
  },
];

const WE_DO = [
  "Приём звонков и заявок по объекту",
  "Отбор кандидатов по вашим критериям",
  "Показы в согласованное время",
  "Подготовка описания и фото",
  "Публикация в каталоге Аренда Сити",
  "Сопровождение договора аренды",
];

const YOU_DO = [
  "Согласование ставки и условий",
  "Доступ на объект для осмотра и показов",
  "Решение по выбранному арендатору",
  "Подписание договора со своей стороны",
];

const TERMS = [
  {
    title: "Комиссия",
    text: "Оплата по договору после выхода на сделку. Предоплату за размещение и «вход» не берём.",
  },
  {
    title: "Срок",
    text: "Срок управления фиксируется в договоре. Расторжение — по условиям соглашения, без скрытых штрафов за публикацию.",
  },
  {
    title: "Решения",
    text: "Вы утверждаете арендатора и финальную ставку. Мы не сдаём объект в обход собственника.",
  },
  {
    title: "Отчётность",
    text: "Сообщаем о показах и статусе заявок. Формат отчёта согласуем при подписании.",
  },
  {
    title: "Типы объектов",
    text: "Офисы, торговые помещения, павильоны и киоски, склады, земля, площади в бизнес-центрах — в Иркутске и области.",
  },
  {
    title: "Реклама",
    text: "При необходимости размещаем наружную рекламу на объекте — отдельным согласованием.",
  },
];

const FAQ = [
  {
    q: "Нужно ли передавать ключи?",
    a: "Не обязательно. Можно согласовать показы под ваш график или передать ключи менеджеру на период работы.",
  },
  {
    q: "Можно ли сдать один объект, без портфеля?",
    a: "Да. Берём и одиночные помещения, и несколько точек в одном районе.",
  },
  {
    q: "Что если арендатор не найден быстро?",
    a: "Пересматриваем ставку, описание и аудиторию. Решение по снижению ставки — только ваше.",
  },
  {
    q: "Работаете ли вы с землёй?",
    a: "Да. Для участков отдельно проверяем ВРИ, обременения и кадастровый номер.",
  },
  {
    q: "Есть ли эксклюзив?",
    a: "Обсуждается. Эксклюзив даёт приоритет в продвижении, но не обязателен для старта.",
  },
  {
    q: "Когда платится комиссия?",
    a: "После заключения договора с арендатором — по условиям вашего договора с агентством.",
  },
];

export default function ManagePage() {
  return (
    <>
      <section className="border-b border-border bg-white">
        <div className="mx-auto max-w-[1320px] px-6 py-10 lg:py-12">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-muted">
            Собственникам
          </p>
          <h1 className="max-w-3xl text-2xl font-extrabold tracking-tight text-ink sm:text-3xl lg:text-[2.4rem] lg:leading-[1.08]">
            Сдать объект <span className="text-primary">в управление</span>
          </h1>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted">
            Агентство {siteConfig.name} берёт коммерческую недвижимость в работу:
            оценка рынка, договор, показы и поиск арендатора в {siteConfig.region}.
            Офис — {siteConfig.city}.
          </p>
          <div className="mt-5 flex flex-wrap gap-3 text-[13px]">
            <Link href="/catalog" className="font-bold text-primary">
              Смотреть каталог →
            </Link>
            <a href={siteConfig.phoneHref} className="font-bold text-ink hover:text-primary">
              {siteConfig.phone}
            </a>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-surface py-10">
        <div className="mx-auto max-w-[1320px] px-6">
          <h2 className="mb-4 text-lg font-extrabold text-ink">Как проходит работа</h2>
          <ol className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {STEPS.map((item) => (
              <li key={item.step} className="border border-border bg-white p-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-primary">
                  {item.step}
                </p>
                <p className="mt-1.5 text-sm font-extrabold text-ink">{item.title}</p>
                <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-border bg-white py-10">
        <div className="mx-auto grid max-w-[1320px] gap-8 px-6 lg:grid-cols-2">
          <div>
            <h2 className="mb-3 text-lg font-extrabold text-ink">Что делаем мы</h2>
            <ul className="space-y-1.5 text-[13px] text-muted">
              {WE_DO.map((item) => (
                <li key={item}>
                  <span className="mr-1.5 text-primary">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-3 text-lg font-extrabold text-ink">Что остаётся за вами</h2>
            <ul className="space-y-1.5 text-[13px] text-muted">
              {YOU_DO.map((item) => (
                <li key={item}>
                  <span className="mr-1.5 text-primary">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-white py-10">
        <div className="mx-auto max-w-[1320px] px-6">
          <h2 className="mb-4 text-lg font-extrabold text-ink">Условия</h2>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {TERMS.map((item) => (
              <div key={item.title} className="border border-border p-4">
                <h3 className="text-sm font-extrabold text-ink">{item.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-surface py-10">
        <div className="mx-auto grid max-w-[1320px] gap-8 px-6 lg:grid-cols-[1fr_22rem] lg:items-start">
          <div>
            <h2 className="mb-4 text-lg font-extrabold text-ink">Вопросы</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {FAQ.map((item) => (
                <div key={item.q} className="border border-border bg-white p-4">
                  <h3 className="text-sm font-extrabold text-ink">{item.q}</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="border border-border bg-white p-4 sm:p-5">
            <p className="text-sm font-extrabold text-ink">Заявка на управление</p>
            <p className="mt-1 mb-4 text-[12px] text-muted">
              Ответим в рабочий день, уточним параметры и назначим осмотр.
            </p>
            <ManageObjectForm idPrefix="page-manage" />
          </div>
        </div>
      </section>

      <CtaBar />
    </>
  );
}
