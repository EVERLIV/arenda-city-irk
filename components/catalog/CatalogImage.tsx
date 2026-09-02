"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface CatalogImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function CatalogImage({ src, alt, className }: CatalogImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <div className="skeleton absolute inset-0" aria-hidden />}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={cn(
          "h-full w-full object-cover transition-all duration-700 ease-premium",
          loaded ? "scale-100 opacity-100" : "scale-[1.02] opacity-0",
          className,
        )}
      />
    </>
  );
}
