import { NextResponse } from "next/server";
import { db } from "@/db";
import { datasets } from "@/db/schema";

export async function POST(request: Request) {
  if (!db) {
    return NextResponse.json({ error: "Database not available" }, { status: 503 });
  }

  try {
    const body = await request.json();
    
    const { 
      title, 
      description, 
      category, 
      tier, 
      price,
      previewData,
      fullData,
      recordCount,
      tags 
    } = body;

    // Validate required fields
    if (!title || !description || !category || !tier) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Insert the new dataset into the database
    const newDataset = await db.insert(datasets).values({
      title,
      description,
      category,
      tier,
      price: price || null,
      previewData: previewData || "[]",
      fullData: fullData || "[]",
      recordCount: recordCount || 0,
      tags: tags ? JSON.stringify(tags) : "[]",
    }).returning();

    return NextResponse.json({ 
      success: true, 
      dataset: newDataset[0] 
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload dataset" },
      { status: 500 }
    );
  }
}
