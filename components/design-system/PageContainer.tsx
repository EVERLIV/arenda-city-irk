import { cn } from "@/lib/utils";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "article" | "main";
  size?: "default" | "narrow" | "wide";
}

const widths = {
  default: "max-w-[90rem]",
  narrow: "max-w-3xl",
  wide: "max-w-[100rem]",
};

export function PageContainer({
  children,
  className,
  as: Tag = "div",
  size = "default",
}: PageContainerProps) {
  return (
    <Tag className={cn("mx-auto w-full px-6", widths[size], className)}>
      {children}
    </Tag>
  );
}
