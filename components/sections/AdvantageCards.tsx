import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Headphones, Shield } from "lucide-react";

const advantages = [
  {
    icon: Building2,
    title: "Опыт на рынке",
    description: "Работаем с коммерческой недвижимостью и помогаем бизнесу находить подходящие локации.",
  },
  {
    icon: Shield,
    title: "Полный цикл услуг",
    description: "От консультации и подбора категории до сопровождения сделки и размещения рекламы.",
  },
  {
    icon: Headphones,
    title: "Персональный подход",
    description: "Учитываем задачи бизнеса, бюджет и сроки. AI-консультант доступен круглосуточно.",
  },
];

export function AdvantageCards() {
  return (
    <section className="bg-muted-bg py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <h2 className="mb-10 text-3xl font-bold">Почему выбирают нас</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {advantages.map((item) => (
            <Card key={item.title} className="border-none shadow-md">
              <CardHeader>
                <item.icon className="mb-2 h-8 w-8 text-primary" />
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
