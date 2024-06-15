import {
  decimal,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import pfi from "./pfi";
import { boolean } from "drizzle-orm/pg-core";

const agreements = pgTable("agreements", {
  id: serial("id").primaryKey(),
  pfiId: integer("pfi_id")
  .notNull()
  .references(() => pfi.id,{
    onDelete: "cascade",
  }),
  isActive: boolean("is_active").default(true),
  status: varchar("status", { length: 20 }),
  agreementAmount: decimal("agreement_amount").notNull(),
  agreementPeriod: varchar("agreement_period").notNull(),
  isPaid: boolean("is_paid").default(false),
  isApproved: boolean("is_approved").default(false),
  commencementDate: timestamp("commencement_date"),
  expiryDate: timestamp("expiry_date"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});


export default agreements;