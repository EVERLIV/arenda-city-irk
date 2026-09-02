import { config as loadEnv } from "dotenv";
import { Client } from "pg";

loadEnv({ path: ".env.local", override: true });
loadEnv();

async function main() {
  const databaseUrl = process.env.DATABASE_URL?.trim();
  if (!databaseUrl) {
    console.error(
      "DATABASE_URL not found.\n" +
        "1) Fill SSH_* and DATABASE_URL in .env.local\n" +
        "2) Run: npm run db:tunnel\n" +
        "3) Run: npm run db:introspect",
    );
    process.exit(1);
  }

  const client = new Client({
    connectionString: databaseUrl,
    ssl:
      process.env.DATABASE_SSL === "true"
        ? { rejectUnauthorized: false }
        : undefined,
  });

  await client.connect();

  try {
    const tables = await client.query(`
      select table_schema, table_name
      from information_schema.tables
      where table_schema not in ('pg_catalog', 'information_schema')
        and table_type = 'BASE TABLE'
      order by table_schema, table_name
    `);

    console.log("=== Tables ===");
    for (const row of tables.rows) {
      console.log(`- ${row.table_schema}.${row.table_name}`);
    }

    const preferred =
      process.env.SUPABASE_OBJECTS_TABLE?.trim() ||
      tables.rows.find((t) =>
        ["objects", "properties", "listings", "obekty"].includes(
          String(t.table_name).toLowerCase(),
        ),
      )?.table_name;

    if (!preferred) {
      console.log(
        "\nNo obvious objects table. Set SUPABASE_OBJECTS_TABLE manually.",
      );
      return;
    }

    const schema =
      tables.rows.find((t) => t.table_name === preferred)?.table_schema ||
      "public";

    const columns = await client.query(
      `
      select column_name, data_type, is_nullable
      from information_schema.columns
      where table_schema = $1 and table_name = $2
      order by ordinal_position
    `,
      [schema, preferred],
    );

    console.log(`\n=== Columns of ${schema}.${preferred} ===`);
    for (const col of columns.rows) {
      console.log(
        `- ${col.column_name} (${col.data_type}${
          col.is_nullable === "YES" ? ", nullable" : ""
        })`,
      );
    }

    const sample = await client.query(
      `select * from "${schema}"."${preferred}" limit 3`,
    );
    console.log(`\n=== Sample rows (${sample.rowCount}) ===`);
    console.log(JSON.stringify(sample.rows, null, 2));
  } finally {
    await client.end();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
