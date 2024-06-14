import {
  serial,
  varchar,
  decimal,
  timestamp,
  pgTable,
  text,
} from "drizzle-orm/pg-core";

const pfi = pgTable("pfi", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  address: text("address").notNull(),
  email: varchar("email", { length: 100 }).notNull().unique(),
  phoneNo: varchar("phone_no", { length: 15 }).unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  
});


export default pfi;