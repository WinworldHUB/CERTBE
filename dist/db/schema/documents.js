"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_core_1 = require("drizzle-orm/pg-core");
const agreements_1 = __importDefault(require("./agreements"));
const pg_core_2 = require("drizzle-orm/pg-core");
const documents = (0, pg_core_1.pgTable)("documents", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    agreementId: (0, pg_core_1.integer)("agreement_id").notNull().references(() => agreements_1.default.id),
    name: (0, pg_core_1.varchar)("name", { length: 100 }).notNull(),
    url: (0, pg_core_2.text)("url").notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at").notNull().defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at").notNull().defaultNow(),
});
exports.default = documents;
