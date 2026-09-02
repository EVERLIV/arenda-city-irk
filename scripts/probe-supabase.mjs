import { config as loadEnv } from "dotenv";

loadEnv({ path: ".env.local", override: true });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !key) {
  console.error("Missing Supabase env");
  process.exit(1);
}

const headers = {
  apikey: key,
  Authorization: `Bearer ${key}`,
};

async function get(path) {
  const res = await fetch(`${url}/rest/v1/${path}`, { headers });
  const text = await res.text();
  return { status: res.status, body: text };
}

async function main() {
  const agencies = await get("agencies?select=*&limit=20");
  console.log("=== agencies ===");
  console.log(agencies.status, agencies.body.slice(0, 3000));

  const propsCols = await get("properties?select=*&limit=1");
  console.log("\n=== properties sample ===");
  console.log(propsCols.status, propsCols.body.slice(0, 4000));

  const agencyProps = await get(
    "properties?select=id,address&is_active=eq.true&extras->>agency_id=eq.a0000000-0000-4000-8000-000000000001&limit=5",
  );
  console.log("\n=== arenda city properties ===");
  console.log(agencyProps.status, agencyProps.body.slice(0, 1500));
}

main().catch(console.error);
