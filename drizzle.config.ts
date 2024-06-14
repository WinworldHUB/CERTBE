import { defineConfig } from "drizzle-kit";
const databaseUrl =
  "postgresql://admin:4Hg0Km0zaF7W8140Qp1Ul0AD@regularly-integral-ocelot.a1.pgedge.io/cert_db?sslmode=require";
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
