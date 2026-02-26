import { NextResponse } from "next/server";
import { db } from "@/db";
import { datasets } from "@/db/schema";

export async function POST(request: Request) {
  console.log("Upload API called");
  
  if (!db) {
    console.log("Database not available");
    return NextResponse.json({ error: "Database not available" }, { status: 503 });
  }

  try {
    const body = await request.json();
    console.log("Request body received:", { 
      title: body.title, 
      description: body.description, 
      category: body.category,
      tier: body.tier,
      hasFile: !!body.fullData && body.fullData !== "[]"
    });
    
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
    console.log("Inserting dataset into database...");
    const newDataset = await db.insert(datasets).values({
      title,
      description,
      category,
      tier,
      price: price || null,
      previewData: previewData || "[]", // Maps to preview_data in DB
      fullData: fullData || "[]",       // Maps to full_data in DB
      recordCount: recordCount || 0,    // Maps to record_count in DB
      tags: tags ? JSON.stringify(tags) : "[]",
    }).returning();
    console.log("Dataset inserted successfully:", newDataset[0]);

    return NextResponse.json({ 
      success: true, 
      dataset: newDataset[0] 
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload dataset", details: String(error) },
      { status: 500 }
    );
  }
}
