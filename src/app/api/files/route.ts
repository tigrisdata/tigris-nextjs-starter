import { list, handleClientUpload } from "@tigrisdata/storage";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const limit = Number(searchParams.get("limit") || "50");
  const paginationToken = searchParams.get("paginationToken") || undefined;

  const response = await list({ limit, paginationToken });
  return NextResponse.json(response.data);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { data, error } = await handleClientUpload(body);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Upload failed" },
      { status: 500 }
    );
  }
}
