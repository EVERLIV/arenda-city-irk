export function FeatureList({
  features,
  title = "Преимущества",
}: {
  features: string[];
  title?: string;
}) {
  const items = features.map((text) => text.trim()).filter(Boolean);
  if (items.length === 0) return null;

  return (
    <section className="mt-6">
      <h2 className="mb-3 text-base font-extrabold tracking-tight text-ink">
        {title}
      </h2>
      <ul className="grid gap-x-8 gap-y-1.5 sm:grid-cols-2">
        {items.map((text) => (
          <li key={text} className="text-[13px] leading-snug text-ink">
            <span className="mr-1.5 text-muted">—</span>
            {text}
          </li>
        ))}
      </ul>
    </section>
  );
}
