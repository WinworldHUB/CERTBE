import { boolean, integer } from "drizzle-orm/pg-core";
import { serial, varchar, text, pgTable, timestamp } from "drizzle-orm/pg-core";
import pfi from "./pfi";

const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 100 }).notNull(),
  parentId: integer("parent_id").references(() => pfi.id, {
    onDelete: "cascade",
  }),
  role: varchar("role", { length: 100 }), // admin, pfi user, approver
  isPrimary: boolean("is_primary").default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  phoneNo: varchar("phone_no", { length: 15 }).notNull(),
});

export default users;
