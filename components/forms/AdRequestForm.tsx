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
  adType: z.string().min(1, "Укажите тип рекламы"),
  area: z.string().optional(),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface AdRequestFormProps {
  defaultAdType?: string;
}

export function AdRequestForm({ defaultAdType = "" }: AdRequestFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { adType: defaultAdType },
  });

  async function onSubmit(data: FormData) {
    setStatus("loading");
    try {
      const res = await fetch("/api/callback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, type: "advertising" }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error ?? "Ошибка отправки");
      setStatus("success");
      setMessage("Заявка на размещение рекламы принята!");
      reset({ adType: defaultAdType });
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
        <Label htmlFor="ad-name">Имя</Label>
        <Input id="ad-name" {...register("name")} />
        {errors.name && (
          <p className="mt-1 text-xs text-primary">{errors.name.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="ad-phone">Телефон</Label>
        <Input id="ad-phone" {...register("phone")} />
        {errors.phone && (
          <p className="mt-1 text-xs text-primary">{errors.phone.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="ad-type">Тип рекламы</Label>
        <Input id="ad-type" {...register("adType")} placeholder="Билборд, фасад, LED..." />
        {errors.adType && (
          <p className="mt-1 text-xs text-primary">{errors.adType.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="ad-area">Площадь / формат (опционально)</Label>
        <Input id="ad-area" {...register("area")} placeholder="3×6, 50 м²..." />
      </div>
      <div>
        <Label htmlFor="ad-message">Комментарий</Label>
        <Textarea id="ad-message" rows={3} {...register("message")} />
      </div>
      {status === "error" && <p className="text-sm text-primary">{message}</p>}
      <ConsentNote />
      <Button type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Отправка..." : "Оставить заявку"}
      </Button>
    </form>
  );
}
