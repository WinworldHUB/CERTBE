import { integer, pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import agreements from "./agreements";


const documents = pgTable("documents", {
    id: serial("id").primaryKey(),
    agreementId: integer("agreement_id").notNull().references(() => agreements.id,),
    name: varchar("name", { length: 100 }).notNull(),
    url: varchar("url", { length: 100 }).notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
export default documents;