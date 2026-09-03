"use client";

import { useEffect, useState } from "react";
import { Check, Link2, Printer, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ObjectShareBarProps {
  title: string;
  text?: string;
  className?: string;
}

export function ObjectShareBar({ title, text, className }: ObjectShareBarProps) {
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  async function handleShare() {
    const payload = {
      title,
      text: text ?? title,
      url: url || window.location.href,
    };

    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share(payload);
        return;
      } catch {
        // user cancelled or share failed — fall through to copy
      }
    }

    try {
      await navigator.clipboard.writeText(payload.url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  }

  function handlePrint() {
    window.print();
  }

  const actionClass =
    "inline-flex h-9 items-center gap-1.5 rounded-[0.35rem] border border-border bg-white px-3 text-[11px] font-bold uppercase tracking-[0.08em] text-ink shadow-[var(--shadow-soft)] transition-[transform,box-shadow,background-color] duration-150 hover:border-primary/35 hover:text-primary active:scale-[0.98]";

  return (
    <div className={cn("flex flex-wrap items-center gap-2 print:hidden", className)}>
      <button type="button" onClick={handleShare} className={actionClass}>
        {copied ? <Check className="h-3.5 w-3.5 text-accent-teal" /> : <Share2 className="h-3.5 w-3.5" />}
        {copied ? "Ссылка скопирована" : "Поделиться"}
      </button>
      <button type="button" onClick={handlePrint} className={actionClass}>
        <Printer className="h-3.5 w-3.5" />
        Печать
      </button>
      {url ? (
        <a
          href={`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`}
          target="_blank"
          rel="noopener noreferrer"
          className={actionClass}
        >
          <Link2 className="h-3.5 w-3.5" />
          Telegram
        </a>
      ) : null}
    </div>
  );
}
