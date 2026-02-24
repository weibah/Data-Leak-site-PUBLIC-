import { db } from "@/db";
import { datasets } from "@/db/schema";
import { like, or, eq, and } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.trim() ?? "";
  const tier = searchParams.get("tier") ?? "all";
  const category = searchParams.get("category")?.trim() ?? "";

  try {
    const conditions = [];

    if (q) {
      conditions.push(
        or(
          like(datasets.title, `%${q}%`),
          like(datasets.description, `%${q}%`),
          like(datasets.tags, `%${q}%`),
          like(datasets.category, `%${q}%`)
        )
      );
    }

    if (tier === "free" || tier === "premium") {
      conditions.push(eq(datasets.tier, tier));
    }

    if (category) {
      conditions.push(like(datasets.category, `%${category}%`));
    }

    const results =
      conditions.length > 0
        ? await db
            .select()
            .from(datasets)
            .where(conditions.length === 1 ? conditions[0] : and(...conditions))
        : await db.select().from(datasets);

    return NextResponse.json({ results });
  } catch {
    return NextResponse.json({ error: "Search failed." }, { status: 500 });
  }
}
