import { cn } from "@/lib/utils";

interface StaggerItemProps {
  children: React.ReactNode;
  index: number;
  className?: string;
}

export function StaggerItem({ children, index, className }: StaggerItemProps) {
  return (
    <div
      className={cn("stagger-item", className)}
      style={{ animationDelay: `${Math.min(index * 70, 560)}ms` }}
    >
      {children}
    </div>
  );
}
