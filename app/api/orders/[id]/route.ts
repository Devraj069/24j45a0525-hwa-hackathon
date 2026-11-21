import { NextResponse } from "next/server";
import { getOrder } from "@/lib/orders";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const order = await getOrder(id);

  if (!order) {
    return NextResponse.json(
      { ok: false, error: "Order not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ ok: true, order });
}
