import {
  serial,
  varchar,
  decimal,
  timestamp,
  pgTable,
  text,
  boolean,
} from "drizzle-orm/pg-core";

const pfi = pgTable("pfi", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  address: text("address").notNull(),
  isActive: boolean("is_active").default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});


export default pfi;