import Image from "next/image";
import Link from "next/link";
import { getCategories } from "@/lib/content";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function CategoryCards() {
  const categories = getCategories();

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
      <div className="mb-10 flex items-end justify-between gap-4">
        <h2 className="text-3xl font-bold">Категории недвижимости</h2>
        <Button asChild variant="outline">
          <Link href="/categories">Все категории</Link>
        </Button>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Link key={category.slug} href={`/categories/${category.slug}`}>
            <Card className="h-full overflow-hidden transition-shadow hover:shadow-lg">
              <div className="relative aspect-[16/10]">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle>{category.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted">{category.shortDescription}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
