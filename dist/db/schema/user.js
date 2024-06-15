"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_core_1 = require("drizzle-orm/pg-core");
const pg_core_2 = require("drizzle-orm/pg-core");
const pfi_1 = __importDefault(require("./pfi"));
const users = (0, pg_core_2.pgTable)("users", {
    id: (0, pg_core_2.serial)("id").primaryKey(),
    fullName: (0, pg_core_2.varchar)("fullName", { length: 100 }).notNull(),
    email: (0, pg_core_2.varchar)("email", { length: 100 }).notNull(),
    parentId: (0, pg_core_1.integer)("parent_id").references(() => pfi_1.default.id, {
        onDelete: "cascade",
    }),
    role: (0, pg_core_2.varchar)("role", { length: 100 }), // admin, pfi user, approver
    isPrimary: (0, pg_core_1.boolean)("is_primary").default(false),
    isActive: (0, pg_core_1.boolean)("is_active").default(false),
    createdAt: (0, pg_core_2.timestamp)("created_at").notNull().defaultNow(),
    updatedAt: (0, pg_core_2.timestamp)("updated_at").notNull().defaultNow(),
    phoneNo: (0, pg_core_2.varchar)("phone_no", { length: 15 }).notNull(),
});
exports.default = users;
