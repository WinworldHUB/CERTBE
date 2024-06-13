import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import users from "./user";
import agreements from "./agreements";
import { serial } from "drizzle-orm/pg-core";


const messages = pgTable("messages", {
    id: serial("id").primaryKey(),
    message: text("message").notNull(),
    fromId: integer("from_id").notNull().references(() => users.id),
    toId: integer("to_id").notNull().references(() => agreements.id),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export default messages;