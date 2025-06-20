import data from "@/data/heritage.json";
import { NextResponse } from "next/server";

export async function GET() {
  const categories = [...new Set(data.map((item) => item.category))].sort();
  return NextResponse.json(categories);
}
