import { PageContainer } from "@/components/design-system";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}

export function PageHero({
  eyebrow,
  title,
  description,
  children,
  className,
}: PageHeroProps) {
  return (
    <section className={className ?? "border-b border-border bg-surface"}>
      <PageContainer className="py-12 lg:py-16">
        {eyebrow && <p className="section-label mb-3">{eyebrow}</p>}
        <h1 className="max-w-3xl text-3xl font-extrabold tracking-tight text-ink lg:text-[2.8rem] lg:leading-[1.05]">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted lg:text-lg">
            {description}
          </p>
        )}
        {children}
      </PageContainer>
    </section>
  );
}
