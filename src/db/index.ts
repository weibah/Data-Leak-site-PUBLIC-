import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./schema";

let db: any;

try {
  const client = createClient({
    url: process.env.DATABASE_URL || "file:./data.db",
  });
  db = drizzle(client, { schema });
} catch (error) {
  console.error("Database connection failed:", error);
  // Return a mock db for graceful degradation
  db = null;
}

export { db };
