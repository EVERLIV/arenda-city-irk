import { cn } from "@/lib/utils";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "article" | "main";
  size?: "default" | "narrow" | "wide";
}

const widths = {
  default: "max-w-[var(--content-width)]",
  narrow: "max-w-3xl",
  wide: "max-w-[var(--content-width)]",
};

export function PageContainer({
  children,
  className,
  as: Tag = "div",
  size = "default",
}: PageContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-[var(--page-pad-x)]",
        widths[size],
        className,
      )}
    >
      {children}
    </Tag>
  );
}
