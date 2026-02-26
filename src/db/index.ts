import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./schema";
import path from "path";
import { fileURLToPath } from "url";

let db: any;

try {
  // Get the directory of the current module
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  
  // Use absolute path to database in project root
  const dbPath = path.resolve(__dirname, "../..", "data.db");
  
  const client = createClient({
    url: process.env.DATABASE_URL || `file:${dbPath}`,
  });
  db = drizzle(client, { schema });
  console.log("Database connected at:", dbPath);
} catch (error) {
  console.error("Database connection failed:", error);
  // Return a mock db for graceful degradation
  db = null;
}

export { db };
