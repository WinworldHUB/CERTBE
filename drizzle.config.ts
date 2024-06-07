import { defineConfig } from "drizzle-kit";
const databaseUrl =
  "postgresql://admin:S9d95awcw1QE16236Xy4Fvjw@painfully-thorough-mole.a1.pgedge.io/cert_db?sslmode=require";
export default defineConfig({
  schema: "./src/db/schema/**/*.{js,ts}",
  out: "./src/db/migrations",
  dialect: "postgresql", // 'postgresql' | 'mysql' | 'sqlite'
  dbCredentials: {
    url: databaseUrl,
  },
  migrations: {
    table: "migrations",
    schema: "public",
  },
});
