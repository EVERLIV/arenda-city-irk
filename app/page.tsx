import { HomeIntro } from "@/components/sections/HomeIntro";
import { FeaturedObjects } from "@/components/sections/FeaturedObjects";
import { CategoryShowcase } from "@/components/sections/CategoryShowcase";
import { TrustStrip } from "@/components/sections/StatsHero";
import { StatsHero } from "@/components/sections/StatsHero";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <>
      <HomeIntro />
      <TrustStrip />
      <FeaturedObjects />
      <CategoryShowcase />
      <StatsHero />
    </>
  );
}
