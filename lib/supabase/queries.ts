import { getManagerNameFilter, resolveAgencyId } from "./agency";
import { getObjectsTableName, getSupabase, isSupabaseConfigured } from "./client";
import { getObjectId, type ObjectRow } from "./objects";

async function getAgencyScope() {
  const supabase = getSupabase();
  if (!supabase) {
    return {
      supabase: null,
      agencyId: null,
      error: "Клиент Supabase не инициализирован",
    };
  }

  const { id, error } = await resolveAgencyId(supabase);
  if (!id) {
    return { supabase, agencyId: null, error };
  }

  return { supabase, agencyId: id, error: null };
}

function propertiesQuery(
  supabase: NonNullable<ReturnType<typeof getSupabase>>,
  agencyId: string,
) {
  const table = getObjectsTableName();
  let query = supabase
    .from(table)
    .select("*")
    .eq("is_active", true)
    .filter("extras->>agency_id", "eq", agencyId);

  const managerName = getManagerNameFilter();
  if (managerName) {
    query = query.filter("extras->>agent_name", "eq", managerName);
  }

  return query;
}

export async function fetchObjects(): Promise<{
  data: ObjectRow[];
  error: string | null;
  configured: boolean;
}> {
  if (!isSupabaseConfigured()) {
    return {
      data: [],
      error: null,
      configured: false,
    };
  }

  const scope = await getAgencyScope();
  if (!scope.supabase) {
    return { data: [], error: scope.error, configured: true };
  }
  if (!scope.agencyId) {
    return { data: [], error: scope.error, configured: true };
  }

  const { data, error } = await propertiesQuery(scope.supabase, scope.agencyId);

  if (error) {
    return {
      data: [],
      error: error.message,
      configured: true,
    };
  }

  return {
    data: (data ?? []) as ObjectRow[],
    error: null,
    configured: true,
  };
}

export async function fetchObjectById(id: string): Promise<{
  data: ObjectRow | null;
  error: string | null;
  configured: boolean;
}> {
  if (!isSupabaseConfigured()) {
    return { data: null, error: null, configured: false };
  }

  const scope = await getAgencyScope();
  if (!scope.supabase) {
    return { data: null, error: scope.error, configured: true };
  }
  if (!scope.agencyId) {
    return { data: null, error: scope.error, configured: true };
  }

  const table = getObjectsTableName();
  const managerName = getManagerNameFilter();

  let byIdQuery = scope.supabase
    .from(table)
    .select("*")
    .eq("id", id)
    .eq("is_active", true)
    .filter("extras->>agency_id", "eq", scope.agencyId);

  if (managerName) {
    byIdQuery = byIdQuery.filter("extras->>agent_name", "eq", managerName);
  }

  const byId = await byIdQuery.maybeSingle();
  if (!byId.error && byId.data) {
    return { data: byId.data as ObjectRow, error: null, configured: true };
  }

  const all = await fetchObjects();
  if (all.error) return { data: null, error: all.error, configured: true };
  const found = all.data.find((row) => getObjectId(row) === id) ?? null;

  return {
    data: found,
    error: found ? null : "Объект не найден",
    configured: true,
  };
}
