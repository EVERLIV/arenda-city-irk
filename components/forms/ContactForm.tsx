"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ConsentNote } from "@/components/forms/ConsentNote";

const schema = z.object({
  name: z.string().min(2, "Введите имя"),
  phone: z.string().min(10, "Введите корректный телефон"),
  email: z.string().email("Введите корректный email").optional().or(z.literal("")),
  message: z.string().min(5, "Введите сообщение"),
});

type FormData = z.infer<typeof schema>;

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: FormData) {
    setStatus("loading");
    try {
      const res = await fetch("/api/callback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, type: "contact" }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error ?? "Ошибка отправки");
      setStatus("success");
      setMessage("Сообщение отправлено! Мы свяжемся с вами.");
      reset();
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Ошибка отправки");
    }
  }

  if (status === "success") {
    return <p className="text-green-600">{message}</p>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="contact-name">Имя</Label>
        <Input id="contact-name" {...register("name")} />
        {errors.name && (
          <p className="mt-1 text-xs text-primary">{errors.name.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="contact-phone">Телефон</Label>
        <Input id="contact-phone" {...register("phone")} />
        {errors.phone && (
          <p className="mt-1 text-xs text-primary">{errors.phone.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="contact-email">Email</Label>
        <Input id="contact-email" type="email" {...register("email")} />
        {errors.email && (
          <p className="mt-1 text-xs text-primary">{errors.email.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="contact-message">Сообщение</Label>
        <Textarea id="contact-message" rows={4} {...register("message")} />
        {errors.message && (
          <p className="mt-1 text-xs text-primary">{errors.message.message}</p>
        )}
      </div>
      {status === "error" && <p className="text-sm text-primary">{message}</p>}
      <ConsentNote />
      <Button type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Отправка..." : "Отправить"}
      </Button>
    </form>
  );
}
