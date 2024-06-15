"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.pool = void 0;
const node_postgres_1 = require("drizzle-orm/node-postgres");
const pg_1 = require("pg");
const databaseUrl = "postgresql://admin:4Hg0Km0zaF7W8140Qp1Ul0AD@regularly-integral-ocelot.a1.pgedge.io/cert_db?sslmode=require";
exports.pool = new pg_1.Pool({
    connectionString: databaseUrl,
});
exports.db = (0, node_postgres_1.drizzle)(exports.pool);
