import Link from "next/link";
import { ManageObjectForm } from "@/components/forms/ManageObjectForm";

const STEPS = [
  {
    step: "01",
    title: "Заявка",
    text: "Оставляете контакты, тип объекта и адрес. Менеджер связывается в рабочий день.",
  },
  {
    step: "02",
    title: "Осмотр и оценка",
    text: "Выезжаем на объект, фиксируем состояние, площадь и рыночную ставку.",
  },
  {
    step: "03",
    title: "Договор",
    text: "Согласовываем комиссию, срок управления и порядок показов.",
  },
  {
    step: "04",
    title: "Размещение",
    text: "Фото, описание и публикация в каталоге. Показы ведём мы.",
  },
];

const TERMS = [
  "Комиссия — по договору, после выхода на сделку. Предоплату за «вход» не берём.",
  "Собственник согласует кандидатов и финальную ставку.",
  "Показы, звонки и первичный отбор арендаторов — на стороне агентства.",
  "Фото и описание готовим сами, если нет актуальных материалов.",
];

export function ManageObjectSection() {
  return (
    <section className="bg-surface py-10 lg:py-12">
      <div className="mx-auto max-w-[var(--content-width)] px-[var(--page-pad-x)]">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.14em] text-muted">
              Собственникам
            </p>
            <h2 className="max-w-2xl text-xl font-extrabold tracking-tight text-ink sm:text-2xl">
              Передать объект под управление
            </h2>
            <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-muted">
              Оценка, договор, показы и поиск арендатора. Вам — согласование
              кандидатов и доход без ежедневных звонков.
            </p>
          </div>
          <Link
            href="/manage"
            className="text-xs font-bold uppercase tracking-[0.12em] text-primary"
          >
            Подробные условия →
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div>
            <ol className="grid gap-3 sm:grid-cols-2">
              {STEPS.map((item) => (
                <li key={item.step} className="border border-border bg-white p-3.5">
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-primary">
                    {item.step}
                  </p>
                  <p className="mt-1 text-[13px] font-bold text-ink">{item.title}</p>
                  <p className="mt-1 text-[12px] leading-relaxed text-muted">{item.text}</p>
                </li>
              ))}
            </ol>
            <ul className="mt-4 space-y-1.5 text-[13px] leading-relaxed text-muted">
              {TERMS.map((item) => (
                <li key={item}>
                  <span className="mr-1.5 text-primary">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-border bg-white p-4 sm:p-5">
            <p className="text-sm font-extrabold text-ink">Заявка на управление</p>
            <p className="mt-1 mb-4 text-[12px] text-muted">
              Ответим в рабочий день и назначим осмотр.
            </p>
            <ManageObjectForm idPrefix="home-manage" />
          </div>
        </div>
      </div>
    </section>
  );
}
