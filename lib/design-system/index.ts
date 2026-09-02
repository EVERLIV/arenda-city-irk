import { bullets, typography } from "./tokens";
import { cn } from "@/lib/utils";

export { colors, layout, typography, radii, shadows, bullets } from "./tokens";
export type { BulletVariant } from "./tokens";

export function ds(...classes: Array<string | false | null | undefined>) {
  return cn(...classes);
}

export const textStyles = {
  label: typography.label,
  display: typography.display,
  h1: typography.h1,
  h2: typography.h2,
  h3: typography.h3,
  lead: typography.lead,
  body: typography.body,
  small: typography.small,
} as const;

export function bulletClass(variant: keyof typeof bullets = "red") {
  return bullets[variant];
}
