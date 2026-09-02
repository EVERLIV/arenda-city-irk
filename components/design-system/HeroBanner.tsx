import Image from "next/image";
import { PageContainer } from "./PageContainer";
import { SectionLabel, SectionLead, SectionTitle } from "./Typography";

interface HeroBannerProps {
  image: string;
  imageAlt: string;
  eyebrow: string;
  title: string;
  description: string;
  tall?: boolean;
}

export function HeroBanner({
  image,
  imageAlt,
  eyebrow,
  title,
  description,
  tall = false,
}: HeroBannerProps) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0">
        <Image src={image} alt={imageAlt} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30" />
      </div>
      <PageContainer
        className={
          tall
            ? "relative flex min-h-[28rem] flex-col justify-end py-16 lg:min-h-[36rem] lg:py-24"
            : "relative py-16 text-white lg:py-20"
        }
      >
        <SectionLabel light className="mb-4">
          {eyebrow}
        </SectionLabel>
        <SectionTitle as="h1" size="display" className="max-w-4xl text-white">
          {title}
        </SectionTitle>
        <SectionLead light className="mt-5 max-w-2xl">
          {description}
        </SectionLead>
      </PageContainer>
    </section>
  );
}
