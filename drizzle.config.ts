import { defineConfig } from "drizzle-kit";
const databaseUrl =
  "postgresql://admin:2PrPI0JmOY02ybS3moE22312@widely-trusted-owl.a1.pgedge.io/cert_db?sslmode=require";
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
