import { NextResponse } from "next/server";
import { db } from "@/db";
import { datasets, purchases } from "@/db/schema";

export async function DELETE() {
  try {
    // Delete all purchases first (due to foreign key)
    await db.delete(purchases).execute();
    // Delete all datasets
    await db.delete(datasets).execute();
    
    return NextResponse.json({ 
      success: true, 
      message: "All datasets and purchases deleted" 
    });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete datasets" },
      { status: 500 }
    );
  }
}
