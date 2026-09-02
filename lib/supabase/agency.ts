import type { SupabaseClient } from "@supabase/supabase-js";

let cachedAgencyId: string | null | undefined;

function normalizeAgencyName(value: string): string {
  return value.toLowerCase().replace(/[\s_\-«»"']/g, "");
}

export function getAgencyNameFilter(): string {
  return process.env.SUPABASE_AGENCY_NAME?.trim() || "АрендаСити";
}

export function getManagerNameFilter(): string | null {
  const name = process.env.SUPABASE_MANAGER_NAME?.trim();
  return name || null;
}

export function getAgencyIdFilter(): string | null {
  const id = process.env.SUPABASE_AGENCY_ID?.trim();
  return id || null;
}

function matchesAgencyName(candidate: string, target: string): boolean {
  const normalizedCandidate = normalizeAgencyName(candidate);
  const normalizedTarget = normalizeAgencyName(target);

  if (!normalizedCandidate || !normalizedTarget) return false;
  if (normalizedCandidate === normalizedTarget) return true;

  return (
    normalizedCandidate.includes(normalizedTarget) ||
    normalizedTarget.includes(normalizedCandidate) ||
    (normalizedCandidate.includes("аренда") && normalizedCandidate.includes("сити"))
  );
}

export async function resolveAgencyId(
  supabase: SupabaseClient,
): Promise<{ id: string | null; error: string | null }> {
  const directId = getAgencyIdFilter();
  if (directId) return { id: directId, error: null };

  if (cachedAgencyId !== undefined) {
    return {
      id: cachedAgencyId,
      error: cachedAgencyId
        ? null
        : `Агентство «${getAgencyNameFilter()}» не найдено в таблице agencies`,
    };
  }

  const targetName = getAgencyNameFilter();
  const { data, error } = await supabase.from("agencies").select("id,name");

  if (error) {
    return { id: null, error: error.message };
  }

  const match = (data ?? []).find((agency) =>
    matchesAgencyName(String(agency.name ?? ""), targetName),
  );

  if (match?.id != null) {
    cachedAgencyId = String(match.id);
    return { id: cachedAgencyId, error: null };
  }

  cachedAgencyId = null;
  return {
    id: null,
    error: `Агентство «${targetName}» не найдено. Задайте SUPABASE_AGENCY_ID в .env.local`,
  };
}
