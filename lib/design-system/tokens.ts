/**
 * Design System — Аренда Сити
 * Токены основаны на текущем визуальном языке (miel.ru + красный акцент).
 */

export const colors = {
  background: "#ffffff",
  foreground: "#1c1c1e",
  ink: "#2b2b30",
  muted: "#5c5c66",
  mutedBg: "#f4f3f0",
  surface: "#faf9f7",
  border: "#e8e6e1",
  primary: "#c8102e",
  primaryHover: "#a00d25",
  primarySoft: "#fde8ec",
  primaryForeground: "#ffffff",
  accentWarm: "#d4622a",
  accentGold: "#c9a227",
  accentTeal: "#1a7a6d",
  footer: "#17171a",
} as const;

export const layout = {
  contentWidth: "90rem", // 1440px — шире для контентных страниц
  contentPadding: "1.5rem",
  sectionY: "5rem",
  sectionYLarge: "7rem",
  heroMinHeight: "28rem",
  heroMinHeightLg: "36rem",
} as const;

export const typography = {
  fontSans: "var(--font-manrope), system-ui, sans-serif",
  fontSerif: 'Georgia, "Times New Roman", serif',
  display: "text-[clamp(2.5rem,5vw,3.75rem)] font-extrabold leading-[1.02] tracking-[-0.03em]",
  h1: "text-[clamp(2rem,4vw,3rem)] font-extrabold leading-[1.05] tracking-[-0.02em]",
  h2: "text-[clamp(1.75rem,3vw,2.25rem)] font-extrabold leading-[1.1] tracking-[-0.02em]",
  h3: "text-xl font-extrabold tracking-tight",
  lead: "text-lg leading-relaxed",
  body: "text-base leading-relaxed",
  small: "text-sm leading-relaxed",
  label: "text-[0.72rem] font-bold uppercase tracking-[0.14em]",
} as const;

export const radii = {
  none: "0",
  sm: "0.125rem",
  md: "0.25rem",
  lg: "0.35rem",
  full: "9999px",
} as const;

export const shadows = {
  card: "0 18px 40px -24px color-mix(in srgb, var(--primary) 45%, transparent)",
  logo: "0 10px 24px -12px rgba(200, 16, 46, 0.8)",
} as const;

export const bullets = {
  red: "bullet-red",
  warm: "bullet-warm",
  gold: "bullet-gold",
  teal: "bullet-teal",
} as const;

export type BulletVariant = keyof typeof bullets;
