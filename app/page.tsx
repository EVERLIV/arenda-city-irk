import { HomeIntro } from "@/components/sections/HomeIntro";
import { CategoryShowcase } from "@/components/sections/CategoryShowcase";
import { TrustStrip } from "@/components/sections/StatsHero";
import { StatsHero } from "@/components/sections/StatsHero";

export default function HomePage() {
  return (
    <>
      <HomeIntro />
      <TrustStrip />
      <CategoryShowcase />
      <StatsHero />
    </>
  );
}
