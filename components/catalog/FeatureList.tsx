import { StaggerItem } from "@/components/motion/StaggerItem";
import { getFeatureItems } from "@/lib/catalog/feature-icons";

export function FeatureList({ features }: { features: string[] }) {
  const items = getFeatureItems(features);

  return (
    <section className="rounded-sm border border-border bg-white p-5 shadow-[var(--shadow-soft)] sm:p-6">
      <h2 className="mb-4 text-lg font-extrabold text-ink">Преимущества</h2>
      <ul className="grid gap-3 sm:grid-cols-2">
        {items.map((item, index) => {
          const Icon = item.icon;
          return (
            <StaggerItem key={item.text} index={index}>
              <li className="feature-item flex items-start gap-3 rounded-sm border border-border bg-surface px-4 py-3.5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-primary-soft text-primary">
                  <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                </span>
                <span className="pt-1.5 text-sm leading-relaxed text-ink">{item.text}</span>
              </li>
            </StaggerItem>
          );
        })}
      </ul>
    </section>
  );
}
