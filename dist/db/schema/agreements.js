"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_core_1 = require("drizzle-orm/pg-core");
const pfi_1 = __importDefault(require("./pfi"));
const pg_core_2 = require("drizzle-orm/pg-core");
const constants_1 = require("../../constants");
const agreements = (0, pg_core_1.pgTable)("agreements", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    pfiId: (0, pg_core_1.integer)("pfi_id")
        .notNull()
        .references(() => pfi_1.default.id, {
        onDelete: "cascade",
    }),
    isActive: (0, pg_core_2.boolean)("is_active").default(true),
    status: (0, pg_core_1.varchar)("status", { length: 20 }).default(constants_1.AGREEMENT_STATUS.SUBMITTED),
    agreementAmount: (0, pg_core_1.decimal)("agreement_amount").notNull(),
    agreementPeriod: (0, pg_core_1.varchar)("agreement_period").notNull(),
    isPaid: (0, pg_core_2.boolean)("is_paid").default(false),
    isApproved: (0, pg_core_2.boolean)("is_approved").default(false),
    commencementDate: (0, pg_core_1.timestamp)("commencement_date"),
    expiryDate: (0, pg_core_1.timestamp)("expiry_date"),
    createdAt: (0, pg_core_1.timestamp)("created_at").notNull().defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at").notNull().defaultNow(),
});
exports.default = agreements;
