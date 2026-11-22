import { NextResponse } from "next/server";
import { getOrder, updateOrderStatus } from "@/lib/orders";
import type { Order } from "@/lib/types";

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

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = (await request.json().catch(() => ({}))) as {
    status?: string;
  };

  const nextStatus = body.status;
  const valid = [
    "placed",
    "confirmed",
    "packing",
    "shipped",
    "in_transit",
    "delivered",
    "cancelled",
  ];
  if (!nextStatus || !valid.includes(nextStatus)) {
    return NextResponse.json(
      { ok: false, error: "Invalid status" },
      { status: 400 }
    );
  }

  const updated = await updateOrderStatus(id, nextStatus as Order["status"]);

  if (!updated) {
    return NextResponse.json(
      { ok: false, error: "Order not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ ok: true, order: updated });
}
