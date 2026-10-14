import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  tone?: "light" | "dark";
  showWordmark?: boolean;
  href?: string;
};

export function BrandLogo({
  className,
  tone = "light",
  showWordmark = true,
  href = "/",
}: BrandLogoProps) {
  const markSrc =
    tone === "dark" ? "/brand/logo-mark-light.svg" : "/brand/logo-mark.svg";
  const wordmarkSrc =
    tone === "dark"
      ? "/brand/logo-wordmark-light.svg"
      : "/brand/logo-wordmark.svg";

  const content = (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <span className="relative block h-11 w-[55px] shrink-0">
        <Image
          src={markSrc}
          alt=""
          fill
          className="object-contain object-left"
          unoptimized
          priority
        />
      </span>
      {showWordmark ? (
        <span className="flex min-w-0 flex-col">
          <span className="relative block h-[22px] w-[168px]">
            <Image
              src={wordmarkSrc}
              alt="Аренда Сити"
              fill
              className="object-contain object-left"
              unoptimized
              priority
            />
          </span>
          <span
            className={cn(
              "mt-0.5 text-[10px] font-medium uppercase tracking-[0.18em]",
              tone === "dark" ? "text-white/55" : "text-muted",
            )}
          >
            Недвижимость области
          </span>
        </span>
      ) : null}
    </span>
  );

  if (!href) return content;

  return (
    <Link href={href} className="group inline-flex" aria-label="Аренда Сити">
      {content}
    </Link>
  );
}
