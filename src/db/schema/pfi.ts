import {
  serial,
  varchar,
  decimal,
  timestamp,
  pgTable,
  text,
} from "drizzle-orm/pg-core";

export const pfi = pgTable("pfi", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  address: text("address").notNull(),
  agreementAmount: decimal("agreement_amount").notNull(),
  agreementPeriod: varchar("agreement_period").notNull(),
  commencementDate: timestamp("commencement_date").notNull().defaultNow(),
  expiryDate: timestamp("expiry_date").notNull().defaultNow(),
  agreementDocument: text("agreement_document").notNull(),
  dueDiligenceDocument: text("due_diligence_document").notNull(),
});
