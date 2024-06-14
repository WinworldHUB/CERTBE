import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
const databaseUrl =
  "postgresql://admin:2PrPI0JmOY02ybS3moE22312@widely-trusted-owl.a1.pgedge.io/cert_db?sslmode=require";

export const pool = new Pool({
  connectionString: databaseUrl,
});

export const db = drizzle(pool);
