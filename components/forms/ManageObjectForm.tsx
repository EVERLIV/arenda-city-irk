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
  phone: z.string().min(10, "Введите телефон"),
  objectType: z.string().min(2, "Укажите тип объекта"),
  address: z.string().min(4, "Укажите адрес"),
  area: z.string().optional(),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export function ManageObjectForm({ idPrefix = "manage" }: { idPrefix?: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    setStatus("loading");
    try {
      const res = await fetch("/api/callback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, type: "manage" }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error ?? "Ошибка отправки");
      setStatus("success");
      setMessage(result.message ?? "Заявка принята. Свяжемся в рабочее время.");
      reset();
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Ошибка отправки");
    }
  }

  if (status === "success") {
    return <p className="text-sm text-accent-teal">{message}</p>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div>
        <Label htmlFor={`${idPrefix}-name`}>Имя</Label>
        <Input id={`${idPrefix}-name`} className="mt-1 rounded-none" {...register("name")} />
        {errors.name && <p className="mt-1 text-[11px] text-primary">{errors.name.message}</p>}
      </div>
      <div>
        <Label htmlFor={`${idPrefix}-phone`}>Телефон</Label>
        <Input
          id={`${idPrefix}-phone`}
          className="mt-1 rounded-none"
          placeholder="+7..."
          {...register("phone")}
        />
        {errors.phone && <p className="mt-1 text-[11px] text-primary">{errors.phone.message}</p>}
      </div>
      <div>
        <Label htmlFor={`${idPrefix}-type`}>Тип объекта</Label>
        <Input
          id={`${idPrefix}-type`}
          className="mt-1 rounded-none"
          placeholder="Офис, павильон, склад, земля..."
          {...register("objectType")}
        />
        {errors.objectType && (
          <p className="mt-1 text-[11px] text-primary">{errors.objectType.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor={`${idPrefix}-address`}>Адрес</Label>
        <Input id={`${idPrefix}-address`} className="mt-1 rounded-none" {...register("address")} />
        {errors.address && (
          <p className="mt-1 text-[11px] text-primary">{errors.address.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor={`${idPrefix}-area`}>Площадь, м²</Label>
        <Input id={`${idPrefix}-area`} className="mt-1 rounded-none" {...register("area")} />
      </div>
      <div>
        <Label htmlFor={`${idPrefix}-message`}>Комментарий</Label>
        <Textarea
          id={`${idPrefix}-message`}
          className="mt-1 min-h-[80px] rounded-none"
          {...register("message")}
        />
      </div>
      {status === "error" && <p className="text-[12px] text-primary">{message}</p>}
      <ConsentNote />
      <Button
        type="submit"
        disabled={status === "loading"}
        className="h-11 w-full rounded-none text-xs font-bold uppercase tracking-[0.08em]"
      >
        {status === "loading" ? "Отправка..." : "Передать объект"}
      </Button>
    </form>
  );
}
