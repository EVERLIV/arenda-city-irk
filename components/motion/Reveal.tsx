"use client";

import { useState } from "react";
import { useIntersection } from "@mantine/hooks";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const { ref, entry } = useIntersection({
    threshold: 0.12,
    rootMargin: "0px 0px -32px 0px",
  });
  const [visible, setVisible] = useState(false);

  if (entry?.isIntersecting && !visible) {
    setVisible(true);
  }

  return (
    <div
      ref={ref}
      className={cn("reveal", visible && "reveal--visible", className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
