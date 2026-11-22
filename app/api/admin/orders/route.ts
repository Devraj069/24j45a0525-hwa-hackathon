import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { readOrders } from "@/lib/orders";

export const runtime = "nodejs";

async function isAuthed() {
  const cookieStore = await cookies();
  return cookieStore.get("admin_session")?.value === "ok";
}

export async function GET() {
  if (!(await isAuthed())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const orders = await readOrders();
  return NextResponse.json({ ok: true, count: orders.length, orders });
}
