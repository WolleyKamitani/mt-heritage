import data from "@/data/heritage.json";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const searchParams = url.searchParams;

  let results = data;

  for (const [key, value] of searchParams.entries()) {
    results = results.filter((item) => {
      const projectValue = item[key as keyof typeof item];

      if (typeof projectValue === "string") {
        return projectValue.toLowerCase().includes(value.toLowerCase());
      }

      if (Array.isArray(projectValue)) {
        return projectValue.some((value) =>
          value.toLowerCase().includes(value.toLowerCase()),
        );
      }

      return false;
    });
  }

  return NextResponse.json(results);
}
