import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
const databaseUrl =
  "postgresql://admin:4Hg0Km0zaF7W8140Qp1Ul0AD@regularly-integral-ocelot.a1.pgedge.io/cert_db?sslmode=require";

export const pool = new Pool({
  connectionString: databaseUrl,
});

export const db = drizzle(pool);
