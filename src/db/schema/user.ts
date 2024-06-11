import { integer } from "drizzle-orm/pg-core";
import { serial, varchar, text, pgTable, timestamp } from "drizzle-orm/pg-core";
import { pfi } from "./pfi";

export const user = pgTable("user", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 100 }).notNull(),
  address: text("address").notNull(),
  pfiId: integer("pfi_id")
    .notNull()
    .references(() => pfi.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  phoneNo: varchar("phone_no", { length: 15 }).notNull(),
});
