"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_core_1 = require("drizzle-orm/pg-core");
const user_1 = __importDefault(require("./user"));
const agreements_1 = __importDefault(require("./agreements"));
const pg_core_2 = require("drizzle-orm/pg-core");
const messages = (0, pg_core_1.pgTable)("messages", {
    id: (0, pg_core_2.serial)("id").primaryKey(),
    message: (0, pg_core_1.text)("message").notNull(),
    fromId: (0, pg_core_1.integer)("from_id").notNull().references(() => user_1.default.id),
    toId: (0, pg_core_1.integer)("to_id").notNull().references(() => agreements_1.default.id),
    createdAt: (0, pg_core_1.timestamp)("created_at").notNull().defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at").notNull().defaultNow(),
});
exports.default = messages;
