import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  getAdvertisingTypeBySlug,
  getAdvertisingTypes,
} from "@/lib/content";
import { AdRequestForm } from "@/components/forms/AdRequestForm";

export function generateStaticParams() {
  return getAdvertisingTypes().map((type) => ({ type: type.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/advertising/[type]">): Promise<Metadata> {
  const { type: slug } = await params;
  const adType = getAdvertisingTypeBySlug(slug);
  if (!adType) return {};
  return {
    title: adType.title,
    description: adType.shortDescription,
  };
}

export default async function AdvertisingTypePage({
  params,
}: PageProps<"/advertising/[type]">) {
  const { type: slug } = await params;
  const adType = getAdvertisingTypeBySlug(slug);
  if (!adType) notFound();

  return (
    <div>
      <div className="relative h-[320px]">
        <Image
          src={adType.image}
          alt={adType.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-7xl px-4 pb-10 lg:px-8">
            <h1 className="text-4xl font-bold text-white">{adType.title}</h1>
            <p className="mt-2 max-w-2xl text-lg text-white/90">
              {adType.shortDescription}
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="mb-4 text-2xl font-bold">О формате</h2>
            <p className="mb-8 text-muted">{adType.description}</p>
            <h3 className="mb-4 text-xl font-semibold">Преимущества</h3>
            <ul className="list-inside list-disc space-y-2 text-muted">
              {adType.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-border bg-muted-bg p-6">
            <h3 className="mb-4 text-lg font-semibold">Заявка на размещение</h3>
            <AdRequestForm defaultAdType={adType.title} />
          </div>
        </div>
      </div>
    </div>
  );
}
