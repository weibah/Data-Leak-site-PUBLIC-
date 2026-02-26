import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./schema";
import path from "path";

let db: any;

try {
  // Try multiple possible database locations
  const possiblePaths = [
    // Development path (relative to project root)
    path.resolve(process.cwd(), "data.db"),
    // Production path (absolute)
    "/workspace/3facf4f6-7626-4a97-b272-aae87109dddd/sessions/agent_fc4c68e6-e8f9-4c56-a83e-397932d4b21d/data.db",
    // Alternative relative path
    "./data.db",
  ];

  let dbUrl = process.env.DATABASE_URL;
  
  // If no DATABASE_URL is set, try to find the database file
  if (!dbUrl) {
    for (const dbPath of possiblePaths) {
      try {
        const fs = require('fs');
        if (fs.existsSync(dbPath)) {
          dbUrl = `file:${dbPath}`;
          console.log("Database found at:", dbPath);
          break;
        }
      } catch (e) {
        // Continue to next path
      }
    }
  }

  // Fallback to default if no database found
  if (!dbUrl) {
    dbUrl = `file:${possiblePaths[0]}`;
  }

  const client = createClient({
    url: dbUrl,
  });
  db = drizzle(client, { schema });
  console.log("Database connected with URL:", dbUrl);
} catch (error) {
  console.error("Database connection failed:", error);
  // Return a mock db for graceful degradation
  db = null;
}

export { db };
