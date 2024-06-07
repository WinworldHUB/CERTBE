import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
const databaseUrl =
  "postgresql://admin:S9d95awcw1QE16236Xy4Fvjw@painfully-thorough-mole.a1.pgedge.io/cert_db?sslmode=require";

export const pool = new Pool({
  connectionString: databaseUrl,
});

export const db = drizzle(pool);
