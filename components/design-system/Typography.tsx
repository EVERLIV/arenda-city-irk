import { cn } from "@/lib/utils";
import { textStyles } from "@/lib/design-system";

export function SectionLabel({
  children,
  className,
  light,
}: {
  children: React.ReactNode;
  className?: string;
  light?: boolean;
}) {
  return (
    <p
      className={cn(
        "section-label",
        textStyles.label,
        light ? "text-white/65" : "text-muted",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function SectionTitle({
  children,
  className,
  as: Tag = "h2",
  size = "h2",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
  size?: "display" | "h1" | "h2" | "h3";
}) {
  return (
    <Tag className={cn(textStyles[size], "text-ink", className)}>{children}</Tag>
  );
}

export function SectionLead({
  children,
  className,
  light,
}: {
  children: React.ReactNode;
  className?: string;
  light?: boolean;
}) {
  return (
    <p
      className={cn(
        textStyles.lead,
        light ? "text-white/85" : "text-muted",
        className,
      )}
    >
      {children}
    </p>
  );
}
