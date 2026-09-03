import { HomeIntro } from "@/components/sections/HomeIntro";
import { ObjectsByCategory } from "@/components/sections/ObjectsByCategory";
import { AgencyHighlights } from "@/components/sections/AgencyHighlights";
import { ManageObjectSection } from "@/components/sections/ManageObjectSection";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { CategoryShowcase } from "@/components/sections/CategoryShowcase";
import { StatsHero } from "@/components/sections/StatsHero";
import { fetchObjects } from "@/lib/supabase/queries";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { data } = await fetchObjects();

  return (
    <>
      <HomeIntro objects={data} />
      <ObjectsByCategory objects={data} />
      <AgencyHighlights />
      <ManageObjectSection />
      <ReviewsSection />
      <CategoryShowcase />
      <StatsHero />
    </>
  );
}
