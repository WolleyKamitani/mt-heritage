import data from "@/data/heritage.json";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const projectId = Number(id);

  if (isNaN(projectId)) {
    return NextResponse.json({ error: "Invalid project ID" }, { status: 400 });
  }

  const project = data.find((item) => item.id === projectId);

  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  return NextResponse.json(project);
}
