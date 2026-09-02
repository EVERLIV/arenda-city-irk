import { cn } from "@/lib/utils";
import { bulletClass, type BulletVariant } from "@/lib/design-system";

interface SurfaceCardProps {
  children: React.ReactNode;
  className?: string;
  padding?: "sm" | "md" | "lg";
  variant?: "default" | "surface" | "outline";
}

const paddingMap = {
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

const variantMap = {
  default: "bg-white border border-border",
  surface: "bg-surface border border-border",
  outline: "bg-transparent border border-border",
};

export function SurfaceCard({
  children,
  className,
  padding = "md",
  variant = "default",
}: SurfaceCardProps) {
  return (
    <div
      className={cn(
        variantMap[variant],
        paddingMap[padding],
        className,
      )}
    >
      {children}
    </div>
  );
}

export function ServiceLinkList({
  items,
  bullet = "red",
  className,
}: {
  items: string[];
  bullet?: BulletVariant;
  className?: string;
}) {
  return (
    <ul className={cn("space-y-3", className)}>
      {items.map((item) => (
        <li key={item} className={cn("service-link", bulletClass(bullet))}>
          {item}
        </li>
      ))}
    </ul>
  );
}

export function StatGrid({
  stats,
  className,
  light,
}: {
  stats: { value: string; label: string }[];
  className?: string;
  light?: boolean;
}) {
  return (
    <div className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-4", className)}>
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={cn(
            "border p-5",
            light
              ? "border-white/20 bg-white/10 text-white"
              : "border-border bg-white",
          )}
        >
          <p
            className={cn(
              "text-3xl font-extrabold tracking-tight",
              light ? "text-white" : "text-primary",
            )}
          >
            {stat.value}
          </p>
          <p
            className={cn(
              "mt-2 text-sm leading-relaxed",
              light ? "text-white/75" : "text-muted",
            )}
          >
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}

export function ProcessSteps({
  steps,
  className,
}: {
  steps: { step: number; title: string; description: string }[];
  className?: string;
}) {
  return (
    <ol className={cn("grid gap-4 md:grid-cols-2", className)}>
      {steps.map((item) => (
        <li
          key={item.step}
          className="flex gap-4 border border-border bg-surface p-6"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-primary text-sm font-extrabold text-white">
            {String(item.step).padStart(2, "0")}
          </span>
          <div>
            <h4 className="font-extrabold text-ink">{item.title}</h4>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {item.description}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function EditorialQuote({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <blockquote className={cn("editorial-quote text-[15px] leading-relaxed", className)}>
      {children}
    </blockquote>
  );
}
