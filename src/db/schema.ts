import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

export const datasets = sqliteTable("datasets", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  tier: text("tier", { enum: ["free", "premium"] }).notNull().default("free"),
  price: real("price"),
  previewData: text("preview_data").notNull(), // JSON string of sample rows
  fullData: text("full_data").notNull(),        // JSON string of full dataset
  recordCount: integer("record_count").notNull().default(0),
  tags: text("tags").notNull().default("[]"),   // JSON array of tags
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const purchases = sqliteTable("purchases", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  datasetId: integer("dataset_id").notNull().references(() => datasets.id),
  buyerEmail: text("buyer_email").notNull(),
  amount: real("amount").notNull(),
  purchasedAt: integer("purchased_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});
