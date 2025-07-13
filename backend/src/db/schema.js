import { pgTable, serial, text, date, numeric } from "drizzle-orm/pg-core";

export const transactionsTable = pgTable("transactions", {
  id: serial("id").primaryKey(),
  user_id: text("user_id").notNull(),
  title: text("title").notNull(),
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
  category: text("category").notNull(),
  createdAt: date("created_at").defaultNow(),
});
