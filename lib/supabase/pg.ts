/**
 * Direct Postgres access via SSH tunnel (read-only introspection / fallback).
 * Prefer Supabase REST for the app UI; use this for schema discovery.
 */

import { Client } from "pg";

export function getDatabaseUrl(): string | null {
  return process.env.DATABASE_URL?.trim() || null;
}

export function isDatabaseUrlConfigured(): boolean {
  return Boolean(getDatabaseUrl());
}

export async function withPgClient<T>(
  fn: (client: Client) => Promise<T>,
): Promise<T> {
  const url = getDatabaseUrl();
  if (!url) {
    throw new Error(
      "DATABASE_URL is not set. Start SSH tunnel and set DATABASE_URL in .env.local",
    );
  }

  const client = new Client({
    connectionString: url,
    ssl: process.env.DATABASE_SSL === "true" ? { rejectUnauthorized: false } : undefined,
  });

  await client.connect();
  try {
    return await fn(client);
  } finally {
    await client.end();
  }
}
