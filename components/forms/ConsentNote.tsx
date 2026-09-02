import Link from "next/link";

export function ConsentNote({ className }: { className?: string }) {
  return (
    <p className={className ?? "text-xs leading-relaxed text-muted"}>
      Нажимая кнопку, вы соглашаетесь с{" "}
      <Link href="/consent" className="text-primary underline-offset-2 hover:underline">
        обработкой персональных данных
      </Link>{" "}
      и{" "}
      <Link href="/privacy" className="text-primary underline-offset-2 hover:underline">
        политикой конфиденциальности
      </Link>
      .
    </p>
  );
}
