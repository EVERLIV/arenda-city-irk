"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { MessageCircle, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  const isLoading = status === "streaming" || status === "submitted";

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage({ text: input });
    setInput("");
  }

  return (
    <>
      {!open && (
        <Button
          onClick={() => setOpen(true)}
          className={cn(
            "fixed z-50 h-11 w-11 rounded-full shadow-lg",
            "right-3 top-1/2 -translate-y-1/2",
            "md:bottom-6 md:right-6 md:top-auto md:translate-y-0",
          )}
          size="icon"
          aria-label="Открыть чат"
        >
          <MessageCircle className="h-5 w-5" />
        </Button>
      )}

      {open && (
        <div
          className={cn(
            "fixed z-50 flex flex-col overflow-hidden border border-border bg-white shadow-2xl",
            "right-3 top-1/2 w-[min(360px,calc(100vw-1.5rem))] -translate-y-1/2",
            "h-[min(26rem,calc(100dvh-5rem))] rounded-2xl",
            "md:bottom-6 md:right-6 md:top-auto md:h-[500px] md:w-[360px] md:translate-y-0",
          )}
        >
          <div className="flex items-center justify-between bg-primary px-4 py-3 text-white">
            <div>
              <p className="font-semibold">AI-консультант</p>
              <p className="text-xs text-white/80">Аренда Сити</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="rounded p-1 hover:bg-white/10"
              aria-label="Закрыть чат"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.length === 0 && (
              <p className="text-sm text-muted">
                Здравствуйте! Я помогу выбрать категорию недвижимости или расскажу
                о размещении рекламы.
              </p>
            )}
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "max-w-[85%] rounded-lg px-3 py-2 text-sm",
                  message.role === "user"
                    ? "ml-auto bg-primary text-white"
                    : "bg-muted-bg text-foreground",
                )}
              >
                {message.parts.map((part, i) => {
                  if (part.type === "text") {
                    return <span key={`${message.id}-${i}`}>{part.text}</span>;
                  }
                  return null;
                })}
              </div>
            ))}
            {isLoading && (
              <p className="text-sm text-muted">Печатает...</p>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2 border-t border-border p-3">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ваш вопрос..."
              disabled={isLoading}
            />
            <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}
    </>
  );
}
