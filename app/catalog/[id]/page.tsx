import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ObjectDetailView } from "@/components/catalog/ObjectDetailView";
import { PageContainer } from "@/components/design-system";
import { getSimilarObjects } from "@/lib/catalog/catalog-utils";
import { getObjectTitle } from "@/lib/supabase/objects";
import { fetchObjectById, fetchObjects } from "@/lib/supabase/queries";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: PageProps<"/catalog/[id]">): Promise<Metadata> {
  const { id } = await params;
  const { data } = await fetchObjectById(id);
  if (!data) return { title: "Объект" };
  return {
    title: getObjectTitle(data),
    description: "Карточка объекта из каталога АрендаСити",
  };
}

export default async function CatalogObjectPage({
  params,
}: PageProps<"/catalog/[id]">) {
  const { id } = await params;
  const [{ data, configured }, catalog] = await Promise.all([
    fetchObjectById(id),
    fetchObjects(),
  ]);

  if (!configured || !data) notFound();

  const similarObjects = getSimilarObjects(data, catalog.data, 4);

  return (
    <PageContainer className="py-8 sm:py-10 lg:py-12" size="wide">
      <ObjectDetailView object={data} similarObjects={similarObjects} />
    </PageContainer>
  );
}
