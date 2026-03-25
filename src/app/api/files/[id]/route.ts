import { getPresignedUrl, remove } from "@tigrisdata/storage";
import { NextRequest, NextResponse } from "next/server";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: Params) {
  const { id } = await params;
  const key = decodeURIComponent(id);
  const response = await getPresignedUrl(key, { method: "get" });
  if (response.error) {
    return NextResponse.json({ error: response.error.message }, { status: 500 });
  }
  return NextResponse.json({ url: response.data.url });
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  const { id } = await params;
  const key = decodeURIComponent(id);
  await remove(key);
  return NextResponse.json({ success: true });
}
