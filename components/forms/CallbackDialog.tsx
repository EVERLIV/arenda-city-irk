"use client";

import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ConsentNote } from "@/components/forms/ConsentNote";

const schema = z.object({
  name: z.string().min(2, "Введите имя"),
  phone: z.string().min(10, "Введите корректный телефон"),
});

type FormData = z.infer<typeof schema>;

interface CallbackDialogProps {
  triggerLabel?: string;
  triggerVariant?: "default" | "outline" | "ghost" | "link";
  triggerSize?: "default" | "sm" | "lg" | "icon";
  triggerClassName?: string;
}

export function CallbackDialog({
  triggerLabel = "Перезвоните мне",
  triggerVariant = "default",
  triggerSize = "default",
  triggerClassName,
}: CallbackDialogProps) {
  const [open, dialog] = useDisclosure(false);
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
        body: JSON.stringify({ ...data, type: "callback" }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error ?? "Ошибка отправки");
      setStatus("success");
      setMessage(result.message ?? "Заявка принята! Мы перезвоним вам.");
      reset();
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Ошибка отправки");
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (next) dialog.open();
        else dialog.close();
      }}
    >
      <DialogTrigger asChild>
        <Button variant={triggerVariant} size={triggerSize} className={triggerClassName}>
          {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Обратный звонок</DialogTitle>
          <DialogDescription>
            Оставьте контакты, и мы перезвоним вам в рабочее время.
          </DialogDescription>
        </DialogHeader>

        {status === "success" ? (
          <p className="text-sm text-green-600">{message}</p>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="callback-name">Имя</Label>
              <Input id="callback-name" {...register("name")} />
              {errors.name && (
                <p className="mt-1 text-xs text-primary">{errors.name.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="callback-phone">Телефон</Label>
              <Input id="callback-phone" {...register("phone")} placeholder="+7..." />
              {errors.phone && (
                <p className="mt-1 text-xs text-primary">{errors.phone.message}</p>
              )}
            </div>
            {status === "error" && (
              <p className="text-sm text-primary">{message}</p>
            )}
            <ConsentNote />
            <Button type="submit" disabled={status === "loading"} className="w-full">
              {status === "loading" ? "Отправка..." : "Отправить"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
