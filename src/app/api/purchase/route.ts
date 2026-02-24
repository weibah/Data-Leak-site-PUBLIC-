import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { datasets, purchases } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  if (!db) {
    return NextResponse.json({ error: "Database not available" }, { status: 503 });
  }

  try {
    const body = await req.json();
    const { datasetId, email } = body;

    if (!datasetId || typeof datasetId !== "number") {
      return NextResponse.json({ error: "Invalid dataset ID" }, { status: 400 });
    }

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const [dataset] = await db.select().from(datasets).where(eq(datasets.id, datasetId));

    if (!dataset) {
      return NextResponse.json({ error: "Dataset not found" }, { status: 404 });
    }

    if (dataset.tier !== "premium") {
      return NextResponse.json({ error: "This dataset is free — no purchase needed" }, { status: 400 });
    }

    await db.insert(purchases).values({
      datasetId: dataset.id,
      buyerEmail: email.toLowerCase().trim(),
      amount: dataset.price ?? 0,
    });

    return NextResponse.json({
      success: true,
      message: `Purchase recorded for "${dataset.title}". You will receive access details at ${email}.`,
    });
  } catch (err) {
    console.error("Purchase error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
