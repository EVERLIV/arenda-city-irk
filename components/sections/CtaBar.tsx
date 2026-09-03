import { siteConfig } from "@/lib/site-config";
import { CallbackDialog } from "@/components/forms/CallbackDialog";

export function CtaBar() {
  return (
    <section className="contact-strip">
      <div className="mx-auto flex max-w-[var(--content-width)] flex-col items-center justify-between gap-5 px-[var(--page-pad-x)] py-8 lg:flex-row">
        <div>
          <p className="section-label mb-2">Связаться</p>
          <a
            href={siteConfig.phoneHref}
            className="text-[1.6rem] font-extrabold tracking-tight text-ink hover:text-primary"
          >
            {siteConfig.phone}
          </a>
        </div>
        <CallbackDialog
          triggerLabel="Перезвоните мне"
          triggerSize="lg"
          triggerClassName="min-w-[220px] rounded-none px-8 font-bold uppercase tracking-[0.08em]"
        />
      </div>
    </section>
  );
}
