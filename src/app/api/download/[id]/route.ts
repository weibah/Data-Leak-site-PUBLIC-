import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { datasets } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!db) {
    return NextResponse.json({ error: "Database not available" }, { status: 503 });
  }

  const { id } = await params;
  const datasetId = parseInt(id, 10);

  if (isNaN(datasetId)) {
    return NextResponse.json({ error: "Invalid dataset ID" }, { status: 400 });
  }

  const [dataset] = await db.select().from(datasets).where(eq(datasets.id, datasetId));

  if (!dataset) {
    return NextResponse.json({ error: "Dataset not found" }, { status: 404 });
  }

  if (dataset.tier !== "free") {
    return NextResponse.json({ error: "This dataset requires purchase" }, { status: 403 });
  }

  const fullData = JSON.parse(dataset.fullData);
  const jsonContent = JSON.stringify(fullData, null, 2);
  const filename = dataset.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") + ".json";

  return new NextResponse(jsonContent, {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
